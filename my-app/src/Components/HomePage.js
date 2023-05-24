import { useState } from "react"

export default function Home(){
    const [Product_Groups, SetProduct_Groups] = useState([]);

    const fetchProduct_Groups = () => {
        fetch('/api/OutdoorFusion/all')
          .then((response) => response.json())
          .then((data) => {
            SetProduct_Groups(data);
            console.log(data);
          })
          .catch((error) => {
            console.error('Error fetching product groups:', error);
          });
      };
      
      useEffect(() => {
        fetchProduct_Groups();
      }, []);
    
    return(<>
    <h2>Different productgroups</h2>
    <div className="Product_Groups_Container">
        {Product_Groups ? Product_Groups.map((Product_Group) => (
        <div className="Product_Group_Container">
        <div>
            <img src=""></img>
        </div>
        <div>
            <h3>{Product_Group.table_name}</h3>
            <p>Temp_Product group description</p>
        </div>
        </div>
    )): null}
    
    </div>
    </>)
}