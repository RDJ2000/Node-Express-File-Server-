var express = require('express');

const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const _ = require('lodash');
// const fs = require('fs');
// const doAsync = require('doasync');

// const { MongoClient } = require("mongodb");
var app = express();
app.use(fileUpload({
  createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



//firebase1 initialization
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  storageBucket:"gs://pathoduxchat.appspot.com/",
});

const db = admin.firestore();

const storage = admin.storage().bucket();

///////////////////////////////////////

app.use(express.urlencoded({
  extended: true
}))
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));



const connectionParams={
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
}

// const port = 3000
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

//posting data in db
app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log("Server is running.");
});
async function postData(){
 
}







//route
 app.post('/addPost',cors(),async (req, res) => {
  console.log( req.body);
  

  const docRef = db.collection('users');

  await docRef.add(req.body).then(()=>{
    res.json("value uploaded")
  }).catch((err)=>{
      res.json(err)
  })


   
 })

 app.get('/fetchData',cors(), async(req, res) => {
   let fdata=[]
  const snapshot = await db.collection('users').get();
snapshot.forEach((doc) => {
  
  fdata.push(doc.data())
  
});
console.log(fdata);
res.send(fdata);
})



