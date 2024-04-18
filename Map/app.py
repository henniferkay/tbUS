from flask import Flask, render_template
import pandas as pd

#----------------------
# Database Connection
#----------------------

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/combined_data')
def getData():
    return pd.read_sql('''                  
    SELECT *
    FROM combined_data                    
    ''', engine).to_json()

if __name__=='__main__':
    app.run()