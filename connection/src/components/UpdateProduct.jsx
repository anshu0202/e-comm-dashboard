import react,{useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
 const UpdateProduct=()=>{

    const [pro,setPro]=useState({
        name:"",
        price:"",
        category:"",
        company:""
     })

     const params=useParams();
     const navigate=useNavigate();
   const handleChange=(e)=>{
    const {name,value}=e.target
    setPro(prevState=>{
        return {... prevState, [name]:value}
    })
}
   useEffect(()=>{
    //    console.log(params)
       getProductDetails()
       
   },[])

   const getProductDetails=async ()=>{

    let result= await fetch(`http://localhost:5000/product/${params.id}`,{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
    })

    result= await result.json()
    console.log("the result is ",result)
    if(result){
        setPro(result)
    }


   }

  
  const name=pro.name
  const price=pro.price
  const category= pro.category
  const company=pro.company


  const updateProduct= async()=>{
        //  console.log(name, price, category)


    let result= await fetch(`http://localhost:5000/product/${params.id}`,{
        method:"Put",
        body:JSON.stringify({name,price,company,category}),
        headers:{
            'Content-Type':"application/json",
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
    });

    result=await result.json()
    if(result){
        navigate('/')
        // alert("Product has been updated")
    }
    console.log(result)

  }

    return (
        <div className='product'>
            <h1>Update Product</h1>

      <input  className='inputBox' type="text" placeholder='Enter product name' onChange={handleChange} name="name" value={pro.name} />
            
        


            <input className='inputBox' onChange={handleChange} type="text" placeholder='Enter product price' name="price" value={pro.price} />

            
        

            <input className='inputBox' type="text" placeholder='Enter product category' onChange={handleChange} name="category" value={pro.category} />  


            <input className='inputBox' type="text" placeholder='Enter product company' onChange={handleChange} name="company" value={pro.company} />
            <button onClick={updateProduct} className='btn'>Update Product</button>        </div>

    );
 }

export default UpdateProduct;