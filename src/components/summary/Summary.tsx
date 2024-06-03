import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import problemsService from "../../services/problemsService";
import CustomToast from "../toast/CustomToast";
import { Paper } from "@mui/material";
import useAuthStore from "../../store/auth";
import MarginIcon from "@mui/icons-material/Margin";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import PublishIcon from "@mui/icons-material/Publish";
import BadgeIcon from "@mui/icons-material/Badge";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";

const Summary = () => {
    const token = useAuthStore((state) => state.userToken);
    const [isLoading, setIsLoading] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [type, setType] = useState<"success" | "error" | "info" | "warning">(
        "success"
    );
    const [data, setData] = useState<any | null>(null);

    const getSummary = () => {
        setIsLoading(true);
        problemsService
            .getSummary(token)
            .then((res: any) => {
                setIsLoading(false);
                setData(res?.data?.data);
            })
            .catch((err: any) => {
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
                setIsLoading(false);
            });
    };
    useEffect(() => {
        getSummary();
    }, []);
    return (
        <>
            <div className="w-[90vw]">
                <div>
                    <div
                        className="text-sm lg:text-normal font-semibold breadcrumbs bg-[#F2F2F2] pt-4 pb-4 w-full"
                    >
                        <ul>
                            <li></li>
                            <li>
                                <a>Dashboard</a>
                            </li>
                        </ul>
                    </div>

                    {isLoading ? (
                        <div className="w-full h-[100vh] flex justify-center items-center">
                            <span className="loading loading-dots loading-lg"></span>
                        </div>
                    ) : (
                        <div className="pt-8">
                            <Paper
                                className="px-8 pt-8 pb-16 sm:mx-8 mx-2"
                                elevation={6}
                            >
                                <p
                                    className="bg-teal-600 hover:bg-teal-700 text-white cursor-pointer text-md lg:text-xl font-bold text-center mb-8 py-1"
                                    style={{ borderRadius: "10px" }}
                                >
                                    Summary
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center items-center">
                                    <div className="card w-[90%] bg-neutral text-neutral-content">
                                        <div className="card-body grid sm:grid-cols-2 grid-cols-1 items-center gap-4 justify-items-center">
                                            <div>
                                                <h2 className="card-title">
                                                    Total Problems
                                                </h2>
                                                <h2 className="card-title mt-4">
                                                    {data?.totalProblems}
                                                </h2>
                                            </div>

                                            <div>
                                                <MarginIcon fontSize="large" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card w-[90%] bg-emerald-800  text-neutral-content">
                                        <div className="card-body grid sm:grid-cols-2 grid-cols-1 items-center gap-4 justify-items-center">
                                            <div>
                                                <h2 className="card-title">
                                                    Verified Problems
                                                </h2>
                                                <h2 className="card-title mt-4">
                                                    {data?.verifiedProblems}
                                                </h2>
                                            </div>

                                            <div>
                                                <DomainVerificationIcon fontSize="large" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card w-[90%] bg-sky-600  text-neutral-content">
                                        <div className="card-body grid sm:grid-cols-2 grid-cols-1 items-center gap-4 justify-items-center">
                                            <div>
                                                <h2 className="card-title">
                                                    Total Submissions
                                                </h2>
                                                <h2 className="card-title mt-4">
                                                    {data?.totalSubmissions}
                                                </h2>
                                            </div>

                                            <div>
                                                <PublishIcon fontSize="large" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card w-[90%] bg-neutral text-neutral-content">
                                        <div className="card-body grid sm:grid-cols-2 grid-cols-1 items-center gap-4 justify-items-center">
                                            <div>
                                                <h2 className="card-title">
                                                    Your Problems
                                                </h2>
                                                <h2 className="card-title mt-4">
                                                    {data?.myProblems}
                                                </h2>
                                            </div>

                                            <div>
                                                <BadgeIcon fontSize="large" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card w-[90%] bg-sky-600 text-neutral-content">
                                        <div className="card-body grid sm:grid-cols-2 grid-cols-1 items-center gap-4 justify-items-center">
                                            <div>
                                                <h2 className="card-title">
                                                    Your Submissions
                                                </h2>
                                                <h2 className="card-title mt-4">
                                                    {data?.mySubmissions}
                                                </h2>
                                            </div>

                                            <div>
                                                <RecordVoiceOverIcon fontSize="large" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card w-[90%] bg-emerald-800 text-neutral-content">
                                        <div className="card-body grid sm:grid-cols-2 grid-cols-1 items-center gap-4 justify-items-center">
                                            <div>
                                                <h2 className="card-title">
                                                    My Accepted Submissions
                                                </h2>
                                                <h2 className="card-title mt-4">
                                                    {data?.acceptedSubmissions}
                                                </h2>
                                            </div>

                                            <div>
                                                <SettingsAccessibilityIcon fontSize="large" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        </div>
                    )}
                </div>
            </div>
            <CustomToast
                type={type}
                message={errorMessage}
                open={openToast}
                setOpen={setOpenToast}
            />
        </>
    );
};

export default Summary;
