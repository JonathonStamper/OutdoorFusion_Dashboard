import { useState, useEffect } from "react"


export default function Home() {
  const [Product_Groups, setProductGroups] = useState([]);
  //     const [columns, setColumns] = useState([]);



  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/api/OutdoorFusion/all');
  //       const data = await response.json();
  //       const tableColumns = Object.entries(data).map(([table, columns]) => ({
  //         table,
  //         columns: Object.keys(columns[0])
  //       }));
  //       setColumns(tableColumns);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   return (<>
  //     <h1>Hello</h1>
  //     <div>
  //       {columns.map(({ table, columns }) => (
  //         <div key={table}>
  //           <h2>{table}</h2>
  //           <ul>
  //             {columns.map(column => (
  //               <li key={column}>{column}</li>
  //             ))}
  //           </ul>
  //         </div>
  //       ))}
  //     </div>
  //     </>
  //   );
  // }


  const fetchProductGroups = () => {
    fetch('http://localhost:5000/api/OutdoorFusion/all')
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is in the same format as the previous example
        const tableColumns = Object.entries(data).map(([table, columns]) => ({
          table,
          columns: Object.keys(columns[0])
        }));
        setProductGroups(tableColumns);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching product groups:', error);
      });
  };
  
  useEffect(() => {
    fetchProductGroups();
  }, []);
  
  return (
    <>
      <h2>Different product groups</h2>
      <div className="Product_Groups_Container">
        {Product_Groups ? (
          Product_Groups.map((productGroup) => (
            <div className="Product_Group_Container" key={productGroup.table}>
              <div>
                <h3>{productGroup.table}</h3>
                <ul id="ColumnList">
              {productGroup.columns ? (productGroup.columns.map((productGroup_column) => (
                <li key={productGroup_column}>{productGroup_column}</li>
              ))
            ) : null}
                </ul>
              </div>
            </div>
          ))
        ) : null}
      </div>
    </>
  );
}