const bcrypt = require("bcrypt");
const e = require("express");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

/////////////////////////////////////////// DB CONNECTIONS
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "vivian",
  host: "localhost",
  database: "containment",
  // password: "example",
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

  const { product_code, name, brand, length, depth, height, price } = req.body;
  console.log(req.body);

  pool.query(
    "INSERT INTO containers (product_code, name, brand, length, depth, height, price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [product_code, name, brand, length, depth, height, price],
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
  const { product_code, brand, name, length, depth, height, price } = req.body;
  console.log("req.body here:", req.body);

  pool.query(
    "UPDATE containers SET name = $2, brand = $3, length = $4, depth = $5, height = $6, price = $7 WHERE product_code = $1",
    [product_code, name, brand, length, depth, height, price],
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
  pool.query("SELECT * FROM spaces ORDER BY id ASC", (error, results) => {
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

  pool.query("DELETE FROM spaces WHERE id = $1", [id], (error, results) => {
    if (error) {
      res.json("Something went wrong.");
      console.log(error);
    }
    res.status(200).json(`Container deleted with id: ${id}`);
  });
};

/////////////////////////////////////////// USERS CRUD

// REGISTER
const registerUser = async (req, res) => {
  console.log(`PUT "/user/register" activated`);
  const email = req.body.email;
  const hash = await bcrypt.hash(req.body.password, 12);
  console.log("hash: ", hash);

  pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (error, results) => {
      if (error) {
        res.json("Something went wrong.");
        console.log(error);
      } else if (results.rows.length === 1) {
        res.json(
          "This email account has been registered. Try logging in instead."
        );
      } else {
        // creating new user
        console.log("creating new user");
        console.log("req.body.password:", req.body.password);

        // insert new user into sql db
        pool.query(
          "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
          [email, hash],
          (error, results) => {
            if (error) {
              console.log(error);
              res.json("Something went wrong while creating user.");
            }
            // console.log("user created: ", results);
            res.json({ status: "OK!", message: "user created" });
          }
        );
      }
    }
  );
};

// LOGIN
const logIn = async (req, res) => {
  console.log(`POST "/user/login" activated`);
  const email = req.body.email;

  pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (error, results) => {
      // catch all errors
      if (error) {
        res.json("Something went wrong.");
        console.log(error);
      }
      // user not found
      else if (results.rows.length == 0) {
        res.json("User not found. Pls register while it's free.");
      } else {
        const user = results.rows[0];
        console.log("user - ", user);
        // comparing hashes of entered vs. stored password
        console.log("compare - req.body.password:", req.body.password);
        console.log("compare - user.password:", user.password);

        const comparePassword = async () => {
          const result = await bcrypt.compare(req.body.password, user.password);
          console.log("comparison result - ", result);

          // if wrong password
          if (!result) {
            console.log("error: wrong password entered");
            return res.status(401).json({
              status: "error",
              message: "Login failed, pls remember your password.",
            });
          }

          // if correct password

          // create payload data
          const payload = {
            email: user.email,
            isAdmin: user.isadmin,
          };
          console.log("payload: ", payload);

          //  create access token
          const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
            expiresIn: "20m",
            jwtid: uuidv4(),
          });

          //  create refresh token
          const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
            expiresIn: "30d",
            jwtid: uuidv4(),
          });

          // display tokens
          const response = {
            access,
            refresh,
            message: "logged in successfully",
          };
          res.json(response);
        };
        comparePassword();
      }
    }
  );
};

/////////////////////////////////////////// CALCULATION ALGO
const calcContainers = async (req, res) => {
  console.log(`POST "/calculate activated"`);

  const spaceHeight = req.body.height;
  const spaceDepth = req.body.depth;

  pool.query(
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
  registerUser,
  logIn,
};
