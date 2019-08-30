import React, { Component } from "react";
import { BrowserRouter as Router, Link,withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {registerUser} from "../../actions/authActions";
import classnames from 'classnames'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  //life cycle
  componentDidMount(){
    if(this.props.auth.isAuthenticated){this.props.history.push("/dashboard");}
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.errors){
      this.setState({
        errors:nextProps.errors
      })
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser,this.props.history)

    //sanity check
    console.log(newUser);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <Link to="/" className=" btn btn-dark waves-effect">
              <i className="material-icons left"></i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>

            <form noValidate onSubmit={this.onSubmit} className='form-group'>
              <div className="form-group">
                <input
                  className={classnames("form-control",{invalid:errors.name})}
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                />
                <label htmlFor="name">Name</label>
                <span className="alert alert-danger">{errors.name}</span>
              </div>
              <div className="form-group">
                <input
                  className={classnames("form-control",{invalid:errors.email})}
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
                <span className="alert alert-danger">{errors.email}</span>
              </div>
              <div className="form-group">
                <input
                  className={classnames("form-control",{invalid:errors.password})}
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
                <span className="alert alert-danger">{errors.password}</span>
              </div>
              <div className="form-group">
                <input
                  className={classnames("form-control",{invalid:errors.password2})}
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"

                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="alert alert-danger">{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
}

Register.propTypes= {
  registerUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
};
const  mapStateToProps=state=>({
  auth:state.auth,
  errors:state.errors
});


export default connect(
  mapStateToProps,
  {registerUser},

)(withRouter(Register));
