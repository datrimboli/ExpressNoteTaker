const router = require('express').Router()
const { join } = require('path')
const fs = require('fs')
const uuid = require('uuid')

// GET all notes
router.get('/notes', (req, res) => {
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
  })
})

// POST one item
router.post('/notes', (req, res) => {

  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }

    let notes = JSON.parse(data)
    let note = {
      title: req.body.title,
      id: uuid.v1(),
      text: req.body.text,

    }
    notes.push(note)

    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }

      res.json(note)
    })
  })
})



// DELETE one item
router.delete('/notes/:id', (req, res) => {

  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }

    let notes = JSON.parse(data)
    notes = notes.filter(item => item.id !== req.params.id)

    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }

      res.sendStatus(200)
    })
  })
})

module.exports = router