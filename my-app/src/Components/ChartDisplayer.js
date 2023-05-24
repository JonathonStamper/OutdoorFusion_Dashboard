import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function Chart_Diplay(props){
    const [Selection, setSelection] = useState();
    const [Table, setTable] = useState();

    const{table} = useParams();

    const fetchTable = () =>{
        fetch(`http://localhost:5000/api/OutdoorFusion/${table}`)
        .then((response) => response.json()
        .then((data) => {
            setTable(data)
        }))
    };

    useEffect(() => {
        fetchTable();
    }, [])

    return(
        <>
        <section>
            <div>
                <h2>{table}</h2>
            
            </div>
            <div>

                <label>
                
                </label>
            </div>
        </section>
        </>
    )
}