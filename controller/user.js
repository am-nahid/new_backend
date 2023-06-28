
const storedData = []
const bcrypt = require('bcrypt')

const dotenv = require("dotenv")
dotenv.config()

const saltNumber = process.env.salt_round 
const secretKey = process.env.secret_key  
const saltRound = parseFloat(saltNumber)
console.log(typeof(saltRound));
console.log(secretKey);

const register=(req,res)=>{
    // res.send({msg:"register page"})

    const data = req.body;
    const user = storedData.find((item) => item.email === data.email);


    // console.log("Stored Data:", storedData);
    // console.log("Data:", data);
    // console.log("User:", user);
    if(user){
        res.send({msg:"user already exist"})
    }else{
        const salt = bcrypt.genSaltSync(saltRound)

        const hashedPassword = bcrypt.hashSync(data.password,salt)

        const tempObj = {
            name:data.name,
            phone:data.phone,
            email:data.email,
            password:hashedPassword
        }

        storedData.push(tempObj)
        res.send(storedData)
    }

}

const jwt = require('jsonwebtoken')


const login=(req,res)=>{
    const data = req.body;
    const user = storedData.find((item) => item.email === data.email);
 

    if(user.email ===data.email){
        // res.send("user has logged in succesfully")
        const validate = bcrypt.compareSync(data.password,user.password)
        const token = jwt.sign({user:user.email},secretKey,{expiresIn:3600})
        if(validate){
            res.send({
                email:user.email,
               password:user.password,
               token:token
            })
        }    }
    else{
        res.send("User has not registered, please try again")
    }
}

const logout=(req,res)=>{
    res.send({msg:"logout page"})
}

module.exports={register,login, logout}