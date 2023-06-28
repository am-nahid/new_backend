const express = require("express")

const dotenv = require("dotenv");
const route = require("./routes/route");

dotenv.config();


const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    res.send({msg:"home page"})
})

app.use('/user',route)


const port = process.env.PORT

app.listen(port,()=>{
    console.log(`Running on ${port}`);
})