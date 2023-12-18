import sqlite3
import pandas as pd

# Create a connection to the SQLite database
conn = sqlite3.connect('./data/tss_data.db')

# Load your CSV data into pandas DataFrames with only needed columns
tasks_df = pd.read_csv('./data/tasks.csv', encoding='latin1')
tss_df = pd.read_csv('./data/GCTSS.csv', encoding='latin1', usecols=["dateTime", "timeStamp", "surveyReferrer", "language", "device", "task", "taskSatisfaction", "taskEase", "taskCompletion", "taskImproveComment", "taskWhyNotComment"])

# Prepare a topic column for the feedback
tss_df['Topic'] = None


## Iterate over each row in tss_df
for index, row in tss_df.iterrows():
    task = row['task']
    
    # Check if the task exists in tasks_df
    matching_topic = tasks_df.loc[tasks_df['Task'] == task, 'Topic']
    
    # If a matching task is found, update the 'Topic' column in tss_df
    if not matching_topic.empty:
        tss_df.at[index, 'Topic'] = matching_topic.iloc[0]




# Create tables in the SQLite database from these DataFrames
tss_df.to_sql('TSS', conn, if_exists='replace', index=False)


# Close the connection
conn.close()
