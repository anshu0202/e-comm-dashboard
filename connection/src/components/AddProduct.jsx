import react,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const AddProduct = ()=>{

   const [pro,setPro]=useState({
      name:"",
      price:"",
      category:"",
      company:""
   })

   const [error,setError]=useState(false);
   const navigate=useNavigate();
   const handleChange=(e)=>{
        const {name,value}=e.target
        setPro(prevState=>{
            return {... prevState, [name]:value}
        })
   }
      const name=pro.name
      const price=pro.price
      const category= pro.category
      const company=pro.company

   const addProduct= async()=>{
    //  console.log(pro)
     // to convert into json object

     const name=pro.name
      const price=pro.price
      const category= pro.category
      const company=pro.company


if(!name || ! price || !category || !company){
    setError(true)
    return false;

}


      const userId= JSON.parse(localStorage.getItem("user"))
      console.log(userId._id)
    let result= await fetch("http://localhost:5000/add-product",{
        method:"post",
        body:JSON.stringify({name,price,category,company}),
        headers:{
            'Content-Type':"application/json",
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
        
    });

    // here json function has been used to convert read stream data into json format 
    result= await result.json();
    navigate('/')
    console.warn(result)


   } 





    return ( <div className='product'><h1> Add Product  </h1>
            <input  className='inputBox' type="text" placeholder='Enter product name' onChange={handleChange} name="name" value={pro.name} />
            { error &&  !name &&
            <span className='invalid-input'> *Enter valid name</span>}


            <input className='inputBox' onChange={handleChange} type="text" placeholder='Enter product price' name="price" value={pro.price} />

            { error &&  !price &&
            <span className='invalid-input'>*Enter valid price</span>} 


            <input className='inputBox' type="text" placeholder='Enter product category' onChange={handleChange} name="category" value={pro.category} />

            { error && !category && 
            <span className='invalid-input'>*Enter valid category</span>}


            <input className='inputBox' type="text" placeholder='Enter product company' onChange={handleChange} name="company" value={pro.company} />
            { error &&  !company &&
            <span className='invalid-input'>*Enter valid company name</span>}
            <button onClick={addProduct} className='btn'>Add Product</button>
    </div >);
}

export default AddProduct;