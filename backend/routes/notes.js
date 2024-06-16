import { Router } from 'express';
import fetchuser from '../middleware.js/fetchUser.js';
import Note from  '../models/Note.js';
import { body, validationResult } from 'express-validator';
const router = Router();

 //GET All notes "/api/notes/fetchallnotes" login required;

   router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try{
      const notes =  await Note.find({user:req.user.id});
      res.json(notes);
    }
    catch(error){
        console.error('Error creating user:', error); 
        res.status(500).send('Some error occurred');
    }
   });

   //POST "api/notes/addnote" login required;

   router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('description','Enter a description of minimum 4 words.').isLength({min:3}),
   ], async(req,res)=>{
                  
    try{
          const{title,description,tag} = req.body;

          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          const note = new Note ({
             title,description,tag,
             user:req.user.id
          });
          const savedNote = await note.save();
          res.json(savedNote);
    }
    catch(error){
        console.error('Error creating user:', error); 
        res.status(500).send('Some error occurred');
    }
   });

   export default router;

  
// Update an existing note using PUT "/api/notes/updatenote". Login required

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
     
  try{
        const{title,description,tag} = req.body;
        const newNote = {};

        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag}; 

    let note = await Note.findById(req.params.id);
    if(!note) {
           return res.status(404).send({error:"Please enter the valid credentials"});
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
  }
  note = await Note.findByIdAndUpdate(req.params.id,{ $set: newNote }, { new: true });
  res.json({note});
  }
  catch(error){
    console.error('Error creating user:', error); 
    res.status(500).send("Some error occurred");
  }
})

// DeleteNote   DELETE "/api/notes/deletenote". Login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
      
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }

      note = await Note.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})
