const express=require('express');
const fetchuser = require('../middleware/fetchuser');
const router=express.Router(); 
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// route1: to get notes
router.get('/getallnotes',fetchuser,async(req,res)=>{
try {
    const notes= await Notes.find({user:req.user.id})
    res.json(notes);


} catch(error){
    console.log(error.message);
    res.status(500).send("Some error occured");
     }
    

})
// route2: to add notes
router.post('/addnewnote',fetchuser,[
    body('title','enter a valid title').isLength({ min: 3 }),
body('description','enter a valid description').isLength({ min: 5 }),

],async(req,res)=>{
    const {title,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
try {
  const note =new Notes({
    title,description,tag, user:req.user.id
  })
  const savednote = await note.save();
res.json(savednote);
    
}  catch(error){
    console.log(error.message);
    res.status(500).send("Some error occured");
     }
    

})


// route3: update a note 
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
 const {title,description,tag} =req.body;
 const newNote={};
 if(title){newNote.title=title};
 if(description){newNote.description=description};
 if(tag){newNote.tag=tag};

// find the note to be update and updated 
let note = await Notes.findById(req.params.id);
if(!note){return res.status(404).send("Not Found")};
if(note.user.toString()!==req.user.id){
  return res.status(401).send("Not Allowed")
}
note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
res.json({note});
})

// route4: delete a note 
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
 
 

// find the note to be update and updated 
let note = await Notes.findById(req.params.id);
if(!note){return res.status(404).send("Not Found")};
if(note.user.toString()!==req.user.id){
  return res.status(401).send("Not Allowed")
}
note = await Notes.findByIdAndDelete(req.params.id);
res.json({"Success:note has been deleted " : note});

})
module.exports= router;