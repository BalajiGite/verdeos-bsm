import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import Auth from "layouts/Auth.js";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = !!Cookies.get("auth");
    if (isAuthenticated) {
      router.push("/dashboard");
    }else {
      setIsLoading(false); // Set loading to false after checking authentication
    }
  }, [router]);

  
  const authenticateUser = (username, password) => {
    if (username === "demo" && password === "Password.123#") {
      const userData = {
        username,
        password,
      };
      const expirationTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // 24 hours in milliseconds
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
    <div style={{ textAlign: 'center', color: 'white', fontSize: 'larger' }}>Loading...</div>
    )
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full ">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className=" text-center mb-3 font-bold text-white">
                  <small>Sign in with credentials</small>
                </div>
                <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-white text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      User Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="User Name"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-white text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="energy-usage-intensity-button-bg-color active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 text-white"
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
      </div>
    </>
  );
}

Login.layout = Auth;
