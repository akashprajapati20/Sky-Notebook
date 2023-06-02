import React,{useContext, useEffect,useState,useRef} from 'react'
import noteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem';
import AddNote from "./AddNote";
import {useNavigate} from 'react-router-dom';

function Notes(props) {
  let navigate = useNavigate();
  
    const context= useContext(noteContext);
  const {notes,getNote ,editNote}= context;
  const[note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
  useEffect(()=>{
    if(localStorage.getItem('token')){

      getNote();
    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  },[])
  const onChange =(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
 }
 const handleClick =(id)=>{
  console.log("updating the note",note);
  editNote(note.id ,note.edescription,note.etitle,note.etag)
  refClose.current.click(); 
  props.showAlert("updating the note ","success"); 
  
}
  const updateNote=(currentNote)=>{
     ref.current.click();
     setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag,});

  }
  const ref= useRef(null);
  const refClose= useRef(null);
  return (<>
    Your Notes

    <AddNote/>
    
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" minLength={5} required name="etitle" onChange={onChange} value={note.etitle} aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" onChange={onChange} minLength={5} required value={note.edescription}name="edescription" id="edescription"/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" onChange={onChange} value={note.etag} name="etag" id="etag"/>
  </div>
  
  
</form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose}className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={handleClick} className="btn btn-primary">Update note</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-3">
      <div className="container mx-2">
  {notes.length===0 && "no notes to display"}</div>
  {notes.map((note)=>{
    return <Noteitem  note={note} updateNote={updateNote}/>
  })}
</div>
</>)
}

export default Notes
