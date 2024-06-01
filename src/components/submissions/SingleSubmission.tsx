import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/auth";
import { useNavigate, useParams } from "react-router-dom";
import submissionsService from "../../services/submissionsService";
import CustomToast from "../toast/CustomToast";
import CodeEditor from "../../editor/CodeEditor";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Chip,
    Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SingleSubmission = () => {
    const token = useAuthStore(state => state.userToken);
    const { id } = useParams();
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("cpp");
    const [isLoading, setIsLoading] = useState(false);
    const userObject = useAuthStore((state) => state.userObject);
    const navigate = useNavigate();
    const [submission, setSubmission] = useState<any | null>(null);
    const [openToast, setOpenToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [type, setType] = useState<"success" | "error" | "info" | "warning">(
        "success"
    );
    const getSubmission = () => {
        setIsLoading(true);
        submissionsService
            .getSubmissionById(id, token)
            .then((res: any) => {
                setSubmission(res?.data?.data);
                setIsLoading(false);
            })
            .catch((err: any) => {
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
                setIsLoading(false);
            });
    };
    useEffect(() => {
        if (id) {
            getSubmission();
        }
    }, [id]);
    return (
        <div className="w-full lg:px-8">
            {isLoading ? (
                <div className="w-full h-[70vh] flex justify-center items-center">
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            ) : (
                <div className="pb-16">
                    <div className="grid grid-cols-2 gap-4">
                        <Paper
                            className="p-6 overflow-auto"
                            elevation={4}
                            sx={{
                                borderRadius: "15px",
                                height: "100vh",
                                overflow: "auto",
                            }}
                        >
                            <div>
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/problems/${submission?.problem?.id}`
                                        )
                                    }
                                    className="font-bold text-2xl mb-8 btn btn-link btn-sm"
                                >
                                    {`${submission?.problem?.id}. ${submission?.problem?.title}`}
                                </button>
                            </div>
                            <Chip
                                size="small"
                                label={submission?.problem?.difficulty}
                                color={
                                    submission?.problem?.difficulty === "Easy"
                                        ? "success"
                                        : submission?.problem?.difficulty ===
                                          "Medium"
                                        ? "warning"
                                        : "error"
                                }
                            />
                            {submission?.problem?.tags?.map((tag: any) => (
                                <Chip
                                    key={tag?.id}
                                    size="small"
                                    label={tag?.tagName}
                                    sx={{ marginLeft: "5px" }}
                                />
                            ))}
                            <div className="mt-4">
                                <p className="font-bold text-center mb-2 text-lg bg-gray-200 py-2 rounded-xl">
                                    Final Result -
                                    {submission?.result === "Accepted" ? (
                                        <Chip
                                            label="Accepted"
                                            color="success"
                                            size="small"
                                            sx={{ marginLeft: "10px" }}
                                        />
                                    ) : (
                                        <Chip
                                            label="Not Accepted"
                                            color="error"
                                            size="small"
                                            sx={{ marginLeft: "10px" }}
                                        />
                                    )}
                                </p>
                                {submission?.testCases?.map(
                                    (res: any, idx: number) => (
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                <div>
                                                    <span>
                                                        Test Case {idx + 1}
                                                    </span>
                                                    {res.verdict ===
                                                    "Accepted" ? (
                                                        <Chip
                                                            label={res.verdict}
                                                            color="success"
                                                            size="small"
                                                            sx={{
                                                                marginLeft:
                                                                    "15px",
                                                            }}
                                                        />
                                                    ) : (
                                                        <Chip
                                                            label={res.verdict}
                                                            color="error"
                                                            size="small"
                                                            sx={{
                                                                marginLeft:
                                                                    "15px",
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="bg-gray-200 p-2">
                                                    <p>Input</p>
                                                    <pre>
                                                        <code>
                                                            {res?.input}
                                                        </code>
                                                    </pre>
                                                </div>
                                                <div className="bg-gray-200 p-2">
                                                    <p>Expected Output</p>
                                                    <pre>
                                                        <code>
                                                            {res?.output}
                                                        </code>
                                                    </pre>
                                                </div>
                                                <div className="bg-gray-200 p-2">
                                                    <p>Your Output</p>
                                                    <pre>
                                                        <code>
                                                            {res?.userOutput}
                                                        </code>
                                                    </pre>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                )}
                            </div>
                        </Paper>
                        <Paper
                            className="p-4"
                            elevation={4}
                            sx={{ borderRadius: "15px" }}
                        >
                            <CodeEditor
                                code={submission?.code}
                                setCode={setCode}
                                language={
                                    submission?.language === "c++"
                                        ? "cpp"
                                        : submission?.language
                                }
                                setLanguage={setLanguage}
                                readOnly={true}
                            />
                        </Paper>
                    </div>
                </div>
            )}
            <CustomToast
                type={type}
                message={errorMessage}
                open={openToast}
                setOpen={setOpenToast}
            />
        </div>
    );
};

export default SingleSubmission;
