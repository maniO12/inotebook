import React from 'react'
import {useContext} from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
  const context = useContext(noteContext);
 const {deleteNote} = context;
   const {note,updateNote} = props;
  return (
           <div className=" col-md-2">
            <div className="card">
        <div className = "card-body">
            <h5 className="card-title ">{note.title}</h5>
            <p className="card-text ">{note.description}</p>
            <div className="btn">
            <button type="button" className="btn btn-primary"onClick={()=>{updateNote(note)}}>Update</button>
<button type="button" className="btn btn-secondary" onClick={()=>{deleteNote(note._id)}}>Delete</button>
        </div>
       </div>
       </div>
       </div>
  
  )
}

export default Noteitem
