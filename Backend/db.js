const mongoose = require('mongoose');

const mongoURI= "mongodb://127.0.0.1:27017/?directConnection=true&readPreference=primary&tls=false";

// const connectToMongo=()=>{
//      mongoose.connect(mongoURI,()=>{
//          console.log("connected to mongo successfully");
//      })
    

// }
const connectToMongo=async()=>{
   await  mongoose.connect(mongoURI).then(() => {
           console.log("Connected to Database");
      }).catch((err) => {
             console.log("Not Connected to Database ERROR! ", err);
         });
    
 
}


module.exports= connectToMongo ;