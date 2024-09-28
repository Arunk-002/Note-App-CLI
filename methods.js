const fs = require('fs');

function addNote(title,body) {
    const notes= {title,body}
    fs.appendFile('notes.json',JSON.stringify(notes, null, 2),(err)=>{
        console.log('note added');
    });
}



module.exports={
    addNote,
}