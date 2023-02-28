import { useState } from "react";
import data from "./component/back/data/data";
import Header from "./component/front/header/header";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesAll from "./component/front/routes/routes";
import "./App.css";
import { Alert } from "@mui/material";
// import Home from "./component/front/home";


// import{Snackbar,Alert} from "@mui/material";



// import {useHistory} from "react-router-dom";
// import Wishlist from "./component/front/whishlist/whishlist";

function App() {
  const [carItems, setCarItems] = useState([]);
  const [productItems,setProductItems] = useState(data.products)
  // const [value,setValue] = useState(data.products.rating)
   const [information,setInformation]=useState([]);
   const[search,setSearch]=useState([]);
  const[whishlist,setWhishlist]=useState([]);
   const[hide,setHide]=useState(false);
   const[compare,setCompare]=useState([]);
   const[rCompare,setRCompare]=useState([])
   const[snack,setSnack]=useState(false);
  
console.log(productItems);

  
  
 const handlesearch=(e)=>{
    if (e.target.value===""){
      setProductItems(data.products)

    }
    else{
      const filterresult=data.products.filter((item)=>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())||item.category.toLowerCase().includes(e.target.value.toLowerCase()))
      let com=([...filterresult])
      if(filterresult.length>0){
      setProductItems(com)
      }
      else{
        setProductItems([{"name":"no data found"}])
      }
    }
 }
 const handleGo=()=>{
  const item=([...productItems])
  setRCompare(item);
  
 }

  const handleFilter=(item)=>{
    const result=data.products.filter((items)=> { return items.category === item})
    setProductItems(result);
  }
  const handleFilters=()=>{
   setProductItems(data.products);
  }
  //const { productItems } = data;
  // let history=useHistory();
  // const handleAddProduct = (product,s) => {
   
  //   const ProductExist = carItems.find((item) => item.id === product.id);
  //   if (ProductExist) {
      
  //     setCarItems(
       
  //       carItems.map((item) =>
  //         item.id === product.id 

  //           ? { ...ProductExist, quantity: ProductExist.quantity+1 }
  //           : item
           
          
  //       )
        
  //     );
      
      
     
  //   } else {
  //     setCarItems([...carItems, { ...product, quantity: 1 }]);
     
      
      
  //   }  if(product.available >=1 && product.available<=10 ){
  //     let temp = [...productItems];
  //     let index = temp.indexOf(product);
  //     temp[index].available -= 1;
  //     temp[index].amount +=s;
  //     setProductItems(temp)
  //     }
  //    else {
  //     Alert("")
  //    }
  // };
  const handleAddProduct = (product) => {
    let temp=[...carItems];
    if(carItems.indexOf(product)!==-1){
      return;
    }
    else{
      temp.push(product);


    }
    setCarItems(temp);
  };


  // const handleRemove = (product,s) => {
  //   const ProductExist = carItems.find((item) => item.id === product.id);
  //   if (ProductExist.quantity === 1) {
  //     setCarItems(carItems.filter((item) => item.id !== product.id));
  //   } else {
  //     setCarItems(
  //       carItems.map((item) =>
  //         item.id === product.id
  //           ? { ...ProductExist, quantity: ProductExist.quantity - 1 }
  //           : item
           
  //       )
  //     );
     
  //   }
  //   if(product.available >=1 && product.available<=10){
  //     let temp = [...productItems];
  //     let index = temp.indexOf(product);
  //     temp[index].available += 1;
  //     temp[index].amount -=s;  
  //     setProductItems(temp)
  //     }
      
    
    

  // };
  const handleRemove = (product,s) => {
    let ind=-1;
    let temp=[...carItems];
    temp.forEach((data,index)=>{
      if(data.id===product.id) ind=index;

    });
    if(product.available >=1 && product.available<=10){
      let tempA=carItems;
      tempA[ind].amount +=s;
      if(tempA[ind].amount===0) tempA[ind].amount=1;
      tempA[ind].available -= s;
      setCarItems([...tempA]);
    }else{
      setSnack(true);
    }

  }
  const handleClose=(reason)=>{
    if(reason==="clickaway"){
      return
    }
    setSnack(false);
  }

  const handleClear = () => {
    setCarItems([]);
   
  };
  const handleDelete = (id) => {
    const arr = carItems.filter((items) => items.id !== id);
    setCarItems(arr);
 
  };
  const handledelete = (id) => {
    const arr = whishlist.filter((items) => items.id !== id);
    setWhishlist(arr);
  };
  const handlewishlist=(products)=>{
    const ProductExist = whishlist.find((item) => item.id === products.id);
    if (ProductExist) {
      setWhishlist(
        whishlist.map((item) =>
          item.id === products.id
            ? { ...ProductExist}
            : item
           
          
        )
      );
     
    } else {
      
      setWhishlist([...whishlist, { ...products, quantity: 1 }]);
      if(products.length>=1){
        setHide(true)

      }
      
    }

  };
  

const handlebacktocart=(product)=>{
  const ProductExist = whishlist.find((item) => item.id === product.id);
  if (ProductExist) {
    setCarItems(
      whishlist.map((item) =>
        item.id === product.id
          ? { ...ProductExist}
          : item
         
        
      )
      
    );
   
  } else {
    
    setCarItems([...whishlist, { ...product, quantity: 1 }]);  
    
  }
  let temp=[...whishlist] ;
    let index=whishlist.indexOf(product) ;
    temp.splice(index,1);
    setWhishlist(temp);

}
const handleInformation=(product)=>{
 
 
  setInformation(product);
  console.log(information)

 
  
}
 const handleCompare=(item)=>{ 
  const ProductExist = compare.find((items) => items.id === item.id);
  if(  compare.length<4){
    if (ProductExist) {
      alert("product already exist")
    } 
    else{
  let temp=[...compare]
  temp.push(item);
  setCompare(temp);
  console.log(compare);
}
  }
   
  else{
    alert("cant compare more than four products")
  }

 }
 const handleMultiComp=()=>{
  if( compare.length>=0 && compare.length<=4){
  
  setRCompare([...compare]);
  // setCompare([]);
  
  }
 
  else{
 alert("cant compare more than four products")
}

  
 }
 const handleDlt=(id)=>{
  
 const arr=rCompare.filter((items)=>items.id !==id);
 setRCompare(arr);
  
  setCompare(arr);


 }

  return (
    <div className="App">
      {/* <Home/> */}

      <Router>
        <Header carItems={carItems} 
        whishlist={whishlist}
        
        handleFilter={handleFilter}
        handleFilters={handleFilters}
       
       />
        <RoutesAll
        handleDlt={handleDlt}
        handleMultiComp={handleMultiComp}
        handleCompare={handleCompare}
          productItems={productItems}
          carItems={carItems}
          handleAddProduct={handleAddProduct}
          // handleAddQuantity = {hanldeAddQuantity}
          // handleRemoveQuantity = {handleRemoveQuantity}
          handleRemove={handleRemove}
          handleClear={handleClear}
          handleDelete={handleDelete}
          handlewishlist={handlewishlist}
          whishlist={whishlist}
          handledelete={handledelete}
          handlebacktocart={handlebacktocart}
          handleInformation={handleInformation}
          information={information}
          setInformation={setInformation}
          setProductItems={setProductItems}
          handleFilter={handleFilter}
          handleFilters={handleFilters}
          handlesearch={handlesearch}
           setHide={setHide}
           hide={hide}
           compare={compare}
          
           rCompare={rCompare}
           handleGo={handleGo}
           snack={snack}
           handleClose={handleClose}
           
          
          
        />
      </Router>
     
    </div>
  );
}

export default App;
