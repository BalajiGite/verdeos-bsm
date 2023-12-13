import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import image from "../public/img/Rectangle_496.png";
import Auth from "layouts/Auth.js";
import Image from "next/image";
import logo from "../public/img/VERDEOS Logo - Dark Small 1.png";
export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = !!Cookies.get("auth");
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      setIsLoading(false); // Set loading to false after checking authentication
    }
  }, [router]);

  const authenticateUser = (username, password) => {
    if (username === "demo" && password === "demo") {
      const userData = {
        username,
        password,
      };
      const expirationTime = new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      ); // 24 hours in milliseconds
      Cookies.set("auth", JSON.stringify(userData), {
        expires: expirationTime,
      });
      return true;
    }
    return false;
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const isAuthenticated = authenticateUser(userName, password);
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      alert("Incorrect username and password");
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", color: "white", fontSize: "larger" }}>
        Loading...
      </div>
    );
  }

  return (
    <>
       <section className="flex h-full bg-[#0A1016]">
      <div className="w-1/2 h-full">
        <Image src = {image} alt ="ractangle image" className = "object-cover w-full h-auto"/>
      </div>
      <div className="w-1/2 h-full">
         <div className="flex justify-end my-16 mr-10 ">
          <Image src={logo} alt = "verdeos-logo" className="w-48" />
        </div>
        <div className=" justify-center flex" >
          <div className="block w-96">
              <div className="p-8 rounded shadow-md  mt-14">
                <p className="text-slate-500 font-normal text-sm leading-4">Welcome back! </p>
                <p className="text-lg text-slate-500  font-semibold leading-6 ">Sign in with credential</p>
              <form className = "mt-2" >
                <div className="mb-4">
                  <label
                    for="username"
                    className="block text-sm leading-4 font-normal  text-slate-500"
                    >Enter Username
                    </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    onChange={(e) => setUserName(e.target.value)}
                    className="mt-1 p-2 w-full border rounded bg-transparent text-white "
                  />
                </div>
                <div className="mb-4">
                  <label
                    for="password"
                    className="block text-sm   leading-4 font-normal  text-slate-500"
                    >Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 p-2 w-full border rounded bg-transparent text-white "
                  />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      className="mr-2 rounded-md w-4 h-4 bg-transparent custom-border-color "
                    />
                    <label for="remember" className="text-sm  text-slate-500"
                      >Remember me</label>
                  </div>
                  <a href="#" className="text-sm text-white ">Forgot your password?</a>
                </div>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full  text-white py-2 rounded border-slate-100 border-opacity-50 bg-"
                >
                  Login
                </button>
              </form>
              <p className="mt-4 text-sm text-slate-500 ">
                Don't have an account?
                <a href="#" className="text-white ml-2">Create new account</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>  
    </>
  );
}

Login.layout = Auth;

{
  /* <div classNameName=" mx-auto px-4 h-full ">
        <div classNameName="flex content-center items-center justify-center h-full">
          <div classNameName="w-full lg:w-4/12 px-4">
            <div classNameName="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div classNameName="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div classNameName=" text-center mb-3 font-bold text-white">
                  <small>Sign in with credentials</small>
                </div>
                <form>
                  <div classNameName="relative w-full mb-3">
                    <label
                      classNameName="block uppercase text-white text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      User Name
                    </label>
                    <input
                      type="text"
                      classNameName="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="User Name"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>

                  <div classNameName="relative w-full mb-3">
                    <label
                      classNameName="block uppercase text-white text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      classNameName="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div classNameName="text-center mt-6">
                    <button
                      classNameName="energy-usage-intensity-button-bg-color active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 text-white"
                      type="button"
                      onClick={handleLogin}
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */
}
