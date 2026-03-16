
const express=require("express")
const fs=require("fs")
const app=express()

app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))

let products=[
{ name:"Discord Bot Setup", price:25, desc:"Professional bot setup", category:"البوتات"},
{ name:"Nitro 1 Month", price:8, desc:"Discord Nitro", category:"النيتروهات"},
{ name:"Server Boost", price:5, desc:"Boost your server", category:"البوستات"},
{ name:"Discord Credits", price:10, desc:"Credits package", category:"الكريدت"}
]

app.get("/",(req,res)=>{
res.render("index")
})

app.get("/store",(req,res)=>{
res.render("store",{products})
})

app.get("/buy/:name",(req,res)=>{
res.render("success",{product:req.params.name})
})

app.listen(3000,()=>{
console.log("Vaulta store running")
})
