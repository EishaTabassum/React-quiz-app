const express = require('express');
// let exam = require("./models/exam");
let Subject = require("./models/subject");
let batches = require("./models/batches");
let Quizes= require('./models/exam')

const { MongoClient } = require('mongodb');
let mongoose = require('mongoose');
const subject = require('./models/subject');

const uri = 'mongodb://localhost:27017/naturalDB';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express();

app.use(express.json());

app.get('/batches', (req, res) => {
    batches.find({}, (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
      } else {
        res.send(data)
      }
    });
  });
  
app.post('/subjects', (req, res) => {
  subject.find({b_name:req.body.batch}, (error, data) => {
    if (error) {
      console.error(error);
      // res.status(500).send('Error fetching data');
    } else {
      res.send(data)
    }
  });
});
app.post('/subjects/add',async (req, res) => {
 
 let subs=await subject.countDocuments();
 
  let data ={
    subId: subs+1,
    b_name: req.body.b_name,
    title: req.body.title,

  };
  let newsubject = new Subject(data)
  newsubject.save();
  subject.find({b_name:req.body.b_name},async (error, data) => {
      res.send(data)
  });
  // console.log(subs)

});


app.post('/fetchExams',async (req, res)=>{
  
  // console.log(req.body.sub)
  Quizes.find({sub_name:req.body.sub}, (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error fetching data');
    } else {
      res.send(data)
      // console.log(data)
    }

})})

app.post('/saveQuiz',async (req, res)=>{
    let count = await Quizes.countDocuments()
    let quizd= Quizes.find({})
    const quizdata= {
      sub_name: req.body.sub_name,
      Question:req.body.exam
    
    };
    const updatedObject = {
      ...quizdata,
      ex_id: count+1,
    };
    console.log(quizdata)
let newQuiz= new Quizes(updatedObject)
newQuiz.save()

})
  

  
 



mongoose.connect("mongodb://localhost:27017/naturalDB", (err, conn) => {
  console.log(err || conn)
});
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
