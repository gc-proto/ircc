from flask import Flask, render_template, jsonify
import pandas as pd
from urllib.parse import unquote


app = Flask(__name__)


feedback_data = pd.read_csv('data_files/IRCC_Feedback.csv')
url_data = pd.read_csv('data_files/URL_list.csv', encoding='latin1')



# Group the URLs by topic
url_groups = url_data.groupby('Topic')['Page path', 'Opposite language page path'].apply(lambda x: x.values.tolist()).to_dict()



@app.route('/')
def home():
    topics = url_groups.keys()
    return render_template('index.html', topics=topics)

@app.route('/data/<topic>')
def data(topic):
    print('Handling request for topic:', topic)
    urls = [item for sublist in url_groups[topic] for item in sublist]  # this will flatten the list
    feedback_df = feedback_data[feedback_data['URL'].apply(lambda x: any(url in x for url in urls))]
    data = feedback_df[['Date', 'Comment', 'URL']].to_dict('records')
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
