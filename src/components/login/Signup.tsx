import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CustomToast from "../toast/CustomToast";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
interface IProps {
    setTab: Dispatch<SetStateAction<string>>;
}
const Signup = ({ setTab }: IProps) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState<"success" | "error" | "info" | "warning">(
        "success"
    );
    const [errorMessage, setErrorMessage] = useState("");
    const [openToast, setOpenToast] = useState(false);
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleSubmit = () => {
        setIsLoading(true);
        authService
            .signUp({ username, fullName, email, password })
            .then((res: any) => {
                setOpenToast(true);
                setType("success");
                setErrorMessage(res?.data?.message);
                setIsLoading(false);
                setUsername("");
                setFullName("");
                setEmail("");
                setPassword("");
                setRepeatPassword("");
            })
            .catch((err: any) => {
                setOpenToast(true);
                setType("error");
                setErrorMessage(err?.response?.data?.message);
                setIsLoading(false);
            });
    };
    useEffect(()=> {
        if(username && fullName && email && password && repeatPassword && password === repeatPassword) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [username, fullName, email, password, repeatPassword])
    return (
        <div className="pt-12">
            <p className="font-semibold text-4xl poppins-semibold">
                Hello there!
            </p>
            <p className="font-semibold text-4xl mt-2 poppins-semibold">
                Create an account now!
            </p>
            <label className="input input-bordered flex items-center gap-2 mb-4 mt-12">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    className="grow"
                    placeholder="Username (without spaces)"
                />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                    onChange={(e) => setFullName(e.target.value)}
                    type="text"
                    className="grow"
                    placeholder="Full name"
                />
            </label>
            <label className="input input-bordered flex items-center gap-2 w-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="grow"
                    placeholder="Email"
                />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-4 w-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                >
                    <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                    />
                </svg>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    className="grow"
                    placeholder="Password (minimum 6 digits)"
                />
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </label>
            <label
                className={
                    "input input-bordered flex items-center gap-2 mt-4 w-full " +
                    (password !== repeatPassword ? "input-error" : "")
                }
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                >
                    <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                    />
                </svg>
                <input
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    type={showRepeatPassword ? "text" : "password"}
                    className="grow"
                    placeholder="Repeat Password"
                />
                <IconButton
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                    {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </label>
            <button
                disabled={isDisabled}
                onClick={() => handleSubmit()}
                className="btn bg-teal-600 text-white mt-4 w-full hover:bg-teal-700"
            >
                {isLoading ? (
                    <span className="loading loading-dots"></span>
                ) : (
                    "SIGN UP"
                )}
            </button>
            <p className="text-base font-normal text-center mt-4">
                Already have an account?
                <button
                    className="btn btn-xs bg-teal-600 hover:bg-teal-700 text-white ms-2"
                    onClick={() => {
                        navigate("/login");
                        setTab("/login");
                    }}
                >
                    Log In
                </button>
            </p>
            <CustomToast
                type={type}
                message={errorMessage}
                open={openToast}
                setOpen={setOpenToast}
            />
        </div>
    );
};

export default Signup;
