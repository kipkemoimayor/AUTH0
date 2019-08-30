import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="jumbotron">
            <h2>Mern App</h2>
            </div>
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Cool</b>  login/auth app with the{" "}
              <span style={{ fontFamily: "monospace" }}>MERN</span>
            </h4>
            <p className="flow-text grey-text text-darken-1 animated fadeIn">
              Register if you are new here or login if already have an account!.
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>



    );
  }
}

export default Landing;
