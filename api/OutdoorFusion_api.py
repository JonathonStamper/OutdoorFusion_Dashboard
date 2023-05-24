from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import json
import pandas as pd
import pyodbc

app = Flask(__name__)

# Enable CORS
CORS(app)

# Set allowed origins
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:5000/api/OutdoorFusion/all"}})

## DB-Connection
server = 'DESKTOP-DPIU7E0\SQLEXPRESS01'
database = 'OutdoorFusion'

# Create the connection string
connection_string = f'DRIVER={{ODBC Driver 18 for SQL Server}};SERVER={server};DATABASE={database};Trusted_Connection=yes;TrustServerCertificate=yes;'

# Connect to the database
conn = pyodbc.connect(connection_string)

# Create a DataFrame
def getData(query):
    return pd.read_sql(query, conn)


# Get all data tables
@app.route('/api/OutdoorFusion/all', methods=['GET'])
def get_all():
    tables = {
        'Northwind_product': getData("SELECT * FROM dbo.Northwind_product"),
        'AdventureWorks_product': getData("SELECT * FROM dbo.AdventureWorks_product"),
        'AenC_product': getData("SELECT * FROM dbo.AenC_product"),
        'BikeSalesProduct': getData("SELECT * FROM dbo.BikeSalesProduct")
    }

    # Convert each DataFrame to JSON format
    json_tables = {table: df.to_dict(orient='records') for table, df in tables.items()}

    return jsonify(json_tables)


# Get Northwind products
@app.route('/api/OutdoorFusion/northwind', methods=['GET'])
def get_northwind():
    northwind_df = getData("SELECT * FROM dbo.Northwind_product")
    rows = northwind_df.to_dict(orient='records')
    payload = {'rows': rows}
    jsonify(payload)

    return payload


# Get Adventureworks products
@app.route('/api/OutdoorFusion/adventure', methods=['GET'])
def get_adventure():
    adventure_df = getData("SELECT * FROM dbo.AdventureWorks_product")
    rows = adventure_df.to_dict(orient='records')
    payload = {'rows': rows}

    return jsonify(payload)


# Get AenC products
@app.route('/api/OutdoorFusion/aenc', methods=['GET'])
def get_aenc():
    aenc_df = getData("SELECT * FROM dbo.AenC_product")
    rows = aenc_df.to_dict(orient='records')
    payload = {'rows': rows}

    return jsonify(payload)


# Get bike sales
@app.route('/api/OutdoorFusion/bikesales', methods=['GET'])
def get_bikesales():
    bikesales_df = getData("SELECT * FROM dbo.BikeSalesProduct")
    rows = bikesales_df.to_dict(orient='records')
    payload = {'rows': rows}

    return jsonify(payload)


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
