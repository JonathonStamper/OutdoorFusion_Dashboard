import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import './ChartDisplayer.css';

export default function Chart_Diplay(props){
    const [SelectionY, setSelectionY] = useState();
    const [SelectionX, setSelectionX] = useState();

    const [TableData, setTableData] = useState();
    const [Columns, setColumns] = useState();

    const{table} = useParams();

    const fetchTable = () =>{
        fetch(`http://localhost:5000/api/OutdoorFusion/${table}`)
        .then((response) => response.json()
        .then((data) => {
            if (data.rows && data.rows.length > 0) {
                const columns = Object.keys(data.rows[0]);
                setColumns(columns);
              }
                setTableData(data);
        }))
    };

    useEffect(() => {
        fetchTable();
    }, [])

    return(
        <>
        <section>
            <div>
                <h2>These charts are based on this table: {table}</h2>
            </div>
            <div className="Chart_Display">

            <div>
            <h3>Chart placement</h3>
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
                <button onClick={() => 1 + 1}>Place In Y column</button>
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
        </>
    )
}