import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Test from './test'
import './ChartDisplayer.css';

export default function Chart_Diplay(props){
    const [SelectionY, setSelectionY] = useState();
    const [SelectionX, setSelectionX] = useState();
    const [TableName, setTableName] = useState();

    const [MLY, setMLY] = useState();
    const [MLScore, setMLScore] = useState();

    const [TableData, setTableData] = useState();
    const [Columns, setColumns] = useState();

    // const{table} = useParams();
    const{type} = useParams();

    // const fetchTable = () =>{
    //     fetch(`http://localhost:5000/api/OutdoorFusion/${table}`)
    //     .then((response) => response.json()
    //     .then((data) => {
    //         if (data.rows && data.rows.length > 0) {
    //             const columns = Object.keys(data.rows[0]);
    //             setColumns(columns);
    //           }
    //             setTableData(data);
    //     }))
    // };

    const fetchTypeColumns = () =>{
        // setColumns([]);
        // setTableData([]);
        fetch(`http://localhost:5000/api/OutdoorFusion_Product/Data?type=${type}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }).
          then((response) => response.json().
          then((data) => {
            setTableName("Fusion_Product")
            if (data.rows && data.rows.length > 0) {
                const columns = Object.keys(data.rows[0]);
                setColumns(columns);
              }
                setTableData(data);
          }))
    }


    const fetchType_YearColumns = () =>{
        // setColumns([]);
        // setTableData([]);
        fetch(`http://localhost:5000/api/OutdoorFusion_Product_Year/Data?type=${type}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }).
          then((response) => response.json().
          then((data) => {
            setTableName("Fusion_Product_Year")

            if (data.rows && data.rows.length > 0) {
                const columns = Object.keys(data.rows[0]);
                setColumns(columns);
              }
                setTableData(data);
          }))
    }

    const fetchType_CustomerColumns = () =>{
        // setColumns([]);
        // setTableData([]);


        fetch(`http://localhost:5000/api/OutdoorFusion_Product_Customer/Data?type=${type}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }).
          then((response) => response.json().
          then((data) => {
            setTableName("Fusion_Customers")
            if (data.rows && data.rows.length > 0) {
                const columns = Object.keys(data.rows[0]);
                setColumns(columns);
              }
                setTableData(data);
          }))
    }

    const fetchMLRegression = () => {
        fetch(`http://localhost:5000/api/OutdoorFusion/MachineLearning/Regression`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type: type, y_variable: MLY, table_Name: TableName}),
        })
          .then((response) => response.json())
          .then((data) => {
            const score = data.score;
            setMLScore(score);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };

      const fetchMLCluster = () => {
        fetch(`http://localhost:5000/api/OutdoorFusion/MachineLearning/Regression`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type: type, y_variable: MLY, table_Name: TableName}),
        })
          .then((response) => response.json())
          .then((data) => {
            const score = data.score;
            setMLScore(score);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };

    useEffect(() => {
        // fetchTable();
        // fetchTypeColumns();
    }, [])


    return(
        <>
        <section>
            <div>
                <h2>These charts are based on this type: {type}</h2>
            </div>
            <div id="ButtonList">
                <button onClick={() => fetchTypeColumns()}>Product</button>
                <button onClick={() => fetchType_YearColumns()}>Year</button>
                <button onClick={() => fetchType_CustomerColumns()}>Country</button>
            </div>

            <div className="Chart_Display">

            <div>

            <h3>Chart placement</h3>
                <Test data={TableData} selectionX={SelectionX} selectionY={SelectionY}></Test>
            </div>

            <div className="columnListsContainer">
            <div>
                <h3>Y-as selection</h3>
                <div className="columnListContainer">   
                {Columns ? (Columns.map((column) => (
                <div >   
                <label htmlFor={column} key={column}>{column}</label>
                <input type="radio" name="column_names_for_Y" value={column} onChange={() => setSelectionY(column)}/>
                </div> 
                ))): null}
                <button onClick={() => 1+1}>Place In Y column</button>
                </div>
                
            </div>   

             <div>
                <h3>X-as selection</h3>
                <div className="columnListContainer">
                {Columns ? (Columns.map((column) => (
                <div>   
                <label htmlFor={column} key={column}>{column}</label>
                <input type="radio" name="column_names_for_X" value={column} onChange={() => setSelectionX(column)}/>
                </div> 
                ))): null}
                <button onClick={() => 1 + 1}>Place In X column</button>
                </div>
            </div>
            </div>

            </div>
        </section>
        <br></br>
        
        <section>
            <div className="columnMLsContainer">
            <div className="columnMLContainer">
                {Columns ? (Columns.map((column) => (
                <div>   
                <label htmlFor={column} key={column}>{column}</label>
                <input type="radio" name="MLY" value={column} onChange={() => setMLY(column)}/>
                </div> 
                ))): null}
                <button onClick={() => fetchMLRegression()}>Place In X column</button>
                </div>
            <h2>This is the score {MLScore}</h2>
            </div>
        </section>
        </>
    )
}