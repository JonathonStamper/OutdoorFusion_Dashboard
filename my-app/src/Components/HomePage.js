import { useState } from "react"

export default function Home(){
    const [Product_Groups, SetProduct_Groups] = useState([]);

    const fetchProduct_Groups = () => {
        // fetch(`${Urls.backend}/api/Evenement`).
        // then((response) => response.json()).
        // then((data) => 
        // {
        //   setEvenement(data);
        //   console.log(data);
    
        // });
      }
    
      useEffect(() => {
        fetchProduct_Groups();
      }, []);
    
    return(<>
    <h2>Different productgroups</h2>
    <div className="Product_Groups_Container">
        {Product_Groups ? Product_Groups.map((Evenement) => (
        <div className="Product_Group_Container">
        <div>
            <img src=""></img>
        </div>
        <div>
            <h3>Temp_Product group Name</h3>
            <p>Temp_Product group description</p>
        </div>
        </div>
    )): null}
    
    </div>
    </>)
}