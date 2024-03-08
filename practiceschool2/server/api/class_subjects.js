const router = require("express").Router();
const { pool } = require("../db/index");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM class_subjects");
    res.json(rows);
  } catch (err) {
    console.error("Error with class subjects: ", err);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { class_id, subject_id } = req.body;
    const classSubject = await pool.query(
      `INSERT INTO class_subjects (class_id, subject_id) VALUES ($1,
$2) RETURNING *`,
      [class_id, subject_id]
    );
    console.log(classSubject);
    res.status(201).json(classSubject.rows[0]);
  } catch (err) {
    console.error("Error associating class with subject", err);
    res.status(500).send("Server Error");
  }
});