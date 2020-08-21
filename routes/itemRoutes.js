
const router = require('express').Router()
const { join } = require('path')
const fs = require('fs')
const uuid = require('uuid')

// GET all notes
// Naming the get route "notes" (listening for request to come in with the name notes from the brower)
router.get('/notes', (req, res) => {
  // Passing in file path to note file (db.json) to see whats in there
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    // console logging if there is an error
    if (err) { console.log(err) }
    // Sending response we get from client or user as json data from a string to an array
    res.json(JSON.parse(data))
  })
})

// POST one item
// Naming post route "notes" and listening for data to be added to the array
router.post('/notes', (req, res) => {
  // Passing in file path to note file (db.json) to see whats in there add to it and overwrite whats there
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    // Creating note variable
    let notes = JSON.parse(data)
    // Giving title, id, text, properties to note object
    let note = {
      title: req.body.title,
      id: uuid.v1(),
      text: req.body.text,

    }
    // Pushing note object to notes array
    notes.push(note)
    // Write file makes it appear in the db json array 
    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }
      // Sending back the note we created as an object not as a sting
      res.json(note)
    })
  })
})



// DELETE one item
// Naming the delete route "notes" listening a delete 
router.delete('/notes/:id', (req, res) => {
  // Passing our delete request to the object array that contains our object input from note
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    // Getting existing array of notes
    let notes = JSON.parse(data)
    // Finding which note we want to delete through filter, grabbing all the notes that dont equal that id
    notes = notes.filter(item => item.id !== req.params.id)
    // Updating our database to show deleted change
    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }
      // Response that allows deletion of note
      res.sendStatus(200)
    })
  })
})
// Exporting the router variable to be accessed by server 
module.exports = router