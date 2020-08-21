// Bringing in router for express
const router = require('express').Router()
// api routes will use. /itemRoutes
router.use('/api', require('./itemRoutes.js'))
// Anything else will use ./viewRoutes
router.use('/', require('./viewRoutes.js'))
// Exporting router variable
module.exports = router
