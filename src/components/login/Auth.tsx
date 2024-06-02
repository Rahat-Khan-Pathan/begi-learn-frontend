import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Index from "../animation/Index";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [tab, setTab] = useState(location.pathname);
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="md:block hidden ">
                    <Index />
                </div>
                <div className="md:mt-20 mt-12 mb-12 md:mb-0 m-auto md:ms-32 w-[80%] md:w-[60%]">
                    <div role="tablist" className="tabs tabs-boxed w-full">
                        <a
                            role="tab"
                            className={
                                tab === "/login"
                                    ? "tab text-white bg-teal-600 hover:bg-teal-700"
                                    : "tab"
                            }
                            onClick={() => {
                                navigate("/login");
                                setTab("/login");
                            }}
                        >
                            Log In
                        </a>
                        <a
                            role="tab"
                            className={
                                tab === "/signup"
                                    ? "tab text-white bg-teal-600 hover:bg-teal-700"
                                    : "tab"
                            }
                            onClick={() => {
                                navigate("/signup");
                                setTab("/signup");
                            }}
                        >
                            Sign Up
                        </a>
                    </div>
                    {tab === "/login" ? (
                        <Login setTab={setTab} />
                    ) : (
                        <Signup setTab={setTab} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Auth;
