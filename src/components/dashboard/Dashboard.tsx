import React, { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";

const Dashboard = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <div className="drawer lg:drawer-open" style={{height: "100vh"}}>
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content flex" style={{overflowY: "scroll"}}>
                    <label
                    htmlFor="my-drawer-2"
                        className="btn btn-ghost text-2xl ms-2 drawer-button lg:hidden"
                        // onClick={() => setIsOpen(!isOpen)}
                    >
                        <MdMenu />
                    </label>
                    {children}
                </div>
                <div className="drawer-side" style={{zIndex: 1000}}>
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                    <ul className="menu min-h-full p-4 w-80 bg-base-200 text-base-content">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>

                        <li>
                            <details open>
                                <summary>Problems</summary>
                                <ul>
                                    <li>
                                        <Link to="/dashboard/add-problem">
                                            Create New Problem
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/manage-problems">
                                            Manage Problems
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/problems">
                                            View Problems
                                        </Link>
                                    </li>
                                </ul>
                            </details>
                            
                        </li>
                        <li>
                            <Link to="/dashboard/manage-users">Manage Users</Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
