const fs = require("fs/promises")
const path = require("path")
const chalk = require("chalk")

const notesPath = path.join(__dirname, "db.json")

async function addNote(title) {
    const notes = await getNotes()

    const note = {
        title,
        id: Date.now().toString(),
    }

    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function removeNote(id) {
    const notes = await getNotes()
    const newNotesList = notes.filter((note) => {
        return note.id !== id
    })
    await fs.writeFile(notesPath, JSON.stringify(newNotesList))
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" })
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.bgBlue("List of notes"))
    notes.forEach((note) => {
        console.log(chalk.green(note.id), chalk.blue(note.title))
    })
}

module.exports = {
    addNote,
    removeNote,
    printNotes,
}
