import react, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const ProductList=()=>{

    const [products,setProducts]=useState([])
    useEffect(()=>{
        // jaise hi page open hoga function call hoga jo backeend se product list laakr dega
            getProducts();
    },[])
    const deleteProduct=async (id)=>{
            // console.log("id is ",id)
            let result= await fetch(`http://localhost:5000/product/${id}`,{
                method:"Delete",
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            result=await result.json();
            if(result){
                getProducts();
                // alert("Item is deleted")
            }
    }   
    const getProducts = async ()=>{
      

        //using the header of an api we can send the toek to that api
        let result=await fetch("http://localhost:5000/products",{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        // get method me bss url se kaam chal jaata h
        // ,{
        //     method:"get",
        //     headers:{
        //         "Content-Type":"application/json"
        //     }
        // }
        // )
        result = await result.json();
        setProducts(result)
    }
    const searchHandle= async(e)=>{
         console.log(e.target.value)
         let key=e.target.value;
         if(!key){
                getProducts();
         }
         let result= await fetch(`http://localhost:5000/search/${key}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
         })
         result =await  result.json();

         if(result){
            setProducts(result);
         }
    }
    // console.log("products --> ",products)

  return (
        <div className='product-list'>
            <h1>Products List</h1>
            <input className='searchBox' type="text" placeholder='Search Product' onChange={searchHandle}  />
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
           {
            products.length>0? products.map((item, index)=> 
                <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>$ {item.price}</li>
                <li>{item.category}</li>
                <li>{item.company}</li>
                <li><button onClick={()=>{deleteProduct(item._id)}}>Delete</button>
                <Link to={"/update/"+item._id} >
                Update
                </Link>
                </li>
            </ul>          
            ) : <h1> No result found ! </h1>
           }


        </div>
  );
}

export default ProductList;
