import { useState, useEffect } from "react";
import "./Home.css";
import { IoMdShirt } from "react-icons/io";

export default function Home() {
  const [Product_Groups, setProductGroups] = useState([]);

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

  useEffect(() => {
    fetchProductGroups();
  }, []);

  return (
    <>
      <h2>Different product groups</h2>
      <div className="Product_Groups_Container">
        {Product_Groups
          ? Product_Groups.map((productGroup) => (
              <div className="Product_Group_Container" key={productGroup.table}>
                <div id="Product_Group_Container">
                  <h3>{productGroup.table}</h3>
                  <ul id="ColumnList">
                    {productGroup.columns
                      ? productGroup.columns.map((productGroup_column) => (
                          <li key={productGroup_column}>
                            {productGroup_column}
                          </li>
                        ))
                      : null}
                  </ul>
                  <a href={`/Datachart/${productGroup.table}`}>Analyze me</a>
                </div>
              </div>
            ))
          : null}
      </div>

      {/* <div><IoMdShirt/></div> */}
    </>
  );
}
