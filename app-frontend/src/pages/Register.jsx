import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "", confirmPassword: "", username: "", terms: false, showPassword: false });

  const [registrationSuccessMessage, setRegistrationSuccessMessage] = useState("");

  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const generateSuccess = (message) =>
    toast.success(message, {
      position: "bottom-right",
    });
  const notify = () => toast("Registration complete! Wow so easy!");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (values.password !== values.confirmPassword) {
      generateError("Passwords do not match");
      return;
    }
    if (!values.terms) {
      generateError("You must agree to the terms and conditions");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password, username } = data.errors;
          if (email) generateError(email);
          else if (username) generateError(username);
          else if (password) generateError(password);
        } else {

          setTimeout(() => navigate("/"), 1000);;
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <div className="container">
      <h2>Register Account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type={values.showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type={values.showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              id="showPassword"
              name="showPassword"
              onChange={handleShowPassword}
            />{" "}
            Show Password
          </label>

        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="terms"
              onChange={(e) =>
                setValues({ ...values, terms: e.target.checked })
              }
            /> {" "}
            I agree to the terms and conditions
          </label>
        </div>
        <button type="submit" onClick={notify}>Submit</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      {registrationSuccessMessage && (
        <p className="success-message">{registrationSuccessMessage}</p>
      )}

      <ToastContainer />
    </div>
  );
}

export default Register;
