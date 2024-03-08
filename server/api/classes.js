const router = require("express").Router();
const { pool } = require("../db/index");
module.exports = router;

//Get all classes
router.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM classes");
    res.json(rows);
  } catch (err) {
    console.error("Error with all classes: ", err);
    res.status(500).send("Server Error");
  }
});

//Get individual class
router.get("/:class_id", async (req, res, next) => {
  try {
    const { class_id } = req.params;
    const singleClass = await pool.query(
      `SELECT * FROM classes WHERE class_id = ${class_id}`
    );
    res.json(singleClass.rows);
  } catch (err) {
    console.error("Error with individual class", err);
    res.status(500).send("Server Error");
  }
});

//Create class
router.post("/", async (req, res, next) => {
  try {
    const { class_name, professor, room } = req.body;
    const newClass = await pool.query(
      `INSERT INTO classes (class_name, professor, room) VALUES ($1,
$2, $3) RETURNING*`,
      [class_name, professor, room]
    );
    res.status(201).json(newClass.rows[0]);
  } catch (err) {
    console.error("Error creating class", err);
    res.status(500).send("Server Error");
  }
});

//Edit class
router.put("/:class_id", async (req, res, next) => {
  try {
    const { class_id } = req.params;
    const { class_name, professor, room } = req.body;
    const updatedClass = await pool.query(
      `UPDATE classes SET class_name = $2, professor = $3, room = $4
WHERE class_id = $1`,
      [class_id, class_name, professor, room]
    );
    res.status(201).json({
      mesage: `Class ${class_id} successfully updated`,
      data: updatedClass.rows[0],
    });
  } catch (err) {
    console.error("Error updating class: ", err);
    res.status(500).send("Server Error");
  }
});

//Delete class
router.delete("/:class_id", async (req, res, next) => {
  try {
    const { class_id } = req.params;
    await pool.query(`DELETE FROM classes WHERE class_id = ${class_id}`);
    res.json(`Class ${class_id} successfully deleted`);
  } catch (err) {
    console.error("Error deleting class: ", err);
    res.status(500).send("Server Error");
  }
});
