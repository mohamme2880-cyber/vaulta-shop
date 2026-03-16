
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 3000;

let products = [];
let orders = [];

function orderNumber(){
 return Math.floor(1000 + Math.random()*9000);
}

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.use(session({
 secret:"vaulta_secret",
 resave:false,
 saveUninitialized:false
}));

const ADMIN_PATH="vaulta-owner";

function admin(req,res,next){
 if(req.session.admin) return next();
 res.redirect(`/${ADMIN_PATH}/login`);
}

app.get("/",(req,res)=>{
 res.render("index",{products});
});

app.get("/products",(req,res)=>{
 res.render("products",{products});
});

app.post("/order",(req,res)=>{
 const {name,discord,product}=req.body;
 const num = orderNumber();

 orders.push({
   number:num,
   name,
   discord,
   product
 });

 res.render("success",{num});
});

app.get(`/${ADMIN_PATH}/login`,(req,res)=>{
 res.render("login");
});

app.post(`/${ADMIN_PATH}/login`,(req,res)=>{
 if(req.body.user==="owner" && req.body.pass==="1234"){
  req.session.admin=true;
  res.redirect(`/${ADMIN_PATH}`);
 }else{
  res.send("wrong login");
 }
});

app.get(`/${ADMIN_PATH}`,admin,(req,res)=>{
 res.render("admin",{products,orders});
});

app.post(`/${ADMIN_PATH}/add`,admin,(req,res)=>{
 const {title,price}=req.body;
 products.push({title,price});
 res.redirect(`/${ADMIN_PATH}`);
});

app.listen(PORT,()=>console.log("VAULTA store running"));
