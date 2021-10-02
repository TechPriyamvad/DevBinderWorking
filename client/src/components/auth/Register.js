import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  console.log(password, password2);
  return (
    <section className="signup">
      <div className="containerSignup">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign up</h2>
            <form
              onSubmit={onSubmit}
              className="register-form"
              id="register-form"
            >
              <div className="signup-form-group">
                <label htmlFor="name">
                  <i className="fas fa-user-circle"></i>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  value={name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="signup-form-group">
                <label htmlFor="email">
                  <i className="fas fa-envelope"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="signup-form-group">
                <label htmlFor="password">
                  <i className="fas fa-lock"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  id="pass"
                  placeholder="Password"
                  value={password}
                  onChange={onChange}
                  autoComplete="off"
                  minLength={6}
                />
              </div>
              <div className="signup-form-group">
                <label htmlFor="password2">
                  <i className="fas fa-lock"></i>
                </label>
                <input
                  type="password"
                  name="password2"
                  id="re-pass"
                  placeholder="Confirm password"
                  value={password2}
                  onChange={onChange}
                  autoComplete="off"
                  minLength={6}
                />
              </div>
              <div className="signup-form-group form-button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  className="form-submit"
                  value="Register"
                />
              </div>
            </form>
          </div>
          <div className="signup-image">
            <figure>
              <img
                src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg"
                alt=""
              />
            </figure>
            <h1 className="signup-image-link">
              Already have an account?{' '}
              <Link to="/login" style={{ textDecoration: 'none' }}>
                SignIn
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
