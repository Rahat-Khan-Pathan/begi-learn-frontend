import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import authService from "../../services/authService";

const Verify = () => {
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [userT, setUserT] = useState<null | string>(null);

    useEffect(() => {
        setUserT(params.get("user_t"));
    }, [params.get("user_t")]);

    useEffect(() => {
        if (userT) {
            setIsLoading(true);
            authService
                .verifyUser(userT)
                .then((res: any) => {
                    setIsLoading(false);
                    setIsSuccess(true);
                    setMessage(res?.data?.message);
                })
                .catch((err: any) => {
                    setIsLoading(false);
                    setIsSuccess(false);
                    setMessage("Invalid link! Please check your email again.");
                });
        }
    }, [userT]);
    return (
        <div className="mt-32">
            <div className="card w-96 bg-base-100 shadow m-auto">
                <div className="card-body">
                    <h2 className="card-title">User Verification</h2>
                    <p className="mt-6">
                        {isLoading ? (
                            <span className="loading loading-dots"></span>
                        ) : (
                            message
                        )}
                    </p>
                    <div className="card-actions justify-end">
                        <button
                            disabled={!isSuccess}
                            className="btn bg-teal-600 text-white mt-4  hover:bg-teal-700"
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verify;
