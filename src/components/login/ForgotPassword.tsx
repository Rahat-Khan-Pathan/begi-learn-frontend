import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import authService from "../../services/authService";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomToast from "../toast/CustomToast";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [userT, setUserT] = useState<null | string>(null);
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [type, setType] = useState<"success" | "error" | "info" | "warning">(
        "success"
    );
    const [errorMessage, setErrorMessage] = useState("");
    const [openToast, setOpenToast] = useState(false);

    useEffect(() => {
        setUserT(params.get("user_t"));
    }, [params.get("user_t")]);

    const handleSubmit = () => {
        setIsLoading(true);
        authService
            .changePassword(userT, { password })
            .then((res: any) => {
                setIsLoading(false);
                setIsSuccess(true);
                setErrorMessage(res?.data?.message);
                setOpenToast(true);
                setType("success");
                setPassword("");
                setRepeatPassword("");
            })
            .catch((err: any) => {
                setIsLoading(false);
                setIsSuccess(false);
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
            });
    };
    useEffect(() => {
        if (password && repeatPassword && password === repeatPassword) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [password, repeatPassword]);
    return (
        <div className="mt-32">
            <div className="card w-[40%] bg-base-100 shadow m-auto">
                <div className="card-body">
                    <h2 className="card-title">Change Password</h2>
                    <div>
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
                                placeholder="New Password (minimum 6 digits)"
                            />
                            <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </IconButton>
                        </label>
                        <label
                            className={
                                "input input-bordered flex items-center gap-2 mt-4 w-full " +
                                (password !== repeatPassword
                                    ? "input-error"
                                    : "")
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
                                onChange={(e) =>
                                    setRepeatPassword(e.target.value)
                                }
                                type={showRepeatPassword ? "text" : "password"}
                                className="grow"
                                placeholder="Confirm New Password"
                            />
                            <IconButton
                                onClick={() =>
                                    setShowRepeatPassword(!showRepeatPassword)
                                }
                            >
                                {showRepeatPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </IconButton>
                        </label>
                    </div>
                    <div className="card-actions justify-end">
                        <button
                            disabled={isDisabled || isSuccess}
                            className="btn bg-teal-600 text-white mt-4  hover:bg-teal-700"
                            onClick={() => handleSubmit()}
                        >
                            Change Password
                        </button>
                        <div className="card-actions justify-end">
                            {isSuccess && (
                                <button
                                    className="btn bg-teal-600 text-white mt-4  hover:bg-teal-700"
                                    onClick={() => {
                                        navigate("/login");
                                    }}
                                >
                                    Log In
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <CustomToast
                type={type}
                message={errorMessage}
                open={openToast}
                setOpen={setOpenToast}
            />
        </div>
    );
};

export default ForgotPassword;
