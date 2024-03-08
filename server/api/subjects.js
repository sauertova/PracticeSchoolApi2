const router = require("express").Router();
const { pool } = require("../db/index");
module.exports = router;

//Get all subjects
router.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM subjects");
    res.json(rows);
  } catch (err) {
    console.error("Error with all subjects: ", err);
    res.status(500).send("Server Error");
  }
});

//Get individual subject
router.get("/:subject_id", async (req, res, next) => {
  try {
    const { subject_id } = req.params;
    const singleSubject = await pool.query(
      `SELECT * FROM subjects WHERE subject_id = ${subject_id}`
    );
    res.json(singleSubject.rows);
  } catch (err) {
    console.error("Error with individual subject: ", err);
    res.status(500).send("Server Error");
  }
});

//Create subject
router.post("/", async (req, res, next) => {
  try {
    const { subject_name } = req.body;
    const newSubject = await pool.query(
      `INSERT INTO subjects (subject_name) VALUES ($1)`,
      [subject_name]
    );
    res.status(201).json(newSubject.rows[0]);
  } catch (err) {
    console.error("Error creating subject: ", err);
    res.status(500).send("Server Error");
  }
});

//Delete subject
router.delete("/:subject_id", async (req, res, next) => {
  try {
    const { subject_id } = req.params;
    await pool.query(`DELETE FROM subjects WHERE subject_id = ${subject_id}`);
    res.json(`Subject ${subject_id} successfully deleted`);
  } catch (err) {
    console.error("Error deleting subject: ", err);
    res.status(500).send("Server Error");
  }
});
