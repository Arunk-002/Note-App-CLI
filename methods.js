const fs = require('fs').promises;
// this is a promise version of fs modules so there is no need for callbacks.
const chalk = require('chalk')// used an older version of  chalk@4  since new version uses ESM.

// -----------------crud----------------------
async function addNote(title,body) {
    let notes = await getNotes()
    const newnote= {title,body}    
    if (!noteChecker(title,notes)) {
        notes.push(newnote);
        await fs.writeFile('notes.json',JSON.stringify(notes, null, 2));// Since we are adding the entire array we use writefile instead of 
        //appendfile.
        success('\n note added \n');
        
    }else{
        error('\nNote already exists\n');
    }
}


async function listAllNotes() {
    let notes = await getNotes()
    if (notes.length>0) {
        notes.forEach(element => {
            success(`${element.title} : ${element.body}\n`);
        });
    }else{
        error('\nNo Notes\n');
    }
}

async function removeNote(title) {
    let notes = await getNotes()
    if (noteChecker(title,notes)) {
        let newNotes=notes.filter((element)=>{
            return element.title!=title
        });
        await fs.writeFile('notes.json',JSON.stringify(newNotes, null, 2))
        success(`\n${title} note removed\n`);   
    }else{
       error('\nThis note dont exist\n');
        
    }
}

async function readNote(title) {
    let notes = await getNotes()
    for (const element of notes) {
        if (element.title==title) {
            success(`\n${element.title} : ${element.body}\n`);
            return
        }
    }
    error('\nThis note dont exist\n');
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
                break;// used break instead of return bcz it returns the value prematurly ,so to avoid this break is used.
            }
        }
        await fs.writeFile('notes.json',JSON.stringify(notes,null,2))
       success(`Edited :\n${editedlem.title} : ${editedlem.body}`);
    }else{
        error('note not found');
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

// ------------------------------chalk-functions---------------------------

const error=(message)=>{
    console.log(chalk.red(message))
}
const success=(message)=>{
    console.log(chalk.green(message))
}


module.exports={
    addNote,
    getNotes,
    listAllNotes,
    removeNote,
    readNote,
    editNote
}