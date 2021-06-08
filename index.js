var express = require('express');
var cors = require('cors');
// const { MongoClient } = require("mongodb");
var app = express();

//firebase initialization
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();



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

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//posting data in db

async function postData(){
  const docRef = db.collection('users');

await docRef.add({
  first: 'Ada',
  last: 'rdj',
  born: 1815
});
}
var data
async function fetchData(){

 

}





//route
 app.post('/addPost',cors(), (req, res) => {
   postData()
   res.json("value uploaded")
 })

 app.get('/fetchData', async(req, res) => {
   let fdata=[]
  const snapshot = await db.collection('users').get();
snapshot.forEach((doc) => {
  
  fdata.push(doc.data())
  
});
console.log(fdata);
res.send(fdata);
})








// const uri = 'mongodb+srv://Tribunal:Tribunal@2000@pathoduxcluster.ovtbk.mongodb.net/PathoduxCluster?retryWrites=true&w=majority';
// var client = new MongoClient(uri,connectionParams);

//     const dbName = "PathoduxServer";


                  

//     async function run() {
//       client = new MongoClient(uri,connectionParams);
//       try {
  
//            await client.connect();
  
//            console.log("Connected correctly to server");
  
//            const db = client.db(dbName);
  
//            // Use the collection "people"
  
//            const col = db.collection("postedIdea");
  
//            // Construct a document                                                                                                                                                              
  
//            let ideaPost = postData
  
//            // Insert a single document, wait for promise so we can read it back
  
//            const p = await col.insertOne(ideaPost);
  
//           //  // Find one document
  
//           //  const myDoc = await col.findOne();
  
//           //  // Print to the console
  
//           //  console.log(myDoc);
  
//           } catch (err) {
  
//            console.log(err.stack);
  
//        }
  
   
  
//        finally {
//           console.log('infinaaly close');
//           await client.close().then(()=>{
//             console.log("con closed")
//           });
  
//       }
  
//   }
  
//  var profileData
  
//   async function createProfile() {
//     client = new MongoClient(uri,connectionParams);
//     try {

//          await client.connect();

//          console.log("Connected correctly to server");

//          const db = client.db(dbName);

//          // Use the collection "people"

//          const col = db.collection("userProfile");

//          // Construct a document                                                                                                                                                              

//          let profile = profileData

//          // Insert a single document, wait for promise so we can read it back

//          const p = await col.insertOne(profile);

//         //  // Find one document

//         //  const myDoc = await col.findOne();

//         //  // Print to the console

//         //  console.log(myDoc);

//         } catch (err) {

//          console.log(err.stack);

//      }

 

//      finally {

//         await client.close();

//     }

// }

  


//   var postData;
//   app.post('/postIdea',cors(), function (req, res,next) {
//     console.log(req.body);
//     postData=req.body
   
//     res.json('Got a POST request');
//     run().catch(console.dir);
   
//     next();
//   });

//   app.post('/createProfile',cors(), function (req, res,next) {
//     console.log(req.body);
//     profileData=req.body
   
//     res.json('Got a POST request');
//     createProfile().catch(console.dir);
   
//     next();
//   });


 
//  app.get('/posts',cors(), (req, res) => {
//     MongoClient.connect(uri, function(err, db) {
//       if (err) throw err;
//       var dbo = db.db("PathoduxServer");
//       //Find all documents in the customers collection:
//       dbo.collection("postedIdea").find({}).toArray(function(err, result) {
//         if (err) throw err;
//         console.log(result);
//         res.json(result);
//         db.close();
//       });
//     });
   
//  })

//  app.get('/', (req, res) => {
//   res.send('Server is working');
 
// })
  

 
//  app.get('/getProfile',cors(), (req, res) => {
//     MongoClient.connect(uri, function(err, db) {
//       if (err) throw err;
//       var dbo = db.db("PathoduxServer");
//       //Find all documents in the customers collection:
//       dbo.collection("userProfile").find({}).toArray(function(err, result) {
//         if (err) throw err;
//         console.log(result);
//         res.json(result);
//         db.close();
//       });
//     });
   
//  })






//   var server=app.listen( process.env.PORT || 3000 , function () {
//   var host = server.address().address
//   var port = server.address().port
  
//   console.log("Example app listening at https://%s:%s", host, port)
// })
// console.log("done");


// mongoose.connect(url,connectionParams)
//     .then( () => {
//         console.log('Connected to database ')
//     })
//     .catch( (err) => {
//         console.error(`Error connecting to the database. \n${err}`);
//     })










//Connecting to database
// mongoose.connect('mongodb://localhost:27017/', {
//     dbName: 'event_db',
//     useNewUrlParser: true,
//     useUnifiedTopology: true 
// }, err => err ? console.log("DB not connected") : console.log('Connected to database'));


// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

//Creating Collection
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("pathodux");
//   dbo.createCollection("postedIdea", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// }); 

//   function postFeed(data){
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("pathodux");
//   var myobj = data;
//   dbo.collection("postedIdea").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// }); 
// }


