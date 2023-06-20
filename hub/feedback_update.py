import sqlite3
import pandas as pd

# Create a connection to the SQLite database
conn = sqlite3.connect('./data/ircc_data.db')

# Load your CSV data into pandas DataFrames with only needed columns
url_df = pd.read_csv('./data/URL_list.csv', encoding='latin1', usecols=["Page path", "Opposite language page path", "Topic", "Sub topic", "Page title"])
feedback_df = pd.read_csv('./data/IRCC_Feedback.csv', usecols=["Date", "Time stamp", "Comment", "Problem", "URL", "Page title", "Language"])

# Prepare a topic column for the feedback
feedback_df['Topic'] = None


# Create a mapping from topics to lists of URLs
url_groups = url_df.groupby('Topic')[['Page path', 'Opposite language page path']].apply(lambda x: x.values.tolist()).to_dict()

# Flatten the lists of URLs
url_to_topic = {url: topic for topic, urls in url_groups.items() for sublist in urls for url in sublist}


# Assign the right topic to each row in the feedback_df DataFrame
def map_url_to_topic(url):
    for url_start, topic in url_to_topic.items():
        if url.startswith(url_start):
            return topic
    return None

feedback_df['Topic'] = feedback_df['URL'].apply(map_url_to_topic)


# Create tables in the SQLite database from these DataFrames
url_df.to_sql('URL_List', conn, if_exists='replace', index=False)
feedback_df.to_sql('Page_feedback', conn, if_exists='replace', index=False)


# Close the connection
conn.close()
