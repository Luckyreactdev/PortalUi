import React, { useEffect, useState } from "react";
import "./Portalsetup.css";
import { axiosInstance } from "../../../Helpers/Api_endpoints/Axios";
import { Portal_Url } from "../../../Helpers/Endpoints/Endpoints";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Redux/Reducers/Authslics";
const Portalsetup = ({ children }) => {
  const navigate = useNavigate();
  const [portalname, setportalname] = useState("");
  const [assigneename, setassigneename] = useState("");
  const dispatch = useDispatch();
  const handlelogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const token = useSelector((state) => state.auth.token);
  const handleportalaction = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `${Portal_Url}`,
        {
          name: portalname,
          assignee: 1,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="portalparentdiv">
        <h1>Portal Initialisation</h1>
        <form action="" className="formsection">
          <input
            placeholder="Enter portal name"
            class="input-style"
            type="text"
            value={portalname}
            onChange={(e) => setportalname(e.target.value)}
          />
          <button onClick={handleportalaction}> Submit </button>
          <button onClick={handlelogout}>Logout</button>
        </form>
      </div>
    </>
  );
};

export default Portalsetup;
