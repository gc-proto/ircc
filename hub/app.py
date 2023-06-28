#import all libraries
import io
import sqlite3
import base64

from flask import Flask, render_template, request, redirect, url_for
import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.probability import FreqDist
from textblob import TextBlob
from wordcloud import WordCloud

import matplotlib
from matplotlib import dates as mdates, ticker as plticker
from matplotlib.dates import DateFormatter
import matplotlib.pyplot as plt
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas


matplotlib.use('Agg')


app = Flask(__name__)

#list topics for selection
topics = ['All', 'Campaign', 'My application', 'Passport', 'Visit', 'Immigrate', 'Work', 'Study', 'Citizenship', 'New immigrants', 'Canadians', 'Refugees and asylum', 'Enforcement and violations', 'Help Centre']


# creates a word cloud
def generate_wordcloud(comments, lang):
    word_list = comments.tolist()
    word_list = [str(i) for i in word_list]
    all_words = ' '.join([str(elem) for elem in word_list])

    tokenizer = nltk.RegexpTokenizer(r"\w+")
    tokens = tokenizer.tokenize(all_words)

    words = []
    for word in tokens:
        words.append(word.lower())

    if lang == 'english':
        sw = nltk.corpus.stopwords.words('english')
    elif lang == 'french':
        sw = nltk.corpus.stopwords.words('french')

    words_ns = []
    for word in words:
        if word.isalpha() and word not in sw:
            words_ns.append(word)

    cloud_words = " ".join(words_ns) if words_ns else "No Comments"

    img = io.BytesIO()
    wordcloud = WordCloud(background_color='white', max_font_size=80, width=300, height=200).generate(cloud_words)
    plt.figure(figsize=(8, 4))
    plt.axis("off")
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.savefig(img, format='png')
    plt.close()
    img.seek(0)

    return base64.b64encode(img.getvalue()).decode()

# routes for different parts of the app
@app.route('/')
def landing():
    facets = ['Page feedback', 'GC Task Success', 'Web Analytics', 'Social media', 'Call Centre', 'Google Search']
    return render_template('landing.html', topics=topics, facets=facets)


@app.route('/selected_page', methods=['POST'])
def selected_page():
    topic = request.form.get('topics')
    time_range = request.form.get('time_range')
    facet = request.form.get('facets')
    tab = request.form.get('tabs') 


    # Redirect to the corresponding page based on the selected facet - if other pages than Page feedback have tabs, will need to be added in first if
    if facet == "Page Feedback":
        return redirect(url_for(facet.replace(' ', '_').lower(), topic=topic, time_range=time_range, tab=tab))
    else:
        return redirect(url_for(facet.replace(' ', '_').lower(), topic=topic, time_range=time_range))




@app.route('/page_feedback')
def page_feedback():
    topic = request.args.get('topic')
    time_range = request.args.get('time_range')
    tab = request.args.get('tab', default='comments')

    # code to fetch data from db

    conn = sqlite3.connect('./data/ircc_data.db')

    if time_range == "alldata":
        if topic == "All":
            df = pd.read_sql_query("SELECT Date, Comment, URL, Language FROM Page_feedback", conn)
        else:
            df = pd.read_sql_query("SELECT Date, Comment, URL, Language FROM Page_feedback WHERE Topic = ?", conn, params=[topic])
    else:
        sqlite_time_range = '-7 days' if time_range == '7days' else '-30 days'
        if topic == "All":
            df = pd.read_sql_query("SELECT Date, Comment, URL, Language FROM Page_feedback WHERE Date >= DATE('now', ?)", conn, params=[sqlite_time_range])
        else:
            df = pd.read_sql_query("SELECT Date, Comment, URL, Language FROM Page_feedback WHERE Topic = ? AND Date >= DATE('now', ?)", conn, params=[topic, sqlite_time_range])


    # Process data for the selected tab
    if tab == "comments":
        #list comments
        data = df.values.tolist()

        # Convert 'Date' column to datetime
        df['Date'] = pd.to_datetime(df['Date'])

        # Set 'Date' as the DataFrame index
        df.set_index('Date', inplace=True)

        # Start the BytesIO stream
        img = io.BytesIO()

        # Calculate daily counts
        daily_counts = df.resample('D').size()

       

       
        # Calculate rolling mean
        weekly_rolling_mean = daily_counts.rolling(window=7).mean()

        # Prepare data for graph
        dates = daily_counts.index
        daily_values = list(daily_counts.values)
        weekly_values = list(weekly_rolling_mean.values)

        # Create graph
        fig, ax = plt.subplots()
        ax.bar(dates, daily_values, color=(0.2, 0.4, 0.6, 0.6), linewidth=0.5, label='Daily value')
        ax.plot(dates, weekly_values, color='black', linewidth=3.0, label='Weekly rolling mean')
        plt.title(f'{topic}\nNumber of comments per day')

        ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m-%d'))

        ax.legend()
        loc = plticker.MultipleLocator(base=7.0)
        plt.gcf().subplots_adjust(bottom=0.2)
        fig.autofmt_xdate()
        ax.xaxis.set_major_locator(loc)

        fig.savefig(img, format='png')
        plt.close()

        img.seek(0)
        plot = base64.b64encode(img.getvalue()).decode().replace('\n', '')

        #spefifies wich html template to use, and the values to pass
        return render_template('page_feedback.html', facet='Page Feedback', topic=topic, time_range=time_range, tab=tab, data=data, topics=topics, plot=plot)

    elif tab == "common-words":

        #check if there are comments
        if df['Comment'].isna().all():
            return render_template('page_feedback.html', facet='Page Feedback', topic=topic, time_range=time_range, tab=tab, data=[], topics=topics, plot=None, message="No comments")

        else: 
            # Split the DataFrame based on language
            feedback_df_en = df[df['Language'] == 'en']
            feedback_df_fr = df[df['Language'] == 'fr']
                
            # Generate word clouds for English and French comments
            wordcloud_en = generate_wordcloud(feedback_df_en['Comment'], 'english') if not feedback_df_en.empty else None
            wordcloud_fr = generate_wordcloud(feedback_df_fr['Comment'], 'french') if not feedback_df_fr.empty else None
                
            return render_template('page_feedback.html', facet='Page Feedback', topic=topic, time_range=time_range, tab=tab, topics=topics, wordcloud_en=wordcloud_en, wordcloud_fr=wordcloud_fr)    
    
    elif tab == "sentiment":
        if df['Comment'].isna().all():
            return render_template('page_feedback.html', facet='Page Feedback', topic=topic, time_range=time_range, tab=tab, data=[], topics=topics, plot=None, message="No comments")

        else:
        # Perform sentiment analysis on each comment
            df['Sentiment'] = df['Comment'].apply(lambda comment: TextBlob(comment).sentiment.polarity if comment else None)
            
            # Make sure your 'Date' column is of datetime type
            df['Date'] = pd.to_datetime(df['Date'])

            # Perform resampling and grouping based on language
            df_en = df[df['Language']=='en']
            df_fr = df[df['Language']=='fr']

            sentiment_en = df_en.resample('W', on='Date')['Sentiment'].mean()
            sentiment_fr = df_fr.resample('W', on='Date')['Sentiment'].mean()

            # Prepare data for sentiment plot
            dates_en = sentiment_en.index
            sentiment_values_en = list(sentiment_en.values)

            dates_fr = sentiment_fr.index
            sentiment_values_fr = list(sentiment_fr.values)

            # Create sentiment analysis plot
            img_sentiment = io.BytesIO()

            fig, ax = plt.subplots()
            ax.plot(dates_en, sentiment_values_en, color='red', linewidth=3.0, label='Sentiment English')
            ax.plot(dates_fr, sentiment_values_fr, color='blue', linewidth=3.0, label='Sentiment French')
            plt.title(topic + '\n' + 'Average sentiment per week')

            ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m-%d'))

            ax.legend()
            loc = plticker.MultipleLocator(base=7.0)
            plt.gcf().subplots_adjust(bottom=0.2)
            fig.autofmt_xdate()
            ax.xaxis.set_major_locator(loc)

            fig.savefig(img_sentiment, format='png')
            plt.close()

            img_sentiment.seek(0)
            sentiment_plot = base64.b64encode(img_sentiment.getvalue()).decode()

            # Render your template, passing in the necessary data and sentiment plot.
            return render_template('page_feedback.html', facet='Page Feedback', topic=topic, time_range=time_range, tab=tab, topics=topics, sentiment_plot=sentiment_plot)

    conn.close()

    




@app.route('/gc_task_success', methods=['GET', 'POST'])
def gc_task_success():
    topic = request.args.get('topic')
    selected_task = request.form.get('task', 'All tasks')

    conn = sqlite3.connect('./data/tss_data.db')

    # Fetch all data first
    df = pd.read_sql_query("SELECT dateTime, task, taskSatisfaction, taskEase, taskCompletion, Topic FROM TSS", conn)


    print(topic)
    print(selected_task)

    # Then filter by topic and task in pandas
    if topic != "All":
        df = df[df['Topic'] == topic]
    
    tasks = df['task'].unique().tolist()

    if selected_task and selected_task != "All tasks" and selected_task != None:
        df = df[df['task'] == selected_task]

    print(df.head())  # Check if data is being read from SQL

    

    print(df['taskSatisfaction'].unique())
    print(df['taskEase'].unique())
    print(df['taskCompletion'].unique())

    # Make sure your 'dateTime' column is of datetime type
    df['dateTime'] = pd.to_datetime(df['dateTime'], format='%m/%d/%Y')

    # Convert satisfaction, ease and completion to numerical values
    satisfaction_mapping = {
    'Very satisfied / TrÃ¨s satisfait': 5,
    'Satisfied / Satisfait': 4,
    'Neutral / Neutre': 3,
    'Dissatisfied / Insatisfait': 2,
    'Very dissatisfied / TrÃ¨s insatisfait': 1,
    }

    ease_mapping = {
        'Very easy / TrÃ¨s facile': 5,
        'Easy / Facile': 4,
        'Neither difficult nor easy / Ni difficile ni facile': 3,
        'Difficult / Difficile': 2,
        'Very difficult / TrÃ¨s difficile': 1,
    }

    completion_mapping = {
        "I started this survey before I finished my visit / J'ai commencé ce sondage avant d'avoir terminé ma visite": 0,
        'Yes / Oui': 1,
        'No / Non': 0,
    }

    df['taskSatisfaction'] = df['taskSatisfaction'].map(satisfaction_mapping)
    df['taskEase'] = df['taskEase'].map(ease_mapping)
    df['taskCompletion'] = df['taskCompletion'].map(completion_mapping)


    print(df.head())  # Check if data is being transformed correctly

    # Drop any rows with missing values after this mapping
    df.dropna(subset=['taskSatisfaction', 'taskEase', 'taskCompletion'], inplace=True)

    # Set the 'dateTime' column as the index of the DataFrame
    df.set_index('dateTime', inplace=True)

    # Resample and calculate the mean
    df_resampled = df.resample('W').mean()

    print(df_resampled.head())
    
    # Create plot
    fig, ax = plt.subplots()
    df_resampled[['taskSatisfaction', 'taskEase', 'taskCompletion']].plot(kind='line', ax=ax)
    plt.title('GC Task Success')
    plt.xlabel('Week')
    plt.ylabel('Average Rating')
    png_image = io.BytesIO()
    FigureCanvas(fig).print_png(png_image)

    # Encode PNG image to base64 string
    png_image_b64_string = "data:image/png;base64,"
    png_image_b64_string += base64.b64encode(png_image.getvalue()).decode('utf8')

    plt.close(fig)  # make sure to close the figure after use to avoid memory leaks

    return render_template('gc_task_success.html', facet='GC Task Success', topic=topic, task=selected_task, topics=topics, tasks=tasks, plot=png_image_b64_string)




@app.route('/web_analytics')
def web_analytics():
    topic = request.args.get('topic')
    return render_template('web_analytics.html', facet='Web Analytics', topic=topic, topics=topics)

@app.route('/social_media')
def social_media():
    topic = request.args.get('topic')
    return render_template('social_media.html', facet='Social Media', topic=topic, topics=topics)

@app.route('/call_centre')
def call_centre():
    topic = request.args.get('topic')
    return render_template('call_centre.html', facet='Call Centre', topic=topic, topics=topics)


@app.route('/google_search')
def google_search():
    topic = request.args.get('topic')
    return render_template('google_search.html', facet='Google Search', topic=topic, topics=topics)

if __name__ == '__main__':
    app.run(debug=True)