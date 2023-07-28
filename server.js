const express=require('express')
const body_parser=require('body-parser')
const pool=require('./db')
const { error } = require('console')
const app=express()
app.use(express.static(__dirname))
app.use(body_parser.json())
app.set('view engine','ejs')
app.use(body_parser.urlencoded({extended:true}))
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html')
})
app.post('/',function(req,res){
    var fname=req.body.fname;
    var lname=req.body.lname;
    var Father=req.body.Father;
    var Mother=req.body.Mother;
    var Sphone=req.body.Sphone;
    var Fphone=req.body.Fphone;
    var Semail=req.body.Semail;
    var Degree=req.body.Degree;
    var Course=req.body.Course;
    var Semester=req.body.Semester;
    var sql="INSERT INTO student(fname,lname,Father,Mother,Sphone,Fphone,Semail,Degree,Course,Semester) VALUES(?,?,?,?,?,?,?,?,?,?);"
    pool.query(sql,[fname,lname,Father,Mother,Sphone,Fphone,Semail,Degree,Course,Semester],function(err,result){
        if(err) throw err
        res.redirect('/front')
    })
})
    app.get('/front',function(req,res){
        var sql="SELECT * FROM student;"
        pool.query(sql,function(err,result){
            if(err) throw err
            res.render(__dirname+'/front',{student:result})
        })
    })
app.listen(3500)    