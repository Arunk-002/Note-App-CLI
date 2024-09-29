const yargs = require('yargs')
const noteFunc  = require('./methods.js')

yargs.command({
    command:'add',
    describe :'adds a note',
    builder:{
        title:{
            describe:'title of the note',
            demandOption: true,
            type: 'String'
        },
        body:{
            describe:'body of the note',
            demandOption: true,
            type:'String'
        }
    },
    handler(argv){
        noteFunc.addNote(argv.title,argv.body)
    }
})

yargs.command({
    command:'list',
    describe:'List all available notes',
    handler(){
        noteFunc.listAllNotes()
    }
})

yargs.command({
    command:'remove',
    describe:'Removes the specified title',
    builder:{
        title:{
            describe:'title to be deleted',
            demandOption:true,
            type:'String'
        }
    },
    handler(argv){
        noteFunc.removeNote(argv.title)
    }
})

yargs.command({
    command:'read',
    describe:'Reads a specified title',
    builder:{
        title:{
            describe:'title to be fetched',
            demandOption:true,
            type:'String'
        }
    },
    handler(argv){
        noteFunc.readNote(argv.title)
    }
})
yargs.parse()
