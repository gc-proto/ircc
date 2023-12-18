#import all libraries
import io
import sqlite3
import base64

from flask import Flask, render_template, request, redirect, url_for
import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.probability import FreqDist

import matplotlib
from matplotlib import dates as mdates, ticker as plticker
from matplotlib.dates import DateFormatter
import matplotlib.pyplot as plt
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas

import json
import pickle
import os
import re

import datetime
from datetime import date

import pyairtable
from pyairtable import Api
from pyairtable.formulas import match, FIND, to_airtable_value

api = Api(os.environ['AIRTABLE_API_KEY'])

date_modified = os.path.getmtime('airtable.pkl')
date_modified = datetime.datetime.fromtimestamp(date_modified)
date_modified = date_modified.strftime("%Y/%m/%d")

today = date.today()
today = today.strftime("%Y/%m/%d")

print('date modified = ' + date_modified)
print('today = ' + today)



if date_modified != today:
    at_table = api.table('appe8vwq3efUYiYqN', 'tblhK8NRnfDzKDrpM')
    at_table.all()
    with open('airtable.pkl', 'wb') as file: 
        pickle.dump(at_table, file)
        file.close()

else:
    with open("airtable.pkl", "rb") as file:
        at_table = pickle.load(file)
        file.close()

# print(type(table))
# print(table.all())

# pattern = re.compile(r"<['\",]>")


# arr= pattern.sub("", arr)

def toArray(arr, type):  
    arr = str(arr)
    arr = arr[2:]
    arr = arr[:-2]  
    arr = arr.replace("], [", ", ")

    if type != "url":
        arr = arr[1:]
        arr = arr[:-1]  

    arr = arr.split("', '") 
    newarr = []
    for x in arr:
        if type != "url":
            x = x.capitalize()
        newarr.append(x)
    newarr.sort()
    newarr = list(dict.fromkeys(newarr))
    return newarr


topics = []
for x in at_table.all(formula = "FIND('', {Topic})"):
    topics.append(x['fields']['Topic'])
topics = toArray(topics, "text")
topics.append('All')
topics.sort()


urls = []
for x in at_table.all(formula = "FIND('', {URL})"):
    urls.append(x['fields']['URL'])

# urls = toArray(urls)
# print("urls =")
# print(toArray(urls))

at_tasks = []
for x in at_table.all(formula = "FIND('', {Tasks})"):
    at_tasks.append(x['fields']['Tasks'])
at_tasks = toArray(at_tasks, "text")



formula = FIND('Super visa', 'Service')
formula
"FIND('Super visa', {Service})"

records = []
for x in at_table.all(formula = "FIND('Super visa', {Service})"):
    records.append(x['fields']['URL'])


matplotlib.use('Agg')

app = Flask(__name__)

#list topics for selection
# topics = ['All', 'Campaign', 'My application', 'Passport', 'Visit', 'Immigrate', 'Work', 'Study', 'Citizenship', 'New immigrants', 'Canadians', 'Refugees and asylum', 'Enforcement and violations', 'Help Centre']

# routes for different parts of the app
@app.route('/')
def landing():
    facets = ['Page feedback', 'GC Task Success', 'Web Analytics', 'Social media', 'Call Centre', 'Google Search']
    return render_template('index.html', topics=topics, facets=facets, facet='Overall',)


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

    print("==============")
    # Don't remember what I was trying to do here
    # print('records = ', records[1])
    # df_test = pd.read_sql_query("SELECT Date, Comment, URL, Language FROM Page_feedback WHERE URL IN(?);", conn, params=[records[1]])
    # print("df_test = " + df_test)

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

        if time_range == "alldata":
            fig.set_figwidth(10)

        fig.savefig(img, format='png')

        plt.close()

        img.seek(0)
        plot = base64.b64encode(img.getvalue()).decode().replace('\n', '')

        #spefifies wich html template to use, and the values to pass
        return render_template('page_feedback.html', facet='Page Feedback', topic=topic, time_range=time_range, tab=tab, data=data, topics=topics, plot=plot)
    
   

    conn.close()

    


# if you select from the task dropdown, go get matching tasks from the airtables and provide URLs based on that match.
# then when they select the URL, narrow down results further?



@app.route('/gc_task_success', methods=['GET', 'POST'])
def gc_task_success():
    topic = request.args.get('topic')
    selected_task = request.form.get('task', 'All tasks')
    selected_url = request.form.get('url', 'All URLs')

    conn = sqlite3.connect('./data/tss_data.db')

    
    # Fetch all data first
    df = pd.read_sql_query("SELECT dateTime, task, taskSatisfaction, taskEase, taskCompletion, Topic FROM TSS", conn)

    
    print(topic)
    print(selected_task)

    # Then filter by topic and task in pandas
    if topic != "All":
        df = df[df['Topic'] == topic]

        urls = []
        for x in at_table.all(formula = "FIND('" + topic + "', {Topic})"):
            urls.append(x['fields']['URL'])

        print("urls by topic")
        print(urls)
    
    tasks = df['task'].unique().tolist()

    if selected_task and selected_task != "All tasks" and selected_task != None:
        df = df[df['task'] == selected_task]

        urls = []
        for x in at_table.all(formula = "FIND('" + selected_task.split(' / ')[0] + "', {Tasks})"):
        # for x in at_table.all(formula = "FIND('Apply', {Tasks})"):
            urls.append(x['fields']['URL'])

        urls = toArray(urls, "url")
        print("urls by task")
        print(urls)

    

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
        'Yes / Oui': 1,
        'No / Non': 0,
        "I started this survey before I finished my visit / J'ai commencé ce sondage avant d'avoir terminé ma visite": None,
    }

    df['taskSatisfaction'] = df['taskSatisfaction'].map(satisfaction_mapping)
    df['taskEase'] = df['taskEase'].map(ease_mapping)
    df['taskCompletion'] = df['taskCompletion'].map(completion_mapping)

    print(df.head()) 

    # Filter out the rows with "I started this survey..." in taskCompletion by excluding rows with taskCompletion = None
    df_filtered = df[df['taskCompletion'].notnull()]

    print(df_filtered.head()) 

    # Drop any rows with missing values after this mapping in df
    df.dropna(subset=['taskSatisfaction', 'taskEase'], inplace=True)

    # Drop any rows with missing values after this mapping in df_filtered
    df_filtered.dropna(subset=['taskCompletion'], inplace=True)

    # print(df_filtered.head()) 

    
    # Set the 'dateTime' column as the index of the DataFrame
    df.set_index('dateTime', inplace=True)
    df_filtered.set_index('dateTime', inplace=True)

    # Resample and calculate the mean
    df_resampled = df.resample('W').mean(numeric_only=True)
    df_filtered_resampled = df_filtered.resample('W').mean(numeric_only=True)
    
    # Create a figure with two subplots

    fig, (ax1, ax2) = plt.subplots(2, figsize=(10,10))

    # Add vertical space between subplots
    plt.subplots_adjust(hspace=0.5)

    
    #plot satisfaction and ease on the first subplot
    df_resampled['taskSatisfaction'].plot(kind='line', ax=ax1, linewidth=2.0, label='Satisfaction')
    df_resampled['taskEase'].plot(kind='line', ax=ax1, linewidth=2.0, label='Ease')
    ax1.set_title('Task Ease and Satisfaction')
    ax1.set_xlabel('Week')
    ax1.set_ylabel('Average Rating')
    ax1.set_ylim([0, 5])  # Set a fixed scale
    ax1.grid(True, axis='y')  # Show only horizontal grid lines
    #ax1.legend({'Task satisfaction', 'Task ease'})
    ax1.legend()

    # Plot completion rate on the second subplot
    df_filtered_resampled['taskCompletion'].plot(kind='line', ax=ax2, linewidth=2.0)
    ax2.set_title('Task Completion Rate')
    ax2.set_xlabel('Week')
    ax2.set_ylabel('Completion Rate')
    ax2.set_ylim([0, 1])  # Set a fixed scale
    ax2.yaxis.set_major_formatter(plticker.PercentFormatter(1.0))  # Show y-axis in percentage format
    ax2.grid(True, axis='y')  # Show only horizontal grid lines

    # For subplot1
    png_image1 = io.BytesIO()
    FigureCanvas(fig).print_png(png_image1)

    # Encode PNG image to base64 string
    png_image1_b64_string = "data:image/png;base64,"
    png_image1_b64_string += base64.b64encode(png_image1.getvalue()).decode('utf8')

    # For subplot2
    png_image2 = io.BytesIO()
    FigureCanvas(fig).print_png(png_image2)

    # Encode PNG image to base64 string
    png_image2_b64_string = "data:image/png;base64,"
    png_image2_b64_string += base64.b64encode(png_image2.getvalue()).decode('utf8')

    plt.close(fig)


    

    conn.close()

    return render_template('gc_task_success.html', facet='GC Task Success', topic=topic, task=selected_task, topics=topics, tasks=tasks, urls=urls, plot1=png_image1_b64_string, plot2=png_image2_b64_string)




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


@app.route('/test')
def test():
    topic = request.args.get('topic')
    return render_template('test.html', facet='Test', topic=topic, topics=topics)

if __name__ == '__main__':
    app.run(debug=True)