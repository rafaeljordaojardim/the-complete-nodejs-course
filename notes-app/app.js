const validator = require('validator');//when you import from node_modules, it doesnt have relative path, its just the name
const yargs = require('yargs');
const notes = require('./notes.js');
// console.log(notes);


// const command = process.argv[2];
yargs.version('1.1.0');
// console.log(yargs.argv);


// crate add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption:true,
            type:'string' // coloca o tipo, sem ele fica boolean
        }, 
        body:{
            describe:'Note body',
            demandOption:true,
            type:'string'
        }
    },
    handler() {
        console.log("nu");
       notes.addNote(argv.title, argv.body);
    //    console.log( notes.addNote(argv.title, argv.body));
    }
});

yargs.command({
    command:'read',
    describe: 'Read a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})


//crate remove command

yargs.command({
    command:'remove',
    describe: 'Remove a note',
    handler() {
        console.log('Removing the note');
        
    }
})

//create list command
//create list command
yargs.command({
    command:'read',
    describe: 'Read a notes',
    handler()  {
        console.log('Reading  out all note');
    }
})
// console.log(yargs.argv);

// // if (command === 'add') {
// //     console.log('adding');
// // }else if(command === 'remove') {
// //     console.log('Removing note!');
// // }
