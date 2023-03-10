const express = require("express")
const fs=require("fs")

const app = express()

app.use(express.json()) //middleware

app.get("/",(req,res) => {
    res.send("Home Page")
})
app.get("/students",(req,res)=> {
    const data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
    res.send(data.students)
})

app.post("/addteacher",(req,res) => {
    const data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
    data.teachers.push(req.body)
    fs.writeFileSync("./db.json",JSON.stringify(data))
    res.send("Data has been added into the db")
})

app.patch("/updatestudent",(req,res) => {
    const data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
    for(let i=0; i<=data.students.length-1; i++){
        if(data.students[i].name==="Hanu"){
            data.students[i].age=req.body.age
        }
    }
    fs.writeFileSync("./db.json",JSON.stringify(data))
    res.send("Data has been updated")
})

app.delete("/deletestudent",(req,res)=> {
    const data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let new_student_data = data.students.filter(ele=>{
        return ele.name!=="Hanu"
    })
    data.students=new_student_data
    fs.writeFileSync("./db.json",JSON.stringify(data))
    res.send("Data has been deleted")
})

app.listen(8080,() => {
    console.log("App running on port 8080");
})










