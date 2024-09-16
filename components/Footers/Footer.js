import React from "react";
import { useState, useContext } from "react";
import { UpOutlined } from '@ant-design/icons';
import {
  Row,
  Col
} from "antd";

function Footer() {

  const [showIframe, setShowIframe] = useState(false);
  const toggleIframe = () => {
    setShowIframe(!showIframe);
  };

  return (
    <>
      <footer className="relative bg-blueGray-200">
        <Row className="just" justify="end">
          <Col>
            <button
              className="custom-button"
              style={{
                position: "fixed",  // Make the button fixed
                bottom: "0px",  // Place it at the bottom
                right: "0px",  // Align it to the right
                backgroundColor: "rgb(244, 102, 74)",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                zIndex: 1000,  // Ensure it stays on top
              }}
              onClick={toggleIframe}
            >
              Chat with VerdeOS Sage <UpOutlined style={{fontSize:"15px"}} />
            </button>
          </Col>
        </Row>
        {showIframe &&
          <div style={iframeContainerStyle}>
            <button
              onClick={toggleIframe}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 1001,
                backgroundColor: "rgb(244, 102, 74)",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
            <iframe
              src={`https://www.appified.ai/embed/asst_aXkbi6GIHnuPoeWfO72DYfG9?authToken=${localStorage.getItem('jwtToken')}`}
              style={{ border: "0px #ffffff none", borderRadius: "10px" }}
              name="myiFrame"
              scrolling="no"
              frameBorder="1"
              marginHeight="0px"
              marginWidth="0px"
              height="600px"
              width="500px"
              allowFullScreen
            ></iframe>
          </div>
        })
      </footer>
    </>
  );
}

const iframeContainerStyle = {
  position: "fixed",
  bottom: -6,
  right: 0,
  zIndex: 1000,
  margin: "0px",
};

export default Footer;