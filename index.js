const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cros = require("cors");
const port = 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cros());
app.use(express.json());
mongoose.connect(
  "mongodb+srv://124003158:1234567890@cluster0.814hkew.mongodb.net/?retryWrites=true&w=majority"
  ,
  {
    
    useNewUrlParser: true,
    
  }
).then(()=>console.log("connected")).catch(err=>console.log(err));

const contact = new mongoose.Schema({
	name: String,
	email:String,
  phoneno:Number,
  dateime:Date,
  message:String
});
const Contact = mongoose.model("People", contact);

app.post("/", async(req, res) => {
  
try{
  var {username,email,phno,date,msg}=req.body
  console.log(req.body);
  const pepople=await Contact.create({ name:username, email:email,phoneno:phno,dateime:date,message:msg })

  res.status(201).json(req.body);
}
catch(error){
  console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
}
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});