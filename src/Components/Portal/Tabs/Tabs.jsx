import React from "react";
import { Button, Tab, Nav, Col, Row, Form } from "react-bootstrap";
import "./Container.css";
import Portalsetup from "../Portal-Setup/Portalsetup";
import HabotAppBar from "../../Habotech/HabotAppBar/HabotAppBar";
const NavigationTabs = () => {
  return (
    <>
      <HabotAppBar />
      <Tab.Container id="dashboard-tabs" defaultActiveKey="master-dashboard">
        <Row>
          <Nav variant="pills" className="cmd_tabs">
            <Nav.Item>
              <Nav.Link eventKey="master-dashboard">Portal</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="master-dashboard">
              <Portalsetup />
            </Tab.Pane>
          </Tab.Content>
        </Row>
      </Tab.Container>
    </>
  );
};

export default NavigationTabs;
