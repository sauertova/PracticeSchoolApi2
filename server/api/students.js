const router = require("express").Router();
const { pool } = require("../db/index");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM students");
    console.log("Query Results: ", rows);
    res.json(rows);
  } catch (err) {
    console.error("Error with all students: ", err);
    res.status(500).send("Server Error");
  }
});

router.get("/:student_id", async (req, res, next) => {
  try {
    const { student_id } = req.params;
    const singleStudent = await pool.query(
      `SELECT * FROM students WHERE student_id = ${student_id}`
    );
    res.json(singleStudent.rows);
  } catch (err) {
    console.error("Error with individual student: ", err);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { fname, lname, email, birthdate } = req.body;
    const newStudent = await pool.query(
      `INSERT INTO students (fname, lname, email, birthdate) VALUES
($1, $2, $3, $4) RETURNING *`,
      [fname, lname, email, birthdate]
    );
    console.log(newStudent);
    res.status(201).json(newStudent.rows[0]);
  } catch (err) {
    console.error("Error creating student: ", err);
    res.status(500).send("Server Error");
  }
});

router.put("/:student_id", async (req, res, next) => {
  try {
    const { student_id } = req.params;
    const { fname, lname, email, birthdate } = req.body;
    const updatedStudent = await pool.query(
      `UPDATE students SET fname = $2, lname = $3, email = $4,
birthdate = $5 WHERE student_id = $1`,
      [student_id, fname, lname, email, birthdate]
    );
    res.status(201).json({
      message: `Student ${student_id} successfully updated`,
      data: updatedStudent.rows[0],
    });
  } catch (err) {
    console.error("Error updating student: ", err);
    res.status(500).send("Server Error");
  }
});

router.delete("/:student_id", async (req, res, next) => {
  try {
    const { student_id } = req.params;
    await pool.query(`DELETE FROM students WHERE student_id = ${student_id}`);
    res.json(`Student ${student_id} successfully deleted`);
  } catch (err) {
    console.error("Error deleting student: ", err);
    res.status(500).send("Server Error");
  }
});