import { useState, useEffect } from "react";
import "./Home.css";
import { IoMdShirt } from "react-icons/io";

export default function Home() {
  const [Product_Groups, setProductGroups] = useState([]);
  const [ProductTypes, setProductTypes] = useState([]);

  const fetchProductGroups = () => {
    fetch("http://localhost:5000/api/OutdoorFusion/all")
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is in the same format as the previous example
        const tableColumns = Object.entries(data).map(([table, columns]) => ({
          table,
          columns: Object.keys(columns[0]),
        }));
        setProductGroups(tableColumns);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching product groups:", error);
      });
  };

  const fetchTypes = () =>{
    fetch('http://localhost:5000/api/OutdoorFusion_Type/ALL').
    then((response) => response.json()).
    then((data) => {
      const productTypes = data.rows.map(row => row.Product_Type);
      setProductTypes(productTypes)
    }).catch((error) => {
      console.error("Error fetching product groups:", error);
    });
  };

  useEffect(() => {
    fetchProductGroups();
    fetchTypes();
  }, []);

  return (
    // <>
    //   <h2>Different product groups</h2>
    //   <div className="Product_Groups_Container">
    //     {Product_Groups
    //       ? Product_Groups.map((productGroup) => (
    //           <div className="Product_Group_Container" key={productGroup.table}>
    //             <div id="Product_Group_Container">
    //               <h3>{productGroup.table}</h3>
    //               <ul id="ColumnList">
    //                 {productGroup.columns
    //                   ? productGroup.columns.map((productGroup_column) => (
    //                       <li key={productGroup_column}>
    //                         {productGroup_column}
    //                       </li>
    //                     ))
    //                   : null}
    //               </ul>
    //               <a href={`/Datachart/${productGroup.table}`}>Analyze me</a>
    //             </div>
    //           </div>
    //         ))
    //       : null}
    //   </div>

      <>
      <h2>Different product groups</h2>
      <div className="Product_Groups_Container">
        {ProductTypes
          ? ProductTypes.map((productType) => (
              <div className="Product_Group_Container" key={productType}>
                <div id="Product_Group_Container">
                  <h3>{productType}</h3>
                  <a href={`/Datachart/${productType}`}>Analyze me</a>
                </div>
              </div>
            ))
          : null}
      </div>

      {/* <div><IoMdShirt/></div> */}
    </>
  );
}
