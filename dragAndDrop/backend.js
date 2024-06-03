import express from "express";
import mysql from 'mysql2';
import cors from 'cors'
import bodyParser from "body-parser";

const app = express();

const jsonParser = new bodyParser.json();

app.use(cors());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'tododatabase'
 }).promise();

 app.get("/",(req,res) =>{
    res.send("tododatabase")
 })

 app.get("/tododatabase", async(req,res)=>{
    const temp = await db.query("SELECT * FROM tododatabase")
    const rows = temp[0];
    const fields = temp[1];
    res.send(rows)
 })

 app.post("/tododatabase", jsonParser,async(req,res) =>{
    let cardData = [req.body.id, req.body.columnId ,req.body.content]
    const insert = db.query("INSERT INTO tododatabase(id,columnId,content) VALUES (?,?,?)",cardData)
    
    res.send(200);
 })



 app.get("/tododatabase/:id",async(req,res) =>{
   let itemId = parseInt(req.params.id)
   const [rows,fields] = await db.query("SELECT id,columnId,content FROM tododatabase WHERE id = ?", [itemId])
   if(rows.length == 1)
      {
         res.status(200).send(rows[0]);
      }
   
 })

 app.put("/tododatabase/:id",jsonParser,async(req,res)=>{
   let itemId = parseInt(req.params.id)
   let itemData = [req.body.columnId, req.body.content]

   const [rows,fields] = await db.query("SELECT id,columnId,content from tododatabase WHERE id = ?", [itemId])


  

   if(rows.length == 1)
      {
         const putData = await db.query("UPDATE tododatabase SET content = ? WHERE id = ?",[req.body.content,itemId])
         res.status(200).send(rows)
      }
   
   



 })


 app.delete("/tododatabase/:id", jsonParser, async(req,res)=>
{
   let itemId = parseInt(req.params.id)
   const [rows,fields] = await db.query("SELECT id,columnId,content from tododatabase WHERE id = ?", [itemId])

   if(rows.length == 1)
      {
         const deleteData = await db.query("DELETE FROM tododatabase WHERE id = ?", [itemId])
         res.status(200).send("Sikeres törlés")
      }
})




 app.listen("3000")