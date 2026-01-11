import { Fragment, useState } from "react";
let items = ["New York", "San Francisco", "Tokyo", "London", "Berlin"];
import { Link } from "react-router-dom";
import axios from "axios";
import background from "../assets/earthquake-gif-2.gif";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Button from "@mui/material/Button";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Input, FormControl, InputLabel, FormHelperText } from "@mui/material";
import TextField from "@mui/material/TextField";
import "bootstrap/dist/css/bootstrap.min.css";

const getMessage = () => {
  return items.length === 0 ? <p>No items found</p> : null;
};

function ListGroup() {
  const [logging, setLogging] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [zipcode, setZipcode] = useState("");

  const formData = new FormData();

  const form_info = {
    username: username,
    password: password,
    zipcode: zipcode,
  };

  const sendUserInfo = async (action) => {
    let req = req.body;
    //
    let request = await axios
      .post(`/${action}`, {
        username: formData.username,
        password: formData.password,
        zipcode: formData.zipcode,
      })
      .then((res) => {});
  };

  const loginForm = (
    <>
      <form>
        <div>
          <label for="username">Username:</label>
          <Input name="username" required>
            {" "}
          </Input>
        </div>
        <div>
          <label for="password">Password:</label>
          <Input name="password" type="password" required>
            {" "}
          </Input>
        </div>

        {/* <Input>Zipcode</Input> */}
        {/* <Input>Password</Input>
        <Input>Re-enter Password</Input> */}
      </form>
    </>
  );

  const signupForm = (
    <>
      <form>
        <div>
          <label for="username">Username:</label>
          <Input name="username" required>
            {" "}
          </Input>
        </div>
        <div>
          <label for="password">Password:</label>
          <Input name="password" type="password" required>
            {" "}
          </Input>
        </div>
        <div>
          <label for="retype">Retype Password:</label>
          <Input name="retype" type="password" required></Input>
        </div>

        {/* <label for="username">Username:</label> 
        <Input name="username"required></Input>
        <label for="zipcode">Zipcode:</label> 
        <Input name="zipcode"type="text"required></Input>
        <label for="password">Password:</label>
        <Input name="password" type="password" required></Input>
        <label for="password">Re-Enter Password:</label> 
        <Input name="password" type="password" required></Input> */}
      </form>
    </>
  );

  return (
    <>
      <div
        className="container text-center"
        style={{
          backgroundColor: "beige",
          backgroundSize: "cover",
        }}
      >
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            setLogging(true);
            console.log("logging in...");
          }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            setLogging(false);
            console.log("signing up...");
          }}
        >
          Signup
        </Button>
        <Fragment>
          <h1 style={{ color: "black" }}> Earthquake Tracker</h1>
          {logging ? (
            <div style={{ color: "black" }}>Please Login Below</div>
          ) : (
            <div style={{ color: "black" }}>Please Signup Below</div>
          )}
          {items.length === 0 && <p>No items found</p>}

          {logging ? loginForm : signupForm}

          {/* <ul className="list-group">
                {items.map((item, i) => 
                <li 
                key={item} 
                onClick={(e) => console.log(item, i)} 
                className="list-group-item">
                    {item}
                </li>)}
                </ul> */}
          <div></div>
          <Link to="/main">
            <Button variant="contained" onClick={(e) => {}}>
              Submit
            </Button>
          </Link>
        </Fragment>
      </div>
    </>
  );
}

export default ListGroup;
