import express from "express";
import mysql from 'mysql2';
import cors from 'cors'
import bodyParser from "body-parser";

const app = express();

const jsonParser = new bodyParser.json();

app.use(cors());

const db = mysql.craetePool({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'Placeholder'
 }).promise();

 app.get("/",(req,res) =>{
    res.send("Placeholder")
 })

 app.get("/Placeholder(cards/todoCards)", async(req,res)=>{
    const temp = await db.query("SELECT * FROM Placeholder(cards/todoCards)")
    const rows = temp[0];
    const fields = temp[1];
    res.send(rows)
 })

 app.post("/Placeholder(cards/todoCards)", jsonParser,async(req,res) =>{
    let cardDAta = [req.body.numId, req.body.colId,req.body.content]
    const insert = db.query("INSERT INTO Placeholder(cards/todoCards)(numId,colId,content) VALUES  (?,?,?)")
    res.send("200");
 })


 app.listen("3000")