from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import pyodbc
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

server = 'DESKTOP-DPIU7E0\SQLEXPRESS01'
database = 'OutdoorFusion'

# Connect to the database
conn = pyodbc.connect('DRIVER={SQL Server};SERVER=LAPTOP-QOE424AL\SQLEXPRESS01;DATABASE=OutdoorFusion;Trusted_Connection=yes;')

# Create a DataFrame
def getData(query):
    return pd.read_sql(query, conn)

app = Flask(__name__)
CORS(app)

# Get all data tables
@app.route('/api/OutdoorFusion_Type/ALL', methods=['GET'])
def get_all_types():
    AllTypes = getData('select Distinct Product_Type from Fusion_Product')
    rows = AllTypes.to_dict(orient='records')
    payload = {'rows': rows}

    return jsonify(payload)

@app.route('/api/OutdoorFusion_Product/Data', methods=["GET"])
def get_type_data():
    type_name = request.args.get('type')
    Product_Type_Data = getData("select * from Fusion_Product where Product_Type like '" +type_name+ "'")

    rows = Product_Type_Data.to_dict(orient='records')
    payload = {'rows': rows}

    return jsonify(payload)

@app.route('/api/OutdoorFusion_Product_Year/Data', methods=["GET"])
def get_type_data_Year():
    type_name = request.args.get('type')
    Product_Type_Data = getData("select * from Fusion_Product_Year where Product_Type like '" +type_name+ "'")

    rows = Product_Type_Data.to_dict(orient='records')
    payload = {'rows': rows}

    return jsonify(payload)

@app.route('/api/OutdoorFusion_Product_Customer/Data', methods=["GET"])
def get_type_data_Customer():
    type_name = request.args.get('type')
    Product_Type_Data = getData("select * from Fusion_Customers where Product_Type like '" +type_name+ "'")

    rows = Product_Type_Data.to_dict(orient='records')
    payload = {'rows': rows}

    return jsonify(payload)



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
@app.route('/api/OutdoorFusion/Northwind_product', methods=['GET'])
def get_northwind():
    northwind_df = getData("SELECT * FROM dbo.Northwind_product")
    rows = northwind_df.to_dict(orient='records')
    payload = {'rows': rows}

    return jsonify(payload)

# Get Adventureworks products
@app.route('/api/OutdoorFusion/AdventureWorks_product', methods=['GET'])
def get_adventure():
    adventure_df = getData("SELECT * FROM dbo.AdventureWorks_product")
    rows = adventure_df.to_dict(orient='records')
    payload = {'rows': rows}

    return jsonify(payload)

# Get AenC products
@app.route('/api/OutdoorFusion/AenC_product', methods=['GET'])
def get_aenc():
    aenc_df = getData("SELECT * FROM dbo.AenC_product")
    rows = aenc_df.to_dict(orient='records')
    payload = {'rows': rows}

    return jsonify(payload)

# Get bike sales
@app.route('/api/OutdoorFusion/BikeSalesProduct', methods=['GET'])
def get_bikesales():
    bikesales_df = getData("SELECT * FROM dbo.BikeSalesProduct")
    rows = bikesales_df.to_dict(orient='records')
    payload = {'rows': rows}

    return jsonify(payload)

# Get machine learning predictions
@app.route('/api/OutdoorFusion/MachineLearning/Regression', methods=['POST'])
def perform_regression():
    data = request.get_json()
    type_name = data.get('type')
    y_variable = data.get('y_variable')
    table_Name = data.get('table_Name')

    # Fetch the data from the database based on the table_name parameter
    Table_df = getData("SELECT * FROM " + table_Name + " where Product_Type like '" +type_name+ "'")

    # Select all columns except the y_variable as X
    x_columns = [col for col in Table_df.columns if col != y_variable]
    X = Table_df[x_columns]  # Use all columns except the y_variable
    y = Table_df[y_variable]  # Use the selected Y variable
    X = pd.get_dummies(X, drop_first=True)

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train your regression model using the training set
    model = LinearRegression()  # Replace with the regression model of your choice
    model.fit(X_train, y_train)

    # Make predictions on the test set
    predictions = model.predict(X_test)

    score = model.score(X_test, y_test)

    return jsonify({'predictions': predictions.tolist(), 'score': score})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)