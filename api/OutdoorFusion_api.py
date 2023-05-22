from flask import Flask, jsonify, request
import requests
import json
import pandas as pd
import pyodbc

app = Flask(__name__)

## DB-Connection
##server = 'DESKTOP-4A4UDET\SQLEXPRESS01'
##database = 'OutdoorFusion'

# Create the connection string
##connection_string = f'DRIVER={{ODBC Driver 18 for SQL Server}};SERVER={server};DATABASE={database};Trusted_Connection=yes;TrustServerCertificate=yes;'

# Connect to the database
conn = pyodbc.connect(connection_string)

# Create the DataFrames
northwind_df = pd.read_sql("SELECT * FROM dbo.Northwind_product", conn)
adventure_df = pd.read_sql("SELECT * FROM dbo.AdventureWorks_product", conn)
aenc_df = pd.read_sql("SELECT * FROM dbo.AenC_product", conn)
bikesales_df = pd.read_sql("SELECT * FROM dbo.Northwind_product", conn)

# Merge the DataFrames into a single DataFrame
merged_df = pd.concat([northwind_df, adventure_df, aenc_df, bikesales_df], ignore_index=True)


# Get all products
@app.route('/api/OutdoorFusion/all', methods=['GET'])
def get_all():
    # Convert DataFrame rows to JSON format, prepare the data payload, return JSON
    rows = merged_df.to_dict(orient='records')
    payload = {'rows': rows}

    return jsonify(payload)


# Get Northwind products
@app.route('/api/OutdoorFusion/northwind', methods=['GET'])
def get_northwind():
    rows = northwind_df.to_dict(orient='records')
    payload = {'rows': rows}

    return jsonify(payload)


# Get Adventureworks products
@app.route('/api/OutdoorFusion/adventure', methods=['GET'])
def get_adventure():
    rows = adventure_df.to_dict(orient='records')
    payload = {'rows': rows}

    return jsonify(payload)


# Get AenC products
@app.route('/api/OutdoorFusion/aenc', methods=['GET'])
def get_aenc():
    rows = aenc_df.to_dict(orient='records')
    payload = {'rows': rows}

    return jsonify(payload)


# Get bike sales
@app.route('/api/OutdoorFusion/bikesales', methods=['GET'])
def get_bikesales():
    rows = bikesales_df.to_dict(orient='records')
    payload = {'rows': rows}

    return jsonify(payload)


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
