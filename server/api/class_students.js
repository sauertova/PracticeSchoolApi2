const router = require("express").Router();
const { pool } = require("../db/index");
module.exports = router;

//Get all class_students
router.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM class_students");
    res.json(rows);
  } catch (err) {
    console.error(`Error with class students: `, err);
    res.status(500).send("Server Error");
  }
});

//Get all students in a particular class
router.get("/:class_id", async (req, res, next) => {
  try {
    const { class_id } = req.params;
    const classStudents = await pool.query(
      `SELECT * FROM class_students WHERE class_id = ${class_id}`
    );
    res.json(classStudents.rows);
  } catch (err) {
    console.error(`Error getting students in particular class: `, err);
    res.status(500).send("Server Error");
  }
});

//Place students in a class
router.post("/", async (req, res, next) => {
  try {
    const { class_id, student_id } = req.body;
    const studentClass = await pool.query(
      `INSERT INTO class_students (class_id, student_id) VALUES ($1, $2)`,
      [class_id, student_id]
    );
    console.log(studentClass);
    res.status(201).json(studentClass.rows[0]);
  } catch (err) {
    console.error("Error placing student in a class: ", err);
    res.status(500).send("Server Error");
  }
});

//Remove student from a class
router.delete("/:student_id", async (req, res, next) => {
  try {
    const { student_id } = req.params;
    await pool.query(
      `DELETE FROM class_students WHERE student_id = ${student_id}`
    );
    res.json(`Student ${student_id} successfully removed from class`);
  } catch (err) {
    console.error("Error removing student from class: ", err);
    res.status(500).send("Server Error");
  }
});
