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
import {Input, FormControl, InputLabel, FormHelperText} from "@mui/material";
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

  const formData = {
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
<></>
  )
    // <>
    {/* <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <input placeholder="Placeholder" id="first_name" type="text" class="validate">
          <label for="first_name">First Name</label>
        </div>
        <div class="input-field col s6">
          <input id="last_name" type="text" class="validate">
          <label for="last_name">Last Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input disabled value="I am not editable" id="disabled" type="text" class="validate">
          <label for="disabled">Disabled</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" class="validate">
          <label for="password">Password</label>
        </div>
      </div>
    </form>
    </div>
    </> */}
  
    
{/* 
      <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
      </FormControl>
        <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
      </FormControl>
        <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
      </FormControl> */}

      {/* <Input>
        <TextField
          className="list-group-item"
          type="text"
          label="Username"
          color="secondary"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          focused
        />
      </Input>
      <Input>
        <TextField
          className="list-group-item"
          type="password"
          label="Password"
          color="secondary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          focused
        />
      </Input>
      <Input>
        <TextField
          className="list-group-item"
          type="text"
          label="Zipcode"
          color="secondary"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          focused
        />
      </Input> */}
      {/* <Input>
            <TextField label="Outlined secondary" color="secondary" focused />
        </Input> */}
    
  

  const signupForm = (
    <>
      <Input>
        <TextField
          className="list-group-item"
          label="Username"
          color="secondary"
          value={(e) => {
            e.preventDefault();
            setUsername(e.target.value);
            console.log(formData.username);
          }}
          focused
          required
        />
      </Input>
      <Input>
        <TextField
          className="list-group-item"
          label="Zipcode"
          color="secondary"
          focused
          required
        />
      </Input>
      <Input>
        <TextField
          className="list-group-item"
          label="Password"
          color="secondary"
          focused
          required
        />
      </Input>
      <Input>
        <TextField
          className="list-group-item"
          label="Re-enter Password"
          color="secondary"
          focused
          required
        />
      </Input>
    </>
  );

  return (
    <>
      <div
        className="container text-center"
        style={{
          backgroundColor: 'beige',
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
            <div style={{ color: "white" }}>Please Login Below</div>
          ) : (
            <div style={{ color: "white" }}>Please Signup Below</div>
          )}
          {items.length === 0 && <p>No items found</p>}
          <form
            action="POST"
            className="list-group"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "whitesmoke",
            }}
          >
            {logging ? loginForm : signupForm}
          </form>

          {/* <ul className="list-group">
                {items.map((item, i) => 
                <li 
                key={item} 
                onClick={(e) => console.log(item, i)} 
                className="list-group-item">
                    {item}
                </li>)}
                </ul> */}
          <Link to="/main">
            <Button variant="contained">Submit</Button>
          </Link>
        </Fragment>
      </div>
    </>
  );
}

export default ListGroup;
