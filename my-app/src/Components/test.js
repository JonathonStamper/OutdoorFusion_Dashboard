import React, {useEffect, useState} from 'react';
import {Chart} from 'chart.js';
import BarChart from './chartComponent';

const _titles = []
const _values = []

const App = (props) => {
    const [state, setState] = useState()
    const [titles, setTitles] = useState([])
    const [values, setValues] = useState([])

    useEffect(() => {
        setState(props)
        if (state != null) {
            console.log(state.props.Northwind_product)
            const products = state.props.Northwind_product

            for (const product of products) {
                console.log(product)
                _titles.push(product.ProductName)
                _values.push(product.Profit)
            }

            setTitles(_titles)
            setValues(_values)
        }
    }, [state]);


    const chartData = {
        // labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4'],
        // values: [10, 20, 15, 60],
        labels: titles,
        values: values,
    };

    // const fetchProduct_Groups = () => {
    //       fetch(`/api/OutdoorFusion/northwind`).
    //       then((response) => response.json()).
    //       then((data) =>
    //       {
    //         setEvenement(data);
    //         console.log(data);
    //
    //       });
    // }

    return (
        <div>
            <h1>Vertical Bar Chart</h1>
            <div style={{width: '100%', height: '400px', overflowX: 'auto'}}>
                <div style={{width: '1200px', height: '100%'}}>
                    <BarChart data={chartData}/>
                </div>
            </div>
        </div>
    );
};

export default App;