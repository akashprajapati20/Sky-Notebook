import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState=(props)=>{
  const host ="http://127.0.0.1:5000"
    const notesInitial=[]
      const [notes,setNotes]= useState(notesInitial)


//get all  note
const getNote=async()=>{

  //api calls

  const response = await fetch(`${host}/api/notes/getallnotes`, {
   method: "GET", 
   headers: {
     "Content-Type": "application/json",
     "auth-token":localStorage.getItem('token')
     
   }  // body data type must match "Content-Type" header
 });
const json= await response.json();
console.log(json);
setNotes(json)


}





//Add a note
const addNote=async(title,description,tag)=>{

   //api calls
 
   const response = await fetch(`${host}/api/notes/addnewnote`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
      
    } , body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
  });
  const note= await response.json();
  setNotes(notes.concat(note))
  
}

//delete a note
const deleteNote=async(id)=>{
  //api calls
 
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
      
    }  // body data type must match "Content-Type" header
  });
  const json=response.json();
  console.log(json)


  console.log("delete note with id"+id)
  const newNote=notes.filter((note)=>{return note._id!==id})
    setNotes(newNote)
    props.showAlert("note deleted succesfully ","success");
}

//edit a note
const editNote=async(id,title,description,tag)=>{
  //api calls
 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
        
      } , body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
   const json= await  response.json(); // parses JSON response into native JavaScript objects
   console.log(json);
  //code to edit
  let newNotes= JSON.parse(JSON.stringify(notes))
for(let index=0;index<notes.length;index++){
const element = newNotes[index]
if(element._id===id){
  newNotes[index].title=title;
  newNotes[index].description=description;
  newNotes[index].tag=tag;
  break;
}
setNotes(newNotes);
}
}



    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNote}}>
            {props.children}
        </NoteContext.Provider>

    )
    }

export default NoteState ;