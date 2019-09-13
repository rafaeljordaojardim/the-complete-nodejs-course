const fs = require('fs');
const chalk = require('chalk');

const addNote =(title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => note.title === title);
    // const duplicateNotes = notes.filter((note) => {
    //     return note.title === title
    // })
    if (duplicateNotes.length === 0) {
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
    }else{
        console.log("Duplicated notes was found");
        
    }
}

const removeNote = function (note) {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);
    saveNotes();

    if(notes.length > notesToKeep.length){
        console.log(chalk.grenn.inverse('note removed'));
    }else{
        console.log(chalk.red.inverse('no note found'));
        
    }
}
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON);
    } catch (error) {
        return []
    }
}
const listNotes = () => {
    const notes = loadNotes()
    console.log('printing your notes');
    
    notes.forEach(note => {
        console.log(note.title);
        
    });
}
const readNote = (title) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title == title);

    if (!duplicateNote) {
        console.log(note.title);
        console.log(note.body);
    }else{
        console.log('Arquivo não encontrado');
    }
}
//in es6 we can declare the objects attributte
module.exports = {
    addNote, 
    removeNote,
    listNotes,
    readNote
}