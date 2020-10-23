import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import "./Login.css";


export const Login = props => {
  const email = useRef();
  const existDialog = useRef();
  const history = useHistory();



  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?email=${email.current.value}`)
      .then(res => res.json())
      .then(user => (user.length ? user[0] : false));
  };

  const handleLogin = (e) => {
    e.preventDefault()

    existingUserCheck()
        .then(exists => {
            if (exists) {
                localStorage.setItem("connectMore_user", exists.id)
                history.push("/")
            } else {
                existDialog.current.showModal()
            }
        })
}
//MATERIAL UI INFO
  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
  }}));

  const classes = useStyles();
  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button className="button--close"
          onClick={e => existDialog.current.close()}>
          Close
        </button>
      </dialog>

          <h1>Connect More</h1>    

      <section>   
        <form className="form--login" className={classes.root} noValidate autoComplete="off" onSubmit={handleLogin}>
          <h2>Please sign in</h2>
            <EmailOutlinedIcon />
            <input 
              ref={email} type="email"
              id="email"
              className="form-control"
              placeholder="Email address" />        
            <button type="submit">Sign in</button>
        </form>
      </section>

      <section className="link--register">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
