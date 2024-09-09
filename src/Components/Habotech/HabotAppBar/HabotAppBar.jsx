import React, { useCallback, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import "./Appbar.css";
import "./ProfileDropdown.css";
import "../../Habotech/Habotech.css";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <i className="fa fa-angle-down iconAngleDown" aria-hidden="true"></i>
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Find Service Tags..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter((child) =>
            child.props.children.toLowerCase().includes(value.toLowerCase())
          )}
        </ul>
      </div>
    );
  }
);

const HabotAppBar = (props) => {
  const [notifications, setNotifications] = useState([]);
  const [userinfo, setUserInfo] = useState(null);
  const [vendorInfo, setVendorInfo] = useState(null);
  const [serviceTag, setServiceTag] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const accessToken = localStorage.getItem("accessToken");

  return (
    <div>
      <span>
        <Link to="/customer-journey">
          <img
            className="habotech-appLogo"
            src="https://storage.googleapis.com/varal-habot-vault-marketplace-10032022/images/updated%20trans-Habot-logo-png.png"
            height="25"
            alt="Logo-Habot"
          />
        </Link>
      </span>
      <div
        className="habotech-appbar-container"
        style={{
          top: scrollPosition > 75 ? "0" : "0",
        }}
      >
        <Navbar collapseOnSelect expand="lg" className="desktopApp">
          <Container className="appContain">
            {/* <Navbar.Brand>
              <NavLink to="/signin" className="signin-link mobile-login">
                Login
              </NavLink>
            </Navbar.Brand> */}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto nav-items tablet-items"></Nav>
              <Nav className=" nav-items">
                <NavLink to="/PortalSetup" className="notification-link">
                  Portal
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="mobileApp">
          <div className="nav">
            <input type="checkbox" id="nav-check" />
            <div className="nav-header">
              <div className="nav-title">
                <Link to="/">
                  <img
                    className="imgMobileNav"
                    src="https://storage.googleapis.com/varal-habot-vault-marketplace-10032022/images/updated%20trans-Habot-logo-png.png"
                    alt="Logo-Habot"
                  />
                </Link>
              </div>
            </div>
            <div className="mid-content">
              {accessToken && (
                <>
                  <ul className="ulAppBar">
                    <li className="liAppBar">
                      <NavLink
                        to="/userChat"
                        className="message-link navLinkMob"
                      >
                        <img
                          src="https://storage.googleapis.com/varal-habot-vault-marketplace-10032022/images/message-icon.svg"
                          alt="Message Icon-Habot"
                        ></img>
                      </NavLink>
                    </li>
                    <li className="liAppBar">
                      <NavLink
                        to="/notification"
                        className="notification-link navLinkMob navLinkMobicon"
                        data-notification-count={
                          notifications.count > 0 ? notifications.count : "0"
                        }
                      >
                        <i className="fa-solid fa-bell notification_icon"></i>
                      </NavLink>
                    </li>

                    <li className="liAppBar"></li>
                  </ul>
                </>
              )}
            </div>
            <div className="nav-btn">
              {!accessToken && (
                <Link to="/signin" className="signText">
                  Login
                </Link>
              )}
              <label htmlFor="nav-check">
                <i className="fa fa-bars fa-lg" aria-hidden="true"></i>
              </label>
            </div>

            <div className="nav-links">
              <NavLink to="/keyword-selection" className="linkText">
                Portal
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabotAppBar;
