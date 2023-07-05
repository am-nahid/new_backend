
const storedData = []
const bcrypt = require('bcrypt')

const dotenv = require("dotenv")
dotenv.config()
const jwt = require('jsonwebtoken')

const saltNumber = process.env.salt_round 
const secretKey = process.env.secret_key  
const saltRound = parseFloat(saltNumber)
// console.log(typeof(saltRound));
// console.log(secretKey);

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
        const token = jwt.sign({user:data.email},secretKey,{expiresIn:'3d'})

        const tempObj = {
            name:data.name,
            phone:data.phone,
            email:data.email,
            password:hashedPassword
        }

        const options = {
            expires: new Date(
               Date.now()+5*24*60*60
            )
          }
          storedData.push(tempObj)
      
          res.status(200).cookie("tokenName",token,options).send(storedData)
    }

}




// const login=(req,res)=>{
//     const data = req.body;
//     const user = storedData.find((item) => item.email === data.email);
 

//     if(user.email ===data.email){
//         // res.send("user has logged in succesfully")
//         const validate = bcrypt.compareSync(data.password,user.password)
//         const token = jwt.sign({user:user.email},secretKey,{expiresIn:3600})
//         if(validate){
//             res.send({
//                 email:user.email,
//                password:user.password,
//                token:token
//             })
//         }    }
//     else{
//         res.send("User has not registered, please try again")
//     }
// }
const login =(req,res)=>{
    const data = req.body
    const user = storedData.find((item)=>item.email===data.email)
    if(user  && user.email ===data.email){
       const validate = bcrypt.compareSync(data.password,user.password)
       const token = jwt.sign({user:user.email},secretKey,{expiresIn:"1d"})
       if(validate){
          const userInfo = {
             email:user.email,
             password:user.password ,
             token:token
          }
          const options = {
             expires: new Date(
                Date.now()+5*24*60*60
             )
           }
          res.status(200).cookie("tokenName",token,options).send(userInfo)
       } else{
          res.send("Invalid Password")
       }
    }else{
       res.send("user has not registered")
    }
 
 }

const logout=(req,res)=>{
   res.cookie("tokenName",{
      expires:new Date(Date.now())
  })
  res.status(200).json({
      msg:"user LogedOut"
  })
}

const allUsers = (req,res)=>{
   if(storedData){
       res.send(storedData)
   }
}

module.exports={register,login, logout,allUsers}


// const storedData = []
// const bcrypt = require('bcrypt')

// const jwt = require('jsonwebtoken')

// const dotenv = require("dotenv")
// dotenv.config()

// const saltNumber = process.env.salt_round 
// const secretKey = process.env.secret_key  
// const saltRound = parseFloat(saltNumber)

// const register=(req,res)=>{
//     // res.send({msg:"register"})
//     const data = req.body;
//     const user = storedData.find((item) => item.email === data.email);
//     if(user){
//         res.send({msg:"user already exist"})
//     }else{
//         const salt = bcrypt.genSaltSync(saltRound)

//         const hashedPassword = bcrypt.hashSync(data.password,salt)

//         const tempObj = {
//             name:data.name,
//             phone:data.phone,
//             email:data.email,
//             password:hashedPassword
//         }

//         storedData.push(tempObj)
//         res.send(storedData)
//     }
// }

// const login=(req,res)=>{
//     // res.send({msg:"login"})
//     const data = req.body;
//     const user = storedData.find((item) => item.email === data.email);
//     if(user && user.email ===data.email){
//         // res.send("user has logged in succesfully")
//         const validate = bcrypt.compareSync(data.password,user.password)
//         const token = jwt.sign({user:user.email},secretKey,{expiresIn:3600})
//         if(validate){
//             res.send({
//                 email:user.email,
//                password:user.password,
//                token:token
//             })
//         }else{
//             res.send("Invalid Password")
//         }  
//       }
//     else{
//         res.send("User has not registered, please try again")
//     }
// }

// const logout=(req,res)=>{
//     res.cookie("tokenName",{
//         expires:new Date(Date.now())
//     })
//     res.status(200).json({
//         msg:"user LogedOut"
//     })
// }

// module.exports = {register, login, logout}