import React, {useEffect, useState} from 'react';
import {Chart} from 'chart.js';
import BarChart from './chartComponent';

const _titles = []
const _values = []
const _profit = []
const _quantity = []
const _unitPrice = []

const App = (props) => {
    const [state, setState] = useState()
    const [titles, setTitles] = useState([])
    const [values, setValues] = useState([])
    const [profit, setProfit] = useState([])
    const [quantity, setQuantity] = useState([])
    const [unitPrice, setUnitPrice] = useState([])

    useEffect(() => {
        setState(props)
        if (state != null) {
            console.log(state.props.Northwind_product)
            const products = state.props.Northwind_product

            for (const product of products) {
                console.log(product)
                _titles.push(product.ProductName)
                _profit.push(product.Profit)
                _quantity.push(product.Quantity)
                _unitPrice.push(product.UnitPrice)
            }

            setTitles(_titles)
            setValues(_profit)
            setProfit(_profit)
            setQuantity(_quantity)
            setUnitPrice(_unitPrice)
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

    const handleButtonClick = () => {
        console.log("hello world")
        //sets the value state with orderQty data, re-renders the chart with the orderQty data.
        console.log(quantity)
        setValues(quantity)
    }

    return (
        <div>
            <h1>Vertical Bar Chart</h1>
            <div style={{width: '100%', height: '800px', overflowX: 'auto'}}>
                <div style={{width: '1600px', height: '100%'}}>
                    <BarChart data={chartData} title="value" />
                </div>
                <button onClick={handleButtonClick}>Show Component</button>
            </div>
        </div>
    );
};

export default App;