import React, { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../store/auth";

const NavBar = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.userObject);
    const location = useLocation();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setOpen(false);
    }, [location]);
    return (
        <div>
            <div className="navbar bg-base-300 lg:px-4 mb-8">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <a onClick={() => navigate("/home")}>Home</a>
                            </li>
                            <li>
                                <a onClick={() => navigate("/problems")}>
                                    Problems
                                </a>
                            </li>
                            <li>
                                <a>Submissions</a>
                                <ul className="p-2">
                                    <li>
                                        <a
                                            onClick={() =>
                                                navigate("/my-submissions")
                                            }
                                        >
                                            Your Submissions
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() =>
                                                navigate("/all-submissions")
                                            }
                                        >
                                            All Submissions
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a onClick={() => navigate("/leaderboard")}>
                                    Leaderboard
                                </a>
                            </li>
                            <li>
                                <a onClick={() => navigate("/dashboard")}>
                                    Dashboard
                                </a>
                            </li>
                        </ul>
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="btn btn-ghost w-[100%] lg:w-[40%] flex items-center justify-start overflow-hidden"
                    >
                        <p><span className="text-sky-500">Begi</span><span>Learn</span></p>
                    </button>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <a onClick={() => navigate("/home")}>Home</a>
                        </li>
                        <li>
                            <a onClick={() => navigate("/problems")}>
                                Problems
                            </a>
                        </li>
                        <li>
                            <details style={{ zIndex: 1000 }}>
                                <summary>Submissions</summary>
                                <ul className="p-2 w-[150%]">
                                    <li>
                                        <a
                                            onClick={() =>
                                                navigate("/my-submissions")
                                            }
                                        >
                                            Your Submissions
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() =>
                                                navigate("/all-submissions")
                                            }
                                        >
                                            All Submissions
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </li>
                        <li>
                            <a onClick={() => navigate("/leaderboard")}>
                                Leaderboard
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate("/dashboard")}>
                                Dashboard
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="flex-none gap-2">
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="/user.png"
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <a onClick={() => logout()}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
};

export default NavBar;
