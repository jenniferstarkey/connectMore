import React, { useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import "./Login.css";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import LocationCityOutlinedIcon from '@material-ui/icons/LocationCityOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';


export const Register = () => {
  const firstName = useRef();
  const lastName = useRef();
  const zipCode = useRef();
  const email = useRef();
  const conflictDialog = useRef();
  const history = useHistory();
  
//MATERAIL UI INFO
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?email=${email.current.value}`)
      .then(res => res.json())
      .then(user => !!user.length);
  };

  const handleRegister = e => {
    e.preventDefault();

    existingUserCheck().then(userExists => {
      if (!userExists) {
        fetch("http://localhost:8088/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email.current.value,
            firstName: `${firstName.current.value}`,
            lastName: `${lastName.current.value}`,
            zipCode: `${zipCode.current.value}`

          })
        })
          .then(_ => _.json())
          .then(createdUser => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("connectMore_user", createdUser.id);
              history.push("/");
            }
          });
      } else {
        conflictDialog.current.showModal();
      }
    });
  };
  
  const classes = useStyles();
  return (

    <main style={{ textAlign: "left" }}>
      <dialog className="dialog dialog--password" ref={conflictDialog}>
        <div>Account with that email address already exists</div>
        <button
          className="button--close"
          onClick={e => conflictDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      
      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">
          Register
        </h1>

          <div>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <PersonOutlineOutlinedIcon />
            </Grid>
          <Grid item>
          <input htmlFor="firstName" label="What's your first name?"
            ref={firstName}
            type="text"
            name="firstName"
            className="form-control"
            placeholder="first name"
            required
            autoFocus
          /> 
          </Grid>
          </Grid>
          </div>

          <div>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <PersonOutlineOutlinedIcon />
            </Grid>
          <Grid item>
          <input htmlFor="lastName" label="What's your last name?"
            ref={lastName}
            type="text"
            name="lastName"
            className="form-control"
            placeholder="last name"
            required
            autoFocus
          />
          </Grid>
          </Grid></div>
        <div>

        <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <EmailOutlinedIcon />
            </Grid>
          <Grid item>
          <input htmlFor="email" label="What's your email address?"
            ref={email}
            type="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            required
          /></Grid>
          </Grid></div>
          
          <div>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <LocationCityOutlinedIcon />
            </Grid>
          <Grid item>
          <input htmlFor="zipCode" label="What's your zipCode?"
            ref={zipCode}
            type="text"
            name="zipCode"
            className="form-control"
            placeholder="zip code"
            required
            autoFocus
          /></Grid>
          </Grid></div>

          <button type="submit"> Register </button>
          <button type="button" onClick={() => {history.push("/login")}}> Go Back </button>

        
      </form>
    </main>
    
  );
};