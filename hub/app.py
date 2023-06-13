from flask import Flask, render_template, jsonify
import pandas as pd
from urllib.parse import unquote
from datetime import timedelta
import matplotlib as mpl
mpl.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.ticker as plticker
import matplotlib.dates as mdates
import io
import base64
from wordcloud import WordCloud
import nltk
from nltk.probability import FreqDist
from nltk.corpus import stopwords
from textblob import TextBlob
import numpy as np


app = Flask(__name__)

feedback_data = pd.read_csv('./data/IRCC_Feedback.csv')
url_data = pd.read_csv('./data//URL_list.csv', encoding='latin1')

# Group the URLs by topic
url_groups = url_data.groupby('Topic')['Page path', 'Opposite language page path'].apply(lambda x: x.values.tolist()).to_dict()

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
    wordcloud = WordCloud(background_color='white', max_font_size = 80, width=300, height=200).generate(cloud_words)
    plt.figure(figsize=(8,4))
    plt.axis("off")
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.savefig(img, format='png')
    plt.close()
    img.seek(0)

    return base64.b64encode(img.getvalue()).decode()


@app.route('/')
def home():
    topics = url_groups.keys()
    return render_template('index.html', topics=topics)

@app.route('/data/<topic>')
def data(topic):
    print('Handling request for topic:', topic)
    urls = [item for sublist in url_groups[topic] for item in sublist]  # this will flatten the list
    feedback_df = feedback_data[feedback_data['URL'].apply(lambda x: any(url in x for url in urls))].copy()
    feedback_df['Comment'] = feedback_df['Comment'].fillna('N/A')
    data = feedback_df[['Date', 'Comment', 'URL']].to_dict('records')
    

    feedback_df_en = feedback_df[feedback_df['Language'] == 'en']
    feedback_df_fr = feedback_df[feedback_df['Language'] == 'fr']

    feedback_df_en['Sentiment'] = feedback_df_en['Comment'].apply(lambda comment: TextBlob(comment).sentiment.polarity)
    feedback_df_fr['Sentiment'] = feedback_df_fr['Comment'].apply(lambda comment: TextBlob(comment).sentiment.polarity)


    wordcloud_en = generate_wordcloud(feedback_df_en['Comment'], 'english')
    wordcloud_fr = generate_wordcloud(feedback_df_fr['Comment'], 'french')
    


    # Generate graph data
    feedback_df['Date'] = pd.to_datetime(feedback_df['Date'])
    feedback_df.set_index('Date', inplace=True)
    daily_counts = feedback_df.resample('D').size()
    weekly_rolling_mean = daily_counts.rolling(window=7).mean()

    dates = daily_counts.index
    daily_values = list(daily_counts.values)
    weekly_values = list(weekly_rolling_mean.values)

    img = io.BytesIO()

    fig, ax = plt.subplots()
    ax.bar(dates, daily_values, color=(0.2, 0.4, 0.6, 0.6), linewidth=0.5, label='Daily value')
    ax.plot(dates, weekly_values, color='black', linewidth=3.0, label='Weekly rolling mean')
    plt.title(topic + '\n' + 'Number of comments per day')

    ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m-%d'))

    ax.legend()
    loc = plticker.MultipleLocator(base=7.0)
    plt.gcf().subplots_adjust(bottom=0.2)
    fig.autofmt_xdate()
    ax.xaxis.set_major_locator(loc)

    fig.savefig(img, format='png')
    plt.close()

    img.seek(0)
    plot = base64.b64encode(img.getvalue()).decode()


    #Generate sentiment analysis plot

    feedback_df_en['Date'] = pd.to_datetime(feedback_df_en['Date'])
    feedback_df_en.set_index('Date', inplace=True)
    sentiment_en = feedback_df_en['Sentiment'].resample('W').mean()

    feedback_df_fr['Date'] = pd.to_datetime(feedback_df_fr['Date'])
    feedback_df_fr.set_index('Date', inplace=True)
    sentiment_fr = feedback_df_fr['Sentiment'].resample('W').mean()

    dates_en = sentiment_en.index
    sentiment_values_en = list(sentiment_en.values)

    dates_fr = sentiment_fr.index
    sentiment_values_fr = list(sentiment_fr.values)

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

    return jsonify({
        'data': data,
        'plot': plot,
        'sentiment_plot': sentiment_plot,
        'wordcloud_en': wordcloud_en,
        'wordcloud_fr': wordcloud_fr
    })


if __name__ == '__main__':
    app.run(debug=True)
