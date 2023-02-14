const express=require('express')
const cors=require('cors')
const app=express();
require('./db/config')
const User=require("./db/User")



const Jwt= require("jsonwebtoken")
const jwtKey='e-comm';



const Product=require("./db/Product")



// const mongoose=require('mongoose')
// const connectDB= async()=>{
//     mongoose.connect("mongodb://localhost:27017/e-comm");
//     const productSchema=new  mongoose.Schema({});
//     const product= mongoose.model('product',productSchema);
//     const data=await product.find();
//     console.log(data)

// }

// connectDB();

// for get method defining schema is not necessary
// app.get("/",(req,res)=>{
//     res.send("hello from backend")
// })

app.use(express.json())
app.use(cors());



app.post("/register",async (req,res)=>{
       // for using this we neew to use app.use(express.json()) to convert the incoming data into json format
        console.log(req.body)
        // res.send("api in progress")
        // send hmesa object hota h
        let user = new User(req.body);
        let result=await user.save();
        //now password wolud not be send as a response body
        result= result.toObject();
        delete result.password
        if(result){
            // after jwtKey we can also give the expiry time
            Jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send({result : " Something went wrong, Please try after some time"})
                }
                res.send({result,auth:token});
            })          
        }
})

app.post("/login", async (req,res)=>{
    // password would be removed
    //   console.log(req.body)
    if(req.body.password && req.body.email){
        let user=await User.findOne(req.body).select("-password");
        if(user){
            // after jwtKey we can also give the expiry time
            Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send({result : " Something went wrong, Please try after some time"})
                }
                console.log("token is ",tok
                )
                res.send({user,auth:token});
            })          
        }
        else{
            res.send({result : " no user found"})
        }
    }
    else{
        res.send({result : " no user found"})
    } 
})




app.post("/add-product",verifyToken,async (req,res)=>{

    let product= new Product(req.body)
    // console.log(product)
    // product= JSON.stringify({product})
    // console.log("-->",typeof(product))
    console.log(req.body)
    let result= await product.save();
    res.send(result)


})



app.get("/products",verifyToken,async(req,res)=>{
    let products= await Product.find();
    // console.log(products.length)
    // const size=products.length
    if(products.length>0){
        res.send(products)
    }
    else{
        res.send({result:"No products found"})
    }

})


app.delete("/product/:id",verifyToken ,async(req,res)=>{
    // res.send("workinng...")

    // res.send(req.params.id);
    const result= await Product.deleteOne({_id:req.params.id})
    res.send(result)
})


app.get("/product/:id",verifyToken,async(req,res)=>{
    const result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result)
      

    }
    else{
        res.send({result:"No such product"})
    }
   
})

app.put("/product/:id", verifyToken,async(req, res)=>{
    let result= await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
            )
    res.send(result)
})



app.get("/search/:key",verifyToken,async(req,res)=>{

    console.log(req.headers.token)

    let result= await Product.find({
          "$or":[
            {
                price:{$regex:req.params.key}
            },
            {
                name:{$regex:req.params.key}
            },
            {
                category:{$regex:req.params.key}
            },
            {
                company:{$regex:req.params.key}
            }
          ]
    });
    res.send(result)
})


// now we will verify token in the backend

function verifyToken(req, res, next){
    let token= req.headers['authorization'];
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzZTI4MmY4ZmExZTlhNjM5OTQ4N2NmNSIsIm5
    if(token){
            token= token.split(' ')[1];
            // console.log("middle wear called ",token);
           Jwt.verify(token,jwtKey,(err,valid)=>{
                    if(err){
                        res.status(401).send({result:"Please provide valid token"})
                    }
                    else{
                            next();
                    }
           })

    }

    else{
            res.status(403).send({result:"Please add token"})
    }

  


    //bearer token is also sometimes passed with login token
    // next();


}







app.listen(5000,()=>{
    console.log("Server has been started...")
})