/////////////////////////////////////////// DB CONNECTIONS
const Pool = require("pg").Pool;

// connection for table: containers
const pool = new Pool({
  user: "containment_user",
  host: "localhost",
  database: "containment",
  password: "example",
  port: 5432,
});

// connection for table: spaces
const poolSpaces = new Pool({
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

  const { product_code, name, brand, length, depth, height } = req.body;

  pool.query(
    "INSERT INTO containers (product_code, name, brand, length, depth, height) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [product_code, name, brand, length, depth, height],
    (error, results) => {
      if (error) {
        res.json("Something went wrong.");
        console.log(error);
      }
      console.log("this is results: ", results);
      res
        .status(201)
        .send(
          `Container added with product_code: ${results.rows[0].product_code}`
        );
    }
  );
};

// UPDATE CONTAINER
const updateContainer = async (req, res) => {
  console.log(`PATCH "/containers/update" activated`);

  // product_code cannot be redefined/updated
  // product_code not required in body; passed through params
  const { product_code, brand, name, length, depth, height } = req.body;
  console.log("req.body here:", req.body);

  pool.query(
    "UPDATE containers SET name = $2, brand = $3, length = $4, depth = $5, height = $6 WHERE product_code = $1",
    [product_code, name, brand, length, depth, height],
    (error, results) => {
      if (error) {
        res.json("Something went wrong.");
        console.log(error);
      }
      res
        .status(200)
        .json(`Container modified with product_code: ${product_code}`);
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

/////////////////////////////////////////// SPACES CRUD

// GET ALL SPACES;
const getSpaces = async (req, res) => {
  console.log('GET "/spaces/all" activated');
  poolSpaces.query("SELECT * FROM spaces ORDER BY id ASC", (error, results) => {
    if (error) {
      res.json("Something went wrong.");
      console.log(error);
    }
    res.status(200).json(results.rows);
  });
};

// DELETE SPACE
const deleteSpace = async (req, res) => {
  const id = req.params.id;
  console.log(`DELETE "/spaces/delete/${id}" activated`);

  poolSpaces.query(
    "DELETE FROM spaces WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        res.json("Something went wrong.");
        console.log(error);
      }
      res.status(200).json(`Container deleted with id: ${id}`);
    }
  );
};

/////////////////////////////////////////// CALCULATION ALGO
const calcContainers = async (req, res) => {
  console.log(`POST "/calculate activated"`);

  const spaceHeight = req.body.height;
  const spaceDepth = req.body.depth;

  poolSpaces.query(
    `SELECT * FROM containers WHERE height<${spaceHeight} AND depth<${spaceDepth} ORDER BY brand asc`,
    (error, results) => {
      if (error) {
        res.json("Something went wrong.");
        console.log(error);
      } else if (results.rows.length == 0) {
        res.json("No products matched the search.");
      } else {
        res.status(200).json(results.rows);
      }
    }
  );
};

module.exports = {
  getContainers,
  createContainer,
  updateContainer,
  deleteContainer,
  getSpaces,
  deleteSpace,
  calcContainers,
};
