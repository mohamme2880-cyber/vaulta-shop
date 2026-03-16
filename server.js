
const express=require("express")
const app=express()

app.set("view engine","ejs")
app.use(express.static("public"))

const products=[
{name:"Discord Bot Setup",price:25,desc:"Professional Discord bot setup"},
{name:"Emoji Pack",price:5,desc:"Premium emoji pack for servers"},
{name:"Server Setup",price:30,desc:"Full Discord server setup"}
]

app.get("/",(req,res)=>{
res.render("index")
})

app.get("/products",(req,res)=>{
res.render("products",{products})
})

app.get("/buy/:name",(req,res)=>{
res.render("success",{product:req.params.name})
})

app.listen(3000,()=>{
console.log("Vaulta store running")
})
