const Pool = require("pg").Pool;
const pool = new Pool({
  user: "containment_user",
  host: "localhost",
  database: "containment",
  password: "example",
  port: 5432,
});

// get all containers
const getContainers = async (request, response) => {
  pool.query(
    "SELECT * FROM containers ORDER BY model_num ASC",
    (error, results) => {
      if (error) {
        response.json("Something went wrong.");
        console.log(error);
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getContainers,
};
