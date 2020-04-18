const fs= require('fs');
var path = require("path");
const notes = require("../../../db/db.json");

console.log(notes);

module.exports= function(app){
// GET /api/notes - Should read the db.json file and return all saved notes as JSON.
app.get("/api/notes", function(req,res){
    return res.json(notes)
})
// POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post("/api/notes", function (req,res) {
    req.body.id= Date.now();
    
    notes.push(req.body);  //object construction spread operator
    
    fs.writeFile(path.join(__dirname, "../../../db/db.json"), JSON.stringify(notes),function(err){
        if(err) return console.log(err);
        console.log(notes);
    });
    
    return res.send("string");
})
// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, 
// you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
app.delete("/api/notes/:id", function (req,res){
    let chosenID =req.params.id;

    const chosenIndex= notes.findIndex(note=> note.id == chosenID);

    notes.splice(chosenIndex,1);
    fs.writeFile(path.join(__dirname, "../../../db/db.json"), JSON.stringify(notes),function(err){
        if(err) return console.log(err);
    });
    return res.send("string");
    
})

}