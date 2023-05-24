from flask import Flask, jsonify, request
import requests
import json
import pandas as pd
import pyodbc

app = Flask(__name__)

## DB-Connection
# server = 'DESKTOP-4A4UDET\SQLEXPRESS01'
# database = 'OutdoorFusion'

# # Create the connection string
# connection_string = f'DRIVER={{ODBC Driver 18 for SQL Server}};SERVER={server};DATABASE={database};Trusted_Connection=yes;TrustServerCertificate=yes;'


# Connect to the database
conn = pyodbc.connect('DRIVER={SQL Server};SERVER=LAPTOP-QOE424AL\SQLEXPRESS01;DATABASE=OutdoorFusion;Trusted_Connection=yes;')

# Create a DataFrame
def getData(query):
    return pd.read_sql(query, conn)


# Get all products
@app.route('/api/OutdoorFusion/all', methods=['GET'])
def get_all():
    # Fetch and convert each table separately
    Northwind = getData("SELECT * FROM dbo.Northwind_product").to_dict(orient='records')
    AdventureWorks = getData("SELECT * FROM dbo.AdventureWorks_product").to_dict(orient='records')
    AenC = getData("SELECT * FROM dbo.AenC_product").to_dict(orient='records')
    Bikesales = getData("SELECT * FROM dbo.BikeSalesProduct").to_dict(orient='records')

    # Prepare the data payload and return as JSON
    payload = {'Northwind': Northwind, 'AdventureWorks': AdventureWorks, 'AenC': AenC, 'Bikesales': Bikesales}
    return jsonify(payload)

# Get Northwind products
@app.route('/api/OutdoorFusion/northwind', methods=['GET'])
def get_northwind():
    northwind_df = getData("SELECT * FROM dbo.Northwind_product")
    rows = northwind_df.to_dict(orient='records')
    payload = {'rows': rows}

    return jsonify(payload)


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
