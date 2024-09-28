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
yargs.parse()
