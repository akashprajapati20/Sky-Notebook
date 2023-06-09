import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/NoteContext'

const AddNote = () => {
  const context= useContext(noteContext);
  const {addNote}= context;
  const[note,setNote]=useState({title:"",description:"",tag:""})
  const handleClick =(e)=>{
     e.preventDefault();
     addNote(note.title,note.description,note.tag);
     setNote({title:"",description:"",tag:""})
  }
  const onChange =(e)=>{
     setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <>
  

    <div className="container my-3">
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" minLength={5} required value={note.title} name="title" onChange={onChange} aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" onChange={onChange} minLength={5} value={note.description}  required name="description" id="description"/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" onChange={onChange}value={note.tag}  name="tag" id="tag"/>
  </div>
  
  <button type="submit" disabled={note.title.length<5 ||note.description.length<5 } className="btn btn-primary" onClick={handleClick}>Submit</button>
</form>
</div>

    </>
  )
}

export default AddNote

