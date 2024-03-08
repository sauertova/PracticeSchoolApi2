const router = require("express").Router();
const { pool } = require("../db/index");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT professor FROM classes");
    res.json(rows);
  } catch (err) {
    console.error("Error with all professors: ", err);
    res.status(500).send("Server Error");
  }
});

router.get("/:professor", async (req, res, next) => {
  try {
    const { professor } = req.params;
    const professorClasses = await pool.query(
      `SELECT * FROM classes WHERE professor = ${professor}`
    );
    res.json(professorClasses.rows);
  } catch (err) {
    console.error("Error getting professor's classes: ", err);
    res.status(500).send("Server Error");
  }
});
