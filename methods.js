const { title } = require('process');
const fs = require('fs').promises;// this is a promise version of fs modules so there is no need for callbacks.
// const http = require('http');

// -----------------crud----------------------
async function addNote(title,body) {
    let notes = await getNotes()
    const newnote= {title,body}    
    if (!noteChecker(title,notes)) {
        notes.push(newnote);
        await fs.writeFile('notes.json',JSON.stringify(notes, null, 2));// Since we are adding the entire array we use writefile instead of 
        //appendfile.
        console.log('\n note added \n');
        
    }else{
        console.log('\nNote already exists\n');
    }
}


async function listAllNotes() {
    let notes = await getNotes()
    if (notes.length>0) {
        notes.forEach(element => {
            console.log(element);
        });
    }else{
        console.log('\nNo Notes\n');
    }
}

async function removeNote(title) {
    let notes = await getNotes()
    if (noteChecker(title,notes)) {
        let newNotes=notes.filter((element)=>{
            return element.title!=title
        });
        await fs.writeFile('notes.json',JSON.stringify(newNotes, null, 2))
        console.log(`\n${title} note removed\n`);   
    }else{
        console.log('\nThis note dont exist\n');
        
    }
}

async function readNote(title) {
    let notes = await getNotes()
    for (const element of notes) {
        if (element.title==title) {
            console.log('\n',element,'\n');
            return
        }
    }
    console.log('\nThis note dont exist\n');
    return 
}

async function editNote(title,body) {
    let notes = await getNotes()
    let editedlem
    if (noteChecker(title,notes)) {
        for (const element of notes) {
            if (element.title===title) {
                element.body=body;
                editedlem=element;  
                break;
            }
        }
        await fs.writeFile('notes.json',JSON.stringify(notes,null,2))
        console.log('Edited :\n',editedlem);
    }else{
        console.log('note not found');
    }    
}


// --------------------------------------------------------------------------

async function getNotes(){
    try {
        const notes = await fs.readFile('./notes.json','utf-8')
        return JSON.parse(notes)
    } catch (error) {
        return []
    }
}
function noteChecker(title,notes) {    
    for (const element of notes) {
        if (element.title==title) {
            return title
        }
    }
    return false   
}

module.exports={
    addNote,
    getNotes,
    listAllNotes,
    removeNote,
    readNote,
    editNote
}