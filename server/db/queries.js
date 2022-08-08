/////////////////////////////////////////// DB CONNECTION
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "containment_user",
  host: "localhost",
  database: "containment",
  password: "example",
  port: 5432,
});

/////////////////////////////////////////// CONTAINER CRUD

// GET ALL CONTAINERS;
const getContainers = async (req, res) => {
  console.log('GET "/containers/all" activated');
  pool.query(
    "SELECT * FROM containers ORDER BY product_code ASC",
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
  console.log('POST "/containers/create" activated');

  const { product_code, brand, length, width, height } = req.body;

  pool.query(
    "INSERT INTO containers (product_code, brand, length, width, height) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [product_code, brand, length, width, height],
    (error, results) => {
      if (error) {
        res.json("Something went wrong.");
        console.log(error);
      }
      // console.log("this is results: ", results);
      res
        .status(201)
        .send(
          `Container added with model number: ${results.rows[0].product_code}`
        );
    }
  );
};

// UPDATE CONTAINER
const updateContainer = async (req, res) => {
  const product_code = req.params.product_code;

  console.log(`PATCH "/containers/update/${product_code}" activated`);

  // product_code cannot be redefined/updated
  const { brand, length, width, height } = req.body;

  pool.query(
    "UPDATE containers SET brand = $2, length = $3, width = $4, height = $5 WHERE product_code = $1",
    [product_code, brand, length, width, height],
    (error, results) => {
      if (error) {
        res.json("Something went wrong.");
        console.log(error);
      }
      res
        .status(200)
        .send(`Container modified with product_code: ${product_code}`);
    }
  );
};

// DELETE CONTAINER
const deleteContainer = async (req, res) => {
  const product_code = req.params.product_code;
  console.log(`DELETE "/containers/delete/${product_code}" activated`);

  pool.query(
    "DELETE FROM containers WHERE product_code = $1",
    [product_code],
    (error, results) => {
      if (error) {
        res.json("Something went wrong.");
        console.log(error);
      }
      res
        .status(200)
        .json(`Container deleted with product_code: ${product_code}`);
    }
  );
};

module.exports = {
  getContainers,
  createContainer,
  updateContainer,
  deleteContainer,
};
