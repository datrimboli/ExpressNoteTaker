
const router = require('express').Router()
const { join } = require('path')
// When you make a get request to notes, you're accessing the notes.html files
router.get('/notes', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'notes.html'))
})

// When you make any other requests, you're accessing the index.html files
router.get('/*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'public', 'index.html'))
})

module.exports = router
