import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
 
 const notesInitial = []
const [notes, setNotes] = useState(notesInitial)

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch('http://localhost:8000/api/notes/fetchallnotes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = await response.json() 
    setNotes(json)
  }

//addNote
const addNote = async (title,description,tag) =>{
    //API Call
  const response = await fetch('http://localhost:8000/api/notes/addnote',{
    method:'POST',
    headers:{
      'Content-type':'application/json',
      "auth-token":localStorage.getItem('token')
    },
    body:JSON.stringify({title,description,tag})
  });
  const note = await response.json();
  setNotes(notes.concat(note));
}

//DeleteNote 
const deleteNote = async (id) => {
  // API Call
  const response = await fetch(`http://localhost:8000/api/notes/deletenote/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    },
  });
  const json = response.json(); 
  console.log(json);
  console.log("Deleting the note with id"+ id);
  const newNotes = notes.filter((note) => { return note._id !== id })
  setNotes(newNotes)
}

//EditNote
const editNote = async (id, title, description, tag) => {
  // API Call 
  const response = await fetch(`http://localhost:8000/api/notes/updatenote/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')
    },
    body: JSON.stringify({title, description, tag})
  });
  const json = await response.json(); 

   let newNotes = JSON.parse(JSON.stringify(notes))
  // Logic to edit in client
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if (element._id === id) {
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag; 
      break; 
    }
  }  
  setNotes(newNotes);
}

  return (
    <NoteContext.Provider value={{ notes,setNotes,addNote,editNote,deleteNote,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;
