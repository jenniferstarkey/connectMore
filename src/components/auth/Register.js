import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

export const Register = props => {
  const firstName = useRef();
  const lastName = useRef();
  const zipCode = useRef();
  const email = useRef();
  const conflictDialog = useRef();
  const history = useHistory();

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
          <label htmlFor="firstName">What's your first name? </label>
          <input
            ref={firstName}
            type="text"
            name="firstName"
            className="form-control"
            placeholder="first name"
            required
            autoFocus
          /></div>
          <div>
          <label htmlFor="lastName">What's your last name? </label>
          <input
            ref={lastName}
            type="text"
            name="lastName"
            className="form-control"
            placeholder="last name"
            required
            autoFocus
          /></div>
        <div>
          <label htmlFor="inputEmail">Email Address </label>
          <input
            ref={email}
            type="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            required
          /></div>
          <div>
          <label htmlFor="zipCode">What's your zip code? </label>
          <input
            ref={zipCode}
            type="text"
            name="zipCode"
            className="form-control"
            placeholder="zip code"
            required
            autoFocus
          /></div>
          <button type="submit"> Sign in </button>
          <button type="button" link to=""> Go Back </button>

        
      </form>
    </main>
    
  );
};