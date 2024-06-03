import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CustomToast from "../toast/CustomToast";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import authService from "../../services/authService";
import useAuthStore from "../../store/auth";
interface IProps {
    setTab: Dispatch<SetStateAction<string>>;
}
const Login = ({ setTab }: IProps) => {
    const loginStore = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [type, setType] = useState<"success" | "error" | "info" | "warning">(
        "success"
    );
    const [errorMessage, setErrorMessage] = useState("");
    const [openToast, setOpenToast] = useState(false);
    const [email, setEmail] = useState("");
    const [email2, setEmail2] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [isDisabled2, setIsDisabled2] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = () => {
        setIsLoading(true);
        authService
            .logIn({ email, password })
            .then((res: any) => {
                setOpenToast(true);
                setType("success");
                setErrorMessage(res?.data?.message);
                setIsLoading(false);
                loginStore(res?.data?.data?.token, res?.data?.data?.user);
                setEmail("");
                setPassword("");
                navigate("/home");
            })
            .catch((err: any) => {
                setOpenToast(true);
                setType("error");
                setErrorMessage(err?.response?.data?.message);
                setIsLoading(false);
            });
    };
    const handleForgotSubmit = () => {
        setIsLoading2(true);
        authService
            .forgotPassword({ email: email2 })
            .then((res: any) => {
                setOpenToast(true);
                setType("success");
                setErrorMessage(res?.data?.message);
                setIsLoading2(false);
                setEmail2("");
            })
            .catch((err: any) => {
                setOpenToast(true);
                setType("error");
                setErrorMessage(err?.response?.data?.message);
                setIsLoading2(false);
            });
    };
    useEffect(() => {
        if (email && password) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [email, password]);
    useEffect(() => {
        if (email2) {
            setIsDisabled2(false);
        } else {
            setIsDisabled2(true);
        }
    }, [email2]);
    return (
        <div className="pt-12">
            <p className="font-semibold text-4xl poppins-semibold">
                Welcome Back!
            </p>
            <p className="font-semibold text-4xl mt-2 poppins-semibold">
                Login to your account
            </p>
            <p className="font-normal mt-6 mb-12 text-base">
                It's nice to see you again. Ready to code?
            </p>
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
                    className="grow w-full"
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
                    className="grow w-full"
                    placeholder="Password"
                />
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </label>
            <button
                onClick={() => handleSubmit()}
                disabled={isDisabled}
                className="btn bg-teal-600 text-white mt-4 w-full hover:bg-teal-700"
            >
                {isLoading ? (
                    <span className="loading loading-dots"></span>
                ) : (
                    "LOG IN"
                )}
            </button>
            <p className="text-base font-normal text-center mt-4">
                Don't have an account?
                <button
                    className="btn btn-xs bg-teal-600 hover:bg-teal-700 text-white ms-2"
                    onClick={() => {
                        navigate("/signup");
                        setTab("/signup");
                    }}
                >
                    Sign Up
                </button>
            </p>
            <div className="w-full flex justify-center">
                <button
                    className="btn btn-link"
                    onClick={() =>
                        (
                            document.getElementById(
                                "my_modal_2"
                            ) as HTMLDialogElement
                        ).showModal()
                    }
                >
                    Forgot Password?
                </button>
            </div>
            <CustomToast
                type={type}
                message={errorMessage}
                open={openToast}
                setOpen={setOpenToast}
            />
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-6">Change Your Password</h3>
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
                            onChange={(e) => setEmail2(e.target.value)}
                            type="text"
                            className="grow w-full"
                            placeholder="Enter your email"
                        />
                    </label>
                    <button
                        onClick={() => handleForgotSubmit()}
                        disabled={isDisabled2}
                        className="btn bg-teal-600 text-white mt-4 w-full hover:bg-teal-700"
                    >
                        {isLoading2 ? (
                            <span className="loading loading-dots"></span>
                        ) : (
                            "SEND LINK"
                        )}
                    </button>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>CLOSE</button>
                </form>
            </dialog>
        </div>
    );
};

export default Login;
