const router = require('express').Router();
module.exports = router;

//Route: localhost:1338/api/students

//Route: Get all students

router.use('/students', require('./students'));

router.use((req, res, next) => {
    const error = new Error ('Not Found');
    error.status = 404;
    next(error);
});