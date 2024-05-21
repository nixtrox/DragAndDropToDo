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
    res.send("200");
 })


 app.listen("3000")