const pool = require('../database/index')
const bcrypt = require('bcrypt')
const crypt = require('crypto')
const userController = {
    signIn: async (req,res) =>{
        try{
            const { email, password} = req.body
            const passwordHash = await bcrypt.hash(password,12)
            const uuid = crypt.randomUUID()
            const [resu,fiel] = await pool.query("select * from user where email = ?",[email])
            console.log('res:'+resu)
            if(resu[0]!=null){
                res.json({
                    message:"email is register try again"
                  })
            }else{
                const sql = "insert into user (uid,email,password) values (?,?,?)"
                const [rows,fields] = await pool.query(sql,[uuid,email,passwordHash])       
                console.log('rows:'+rows)
                res.json({
                  message:"succes save data",
                  id: uuid
                })
            }
        }catch(error){
            res.json({
                message:"error save data"
              })
              console.log(error)
        }
      
    },
    login: async (req,res) =>{
        try{
           const { email, password} = req.body
           const [resu,fiel] = await pool.query("select * from user where email = ?",[email])
           if(resu[0]===null){
            res.json({
                message: "sign in please"
            })
            return
           }
           const isValid = await bcrypt.compare(password,resu[0].password)
           if(isValid){
            res.json({
                message: " success login",
                id: resu[0].uid
            })
           }else{
            res.json({
                message: " error login misstake password"
            })
           }
        }catch(error){
            res.json({
                message:"error save data"
              })
              console.log(error)
        }
    },
    create: async (req,res) =>{
        try{
          const { uid, text} = req.body
          const sql = "insert into data (uid,text) values (?,?)"
          const [rows,fields] = await pool.query(sql,[uid,text])
          res.json({
            message:"success create"
          })
        }catch(error){
            res.json({
                message:"error save data"
              })
              console.log(error)
        }
    },
    getData: async (req,res) =>{
        try{
          const uid = req.query.uid
          const [rows,fields] = await pool.query("select * from data where uid = ?",[uid])
          if(rows===null){
            res.json({
                message: "data is not"
            })
          }else{
            res.json({
                data:rows
            })
          }
        }catch(error){
            res.json({
                message:"error save data"
              })
              console.log(error)
        }
    }
}

module.exports = userController