import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
const AddNote = () => {
    const context = useContext( noteContext);
    const {addNote} = context;

    const[note,setNote] = useState({title:"",description:"",tag:""});


const handleClick = (e) =>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""});

}

const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
}

  return (
    <div className="containery my-3">
    <h2 className="text-center text-light ">Add a Note</h2>
    <form className="my-3">
        <div className="mb-3">
            <label htmlFor="title " className="form-label text-light">Title</label>
            <input type="text" className="size form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required /> 
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label text-light">Description</label>
            <input type="text" className="size form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
            <label htmlFor="tag" className="form-label text-light">Tag</label>
            <input type="text" className="size form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
        </div>
       
        <button  disabled={note.title.length<3 } type="submit" className="btn btn-primary " onClick={handleClick}>Add Note</button>
    </form>
</div>


  )
}

export default AddNote
