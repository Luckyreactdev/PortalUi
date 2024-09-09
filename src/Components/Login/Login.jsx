// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../Helpers/Api_endpoints/Axios";
import { Login_Url } from "../../Helpers/Endpoints/Endpoints";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Reducers/Authslics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Login.css"; // Custom styles if necessary

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(true); // To toggle password visibility
  const [isLoading, setIsLoading] = useState(false); // To handle loading state
  const [errorMessage, setErrorMessage] = useState(""); // To show errors

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePassword = () => {
    setEye(!eye); // Toggle the state for showing/hiding password
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrorMessage("Please fill in both email and password.");
      return;
    }

    setIsLoading(true); // Start loading spinner
    setErrorMessage(""); // Reset error message

    try {
      const response = await axiosInstance.post(`${Login_Url}`, {
        email: email,
        password: password,
      });
      const { token } = response.data;
      dispatch(login(token));
      navigate("/PortalSetup");
    } catch (error) {
      const errorResponse =
        error.response?.data?.non_field_errors ||
        "Login failed, please try again.";
      setErrorMessage(errorResponse);
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/PortalSetup");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Automatically focus the email input when the page loads
    document.getElementById("email").focus();
  }, []);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="col-lg-4 col-md-6 col-sm-8">
        <div className="card p-4">
          <div className="text-center mb-4">
            <img
              src="https://storage.googleapis.com/varal-habot-vault-marketplace-10032022/images/updated%20trans-Habot-logo-png.png"
              alt="Habot Admin"
              className="img-fluid mb-2"
              style={{ width: "150px" }}
            />
            <h3 className="mb-1">Login</h3>
            <p className="text-muted">Access to Portal dashboard</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                className="form-control"
                placeholder="Enter your email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                className="form-control"
                placeholder="Enter your password"
                type={eye ? "password" : "text"} // Change input type based on eye state
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "70%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={togglePassword} // Toggle password visibility
              >
                <FontAwesomeIcon icon={eye ? faEyeSlash : faEye} />{" "}
                {/* Use Font Awesome Icons */}
              </span>
            </div>
            {errorMessage && (
              <div className="text-danger text-center mb-3">{errorMessage}</div>
            )}
            <div className="text-center mb-3">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}{" "}
                {/* Show loading state */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
