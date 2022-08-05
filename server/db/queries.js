/////////////////////////////////////////// DB CONNECTION
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "containment_user",
  host: "localhost",
  database: "containment",
  password: "example",
  port: 5432,
});

/////////////////////////////////////////// CONTAINERS

// GET ALL CONTAINERS
const getContainers = async (req, res) => {
  pool.query(
    "SELECT * FROM containers ORDER BY model_num ASC",
    (error, results) => {
      if (error) {
        res.json("Something went wrong.");
        console.log(error);
      }
      res.status(200).json(results.rows);
    }
  );
};

// CREATE CONTAINER
const createContainer = async (req, res) => {
  const { model_num, brand, length, width, height } = req.body;

  pool.query(
    "INSERT INTO containers (model_num, brand, length, width, height) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [model_num, brand, length, width, height],
    (error, results) => {
      if (error) {
        res.json("Something went wrong.");
        console.log(error);
      }
      // console.log("this is results: ", results);
      res
        .status(201)
        .send(
          `Container added with model number: ${results.rows[0].model_num}`
        );
    }
  );
};

// UPDATE CONTAINER
const updateContainer = async (req, res) => {
  const model_num = req.params.model_num;
  // model_num cannot be redefined/updated
  const { brand, length, width, height } = req.body;

  pool.query(
    "UPDATE containers SET brand = $2, length = $3, width = $4, height = $5 WHERE model_num = $1",
    [model_num, brand, length, width, height],
    (error, results) => {
      if (error) {
        res.json("Something went wrong.");
        console.log(error);
      }
      res.status(200).send(`Container modified with model_num: ${model_num}`);
    }
  );
};

// DELETE CONTAINER
const deleteContainer = async (req, res) => {
  const model_num = req.params.model_num;

  pool.query(
    "DELETE FROM containers WHERE model_num = $1",
    [model_num],
    (error, results) => {
      if (error) {
        res.json("Something went wrong.");
        console.log(error);
      }
      res.status(200).send(`Container deleted with model_num: ${model_num}`);
    }
  );
};

module.exports = {
  getContainers,
  createContainer,
  updateContainer,
  deleteContainer,
};
