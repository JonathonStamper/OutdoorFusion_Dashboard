import React, {useEffect, useState} from 'react';
import {Chart} from 'chart.js';
import BarChart from './chartComponent';



const App = ({data, selectionX, selectionY}) => {
    // const { data, selectionX, selectionY } = props;
    const [state, setState] = useState()
    const [titles, setTitles] = useState([])
    const [values, setValues] = useState([])

    useEffect(() => {
        if (data != null) {
            const products = data.rows
            const _titles = []
            const _values = []

            for (const product of products) {
                console.log(product)
                _titles.push(product[selectionY])
                _values.push(product[selectionX])
            }

            setTitles(_titles)
            setValues(_values)
        }
    }, [data, selectionX, selectionY]);


    const chartData = {
        // labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4'],
        // values: [10, 20, 15, 60],
        labels: titles,
        values: values,
    };


    return (
        <div>
            <h1>{selectionX} per {selectionY}</h1>
            <div style={{width: '1200px', height: '600px', overflowX: 'auto'}}>
                <div style={{width: '500%', height: '500%'}}>
                    <BarChart data={chartData}/>
                </div>
            </div>
        </div>
    );
};

export default App;