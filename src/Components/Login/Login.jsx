import React, { useEffect, useState } from "react";
import "./Login.css";
import { axiosInstance } from "../../Helpers/Api_endpoints/Axios";
import { Login_Url } from "../../Helpers/Endpoints/Endpoints";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Reducers/Authslics";
import { useSelector } from "react-redux";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      alert("Please fill all the fields");
    } else {
      try {
        const response = await axiosInstance.post(`${Login_Url}`, {
          email: email,
          password: password,
        });
        const { token } = response.data;
        dispatch(login(token));
        alert("Login Successful");
        setTimeout(() => {
          navigate("/PortalSetup");
        }, 2000);
      } catch (error) {
        alert(error.response.data.non_field_errors);
      }
    }
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    console.log(isAuthenticated);

    if (isAuthenticated) {
      navigate("/PortalSetup");
    } else {
      return;
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return;
  }

  return (
    <>
      <div className="loginform">
        <h1>Habot Admin Login</h1>
        <form className="login-form">
          <div className="flex-row">
            <input
              id="username"
              className="lf--input"
              placeholder="email"
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="flex-row">
            <input
              id="password"
              className="lf--input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <input
            className="lf--submit"
            type="submit"
            defaultValue="LOGIN"
            onClick={handlelogin}
          />
        </form>
      </div>
    </>
  );
};

export default Login;
