const router = require('express').Router();
const {pool} = require('../db/index')
module.exports = router;

//Route
router.get('/', async (req,res,next) =>{
    try{
        const { rows } = await pool.query(`SELECT * FROM students`);
        console.log('Query Result: ', rows)
        res.json(allStudents);
    } catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
});

//Get single student localhost:1338/api/students/id
router.get('/:id', async (req,res,next) => {
    try {
        const {id} = req.params; //const id  = req.params.id
        const singleStudent = await pool.query(`SELECT * FROM students WHERE id = ${id}`);
        res.json(singleStudent.rows)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error with single student')
    }
});