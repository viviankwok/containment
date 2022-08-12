import React, { useState, useContext } from "react";
import { InputAdornment, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import ReactContext from "../components/context/react.context";

const SignIn = () => {
  const reactCtx = useContext(ReactContext);

  // monitor input changes
  const handleChange = (prop) => (event) => {
    reactCtx.setValues({ ...reactCtx.values, [prop]: event.target.value });
  };

  // manage password visibiity
  const handleClickShowPassword = () => {
    reactCtx.setValues({
      ...reactCtx.values,
      showPassword: !reactCtx.values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // USER LOGIN
  const handleLogIn = async (e) => {
    e.preventDefault();
    console.log("logged in btn clicked");

    // endpoint URL
    const url = "http://localhost:5001/user/login";
    // fetch config
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authorization: "Bearer" + accessToken,
      },
      body: JSON.stringify({
        email: reactCtx.values.email,
        password: reactCtx.values.password,
      }),
    };

    // fetch

    const res = await fetch(url, config);
    const data = await res.json();
    console.log("data fetched from BE: ", data);

    if (data.message === "logged in successfully") {
      reactCtx.setAuth(true);
    } else if (data.status === "error") {
      console.log(data);
    } else {
      console.log("Something may have went wrong.");
    }

    reactCtx.setValues({ ...reactCtx.values, password: "" });
  };

  // REGISTER USER
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("register btn clicked");

    // endpoint URL
    const url = "http://localhost:5001/user/register";
    // fetch config
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // authorization: "Bearer" + accessToken,
      },
      body: JSON.stringify({
        email: reactCtx.values.email,
        password: reactCtx.values.password,
      }),
    };

    // fetch
    try {
      const res = await fetch(url, config);
      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      console.log("data fetched from BE: ", data);
    } catch (error) {
      console.log(error);
    }
    // reset form
    reactCtx.setValues({ ...reactCtx.values, email: "", password: "" });
  };

  return (
    <div id="sign-in" className="py-36">
      <div className="grid place-content-center w-full">
        <span className="font-black text-6xl">sign in.</span>
        {/* values state here: {JSON.stringify(reactCtx.values)} */}
        <form>
          <FormControl sx={{ mb: 0, ml: 3, width: "25ch" }} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Email</InputLabel>
            <FilledInput
              label="email"
              id="outlined-start-adornment"
              onChange={handleChange("email")}
              value={reactCtx.values.email}
            />
          </FormControl>
          <br />
          <FormControl sx={{ m: 1, ml: 3, width: "25ch" }} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">
              Password
            </InputLabel>
            <FilledInput
              id="filled-adornment-password"
              label="password"
              type={reactCtx.values.showPassword ? "text" : "password"}
              value={reactCtx.values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {reactCtx.values.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <br />
          <Button
            variant="contained"
            color="secondary"
            sx={{ m: 1, ml: 3 }}
            onClick={handleLogIn}
          >
            Log In
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={{ m: 1, ml: 1 }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </form>
        <br />
      </div>
    </div>
  );
};

export default SignIn;
