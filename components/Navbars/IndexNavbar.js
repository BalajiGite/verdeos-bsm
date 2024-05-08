import React from "react";
import Link from "next/link";
import "antd/dist/antd.css";
import { } from "@ant-design/icons";
import {
  Row,
  Col,
  Popover,
  ConfigProvider,
} from "antd";
// components
import { useState, useEffect } from "react";
import { MenuSelectionContext } from "../../components/PageChange/MenuSelectionContext";
import { getApiDataFromAws } from "../../api/dashboardDataService";
import { Collapse, } from "antd"
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Navbar(props) {
  const router = useRouter();
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [selectedDataSet, setSelectedDataSet] = useState(null);
  const [dateSet, setDateSet] = useState(null);
  const [activeKey, setActiveKey] = useState('0'); // State to manage the active key of the collapse
  const { Panel } = Collapse;

  const fetchDataInitial = async () => {
  };

  useEffect(() => {
    fetchDataInitial();
  }, []);

  const handleLogout = () => {
    Cookies.remove("auth");
    router.push("/");
  };

  // works when >= 5.6.0, recommended ✅
  const onChange = (keys) => {
    setActiveKey(keys[0]); // Update the active key when the collapse state changes
  };
  const people = [
    {
      name: 'Nicholas Lianos',
      role: 'Executive Chairman',
      imageUrl: 'img/nick.jfif',
    },
    {
      name: 'Rob Aldrich',
      role: 'CEO VerdeOS',
      imageUrl: 'img/rob.jpeg',
    }, {
      name: 'Con Tsalikis',
      role: 'Chief Technology Officer',
      imageUrl: 'img/cont.jpeg',
    },
    {
      name: 'Pouya Ghadami',
      role: 'National Analytics Manager',
      imageUrl: 'img/pouya.jfif',
    },
    {
      name: 'Keshav Agrawal',
      role: 'Lead Software Engineer',
      imageUrl: 'img/kes.jpeg',
    },
    {
      name: 'Balaji Gite',
      role: 'Lead Software Engineer',
      imageUrl: 'img/bala.jpeg',
    }];

  const text = (
    <ul role="list" className=" divide-y divide-[#8E8E8E] ">
      {people.map((people) => (
        <li key ={people.name} className="flex justify-between gap-x-2 p-1">
          <div className="flex min-w-0 gap-x-2 items-center">
            <img className="h-10 w-10 object-contain flex-none rounded-full bg-gray-50" src={people.imageUrl} alt="img-1" />
            <div className="min-w-0 flex-auto">
              <p className="text-xs font-semibold text-[#C5C5C5] mb-0 leading-4">{people.name}</p>
              <p className="mt-1 truncate text-xs text-[#8E8E8E] font-normal leading-4">{people.role}</p>
            </div>
          </div>
        </li>
      ))}
      <div className="p-3">
      <button type="button" className="bg-[#C5C5C5] px-2 rounded text-[#0A1016] font-semibold text-sm">Add New Member</button>
      </div>
    </ul>
  )

  // works when <5.6.0 , deprecated when >=5.6.0  🙅🏻‍♀️
  const content = (
    <div style={{ width: "204px", height: "154px", paddingTop: "12px", paddingLeft: '20px', paddingRight: '20px', backgroundColor: "#0A1016", }}>
      <Row style={{ justifyContent: "space-between" }}>
        <Col>
          <div style={{ justifyContent: "center", display: "flex" }}>
            <img src="/img/Header-section/BPM.svg" alt="BPM_svg" />
          </div>
          <p >BPM</p>
        </Col>
        <Col>
          <div style={{ justifyContent: "center", display: "flex" }}>
            <img src="/img/Header-section/Management.svg" alt="managment_svg" />
          </div>
          <p>BSM</p>
        </Col>
        <Col>
          <div style={{ justifyContent: "center", display: "flex" }}>
            <img src="/img/Header-section/BMM.svg" alt="BMM_svg" />
          </div>
          <p>BMM</p>
        </Col>
      </Row>
      <hr className="mb-3" />
      <Row style={{ justifyContent: "space-between" }}>
        <Col>
          <div style={{ justifyContent: "center", display: "flex" }}>
            <img src="/img/Header-section/SBM.svg" alt="SBM-svg" />
          </div>
          <p><a style={{color:"#c5c5c5"}} href={"https://sbm.verdeos.com"}>SBM</a></p>
        </Col>
        <Col>
          <div style={{ justifyContent: "center", display: "flex" }}>
            <img src="/img/Header-section/DP.svg" alt="DP-svg" />
          </div>
          <p>DP</p>
        </Col>
        <Col span={8}></Col>
      </Row>
    </div>
  );

  const profile = () => (
    <div style={{ paddingLeft: '12px', paddingRight: '12px', backgroundColor: "#0A1016", height: "200px", width: "221px", }}>
      <Row style={{ justifyContent: "center", display: "flex" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="20" fill="#1B2228" />
          <text x="50%" y="50%" textAnchor="middle" alignmentBaseline="middle" fontSize="14" fill="#fff">{"BIG"}</text>
        </svg>

      </Row>
      <div style={{ textAlign: "center" }}>
        <p style={{ marginBottom: "0px" }}><b>{"Balaji Gite"}</b></p>
        <p>{"big@gegroup.com.au"}</p>
      </div>
      <div>
        <h6>Account Setting</h6>
        <hr style={{ boxSizing: "border-box" }} />
        <Collapse defaultActiveKey={[activeKey]} onChange={onChange} style={{ backgroundColor: 'transparent', border: 'none' }}>
          <Panel header="Team Members" key="1"  style={{ border: 'none', padding:'0px' }}> {/* Only one collapse with the header "Team Members" */}
            <p style={{ backgroundColor: "transparent" }}>{text}</p>
          </Panel>
        </Collapse>
        <hr style={{ boxSizing: "border-box" }} />
        <button className="logout-button" onClick={handleLogout}><h6>Logout</h6></button>
      </div>
    </div>
  );

  return (
    <>
      <nav className="top-0 sticky  z-50 w-full flex relative flex-wrap items-center justify-between px-6 py-4 navbar-expand-lg custom-bg-color box-shadow ">
        {/* {brand} */}
        <Link href="/">
          <a
            href="#pablo"
            className="md:block text-left text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold px-0"
          >
            <img
              alt="..."
              className="rounded-full align-middle border-none"
              src="/img/logo.png"
              width="150"
            ></img>
          </a>
        </Link>

        {/* Popup section */}
        <div className="flex">
          <section className="mr-3">
            <ConfigProvider >
              <Popover placement="bottomLeft" trigger="click" content={content}>
                <img src="./img/menu_bar_svg.svg" alt="menuBar_svg" style={{ cursor: 'pointer' }} />
              </Popover>
            </ConfigProvider>
          </section>
          <section className="mr-3">
            <img src="./img/notification.png" alt="notification png" />
          </section>
          <section>
            <ConfigProvider>
              <Popover placement="bottomLeft" content={profile()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" style={{ cursor: 'pointer', width: "auto", height: "30px" }}>
                  <circle cx="20" cy="20" r="20" fill="#1B2228" />
                  <text x="50%" y="50%" textAnchor="middle" alignmentBaseline="middle" fontSize="14" fill="#fff">BG</text>
                </svg>
              </Popover>
            </ConfigProvider>
          </section>
        </div>
      </nav>
    </>
  );
}
