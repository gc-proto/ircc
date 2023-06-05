from flask import Flask, render_template, jsonify
import pandas as pd
from urllib.parse import unquote


app = Flask(__name__)

# Load the data when the application starts
df = pd.read_csv('IRCC_Feedback.csv')
df['Date'] = pd.to_datetime(df['Date'])
df.set_index('Date', inplace=True)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/dashboard')
def dashboard():
    urls = df['URL'].unique().tolist()
    return render_template('dashboard.html', urls=urls)

@app.route('/data/<path:url>')
def data(url):
    url = unquote(url)
    url_df = df[df['URL'] == url][['Comment']].dropna()
    # Convert the Timestamp objects to strings
    data = [{"date": str(key), "comment": value} for key, value in url_df['Comment'].items()]
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
