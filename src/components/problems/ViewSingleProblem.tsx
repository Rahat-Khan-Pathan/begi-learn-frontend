import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomToast from "../toast/CustomToast";
import problemsService from "../../services/problemsService";
import PreviewEditor from "../../editor/PreviewEditor";
import { IProblem, ResponseTestCase } from "../../types/problem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import CodeEditor from "../../editor/CodeEditor";
import useAuthStore from "../../store/auth";
import submissionsService from "../../services/submissionsService";

const ViewSingleProblem = () => {
    const token = useAuthStore(state => state.userToken);
    const { id } = useParams();
    const userObject = useAuthStore((state) => state.userObject);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isLoadingUpdate2, setIsLoadingUpdate2] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [type, setType] = useState<"success" | "error" | "info" | "warning">(
        "success"
    );
    const [problem, setProblem] = useState<IProblem>(null);
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("cpp");

    const [runResult, setRunResult] = useState<ResponseTestCase[]>([]);
    const navigate = useNavigate();

    const getProblemById = () => {
        setIsLoading(true);
        problemsService
            .getProblemById(id, token)
            .then((res: any) => {
                setProblem(res?.data?.data);
                setIsLoading(false);
            })
            .catch((err: any) => {
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
                setIsLoading(false);
            });
    };
    const handleSubmit = () => {
        setIsLoadingUpdate(true);
        setRunResult([]);
        const nLanguage = language === "cpp" ? "c++" : language;
        submissionsService
            .addSubmission({
                code,
                userId: userObject.id,
                problemId: parseInt(id),
                language: nLanguage,
            }, token)
            .then((res: any) => {
                setErrorMessage(res?.data?.message);
                navigate(`/my-submissions/${res?.data?.submissionId}`);
                setOpenToast(true);
                setType("success");
                setIsLoadingUpdate(false);
            })
            .catch((err: any) => {
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
                setIsLoadingUpdate(false);
            });
    };
    const handleRun = () => {
        setIsLoadingUpdate2(true);
        setRunResult([]);
        const nLanguage = language === "cpp" ? "c++" : language;
        submissionsService
            .runSample({
                code,
                userId: userObject.id,
                problemId: parseInt(id),
                language: nLanguage,
            }, token)
            .then((res: any) => {
                setErrorMessage(res?.data?.message);
                setRunResult(res?.data?.data);
                setOpenToast(true);
                setType("success");
                setIsLoadingUpdate2(false);
            })
            .catch((err: any) => {
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
                setIsLoadingUpdate2(false);
            });
    };
    useEffect(() => {
        if (id) {
            getProblemById();
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
                            sx={{ borderRadius: "15px" }}
                        >
                            <div className="mb-4 w-full flex justify-between">
                                <span className="font-bold text-2xl">
                                    {`${problem?.id}. ${problem?.title}`}
                                </span>
                                <div>
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/all-submissions?problemId=${problem?.id}`
                                            )
                                        }
                                        className="btn btn-xs"
                                    >
                                        All Submissions
                                    </button>
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/my-submissions?problemId=${problem?.id}`
                                            )
                                        }
                                        className="btn btn-xs ms-4"
                                    >
                                        My Submissions
                                    </button>
                                </div>
                            </div>
                            <Chip
                                size="small"
                                label={problem?.difficulty}
                                color={
                                    problem?.difficulty === "Easy"
                                        ? "success"
                                        : problem?.difficulty === "Medium"
                                        ? "warning"
                                        : "error"
                                }
                            />
                            {problem?.tags?.map((tag: any) => (
                                <Chip
                                    key={tag?.id}
                                    size="small"
                                    label={tag?.tagName}
                                    sx={{ marginLeft: "5px" }}
                                />
                            ))}
                            <p className="mt-8 font-bold">Problem Statement</p>
                            <PreviewEditor
                                text={problem?.statement || ""}
                                id="preview1"
                            />
                            <p className="mt-8 font-bold">Input Format</p>
                            <PreviewEditor
                                text={problem?.inputFormat || ""}
                                id="preview2"
                            />
                            <p className="mt-8 font-bold">Output Format</p>
                            <PreviewEditor
                                text={problem?.outputFormat || ""}
                                id="preview3"
                            />
                            <p className="mt-8 font-bold">Constraints</p>
                            <PreviewEditor
                                text={problem?.constraints || ""}
                                id="preview4"
                            />
                            {problem?.testCases?.map((row, idx) => (
                                <>
                                    <p className="mt-8 mb-2 font-bold">
                                        Sample {idx + 1}
                                    </p>
                                    <TableContainer>
                                        <Table
                                            size="small"
                                            className="border-2 border-gray-200"
                                            sx={{ maxWidth: 400 }}
                                            aria-label="simple table"
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Input</TableCell>
                                                    <TableCell align="right">
                                                        Output
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow
                                                    key={row?.id}
                                                    sx={{
                                                        "&:last-child td, &:last-child th":
                                                            { border: 0 },
                                                    }}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        style={{
                                                            whiteSpace:
                                                                "pre-line",
                                                            verticalAlign:
                                                                "top",
                                                        }}
                                                    >
                                                        {row?.input}
                                                    </TableCell>
                                                    <TableCell
                                                        style={{
                                                            whiteSpace:
                                                                "pre-line",
                                                            verticalAlign:
                                                                "top",
                                                        }}
                                                        align="right"
                                                    >
                                                        {row?.output}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </>
                            ))}
                        </Paper>
                        <Paper
                            className="p-4"
                            elevation={4}
                            sx={{ borderRadius: "15px" }}
                        >
                            <CodeEditor
                                code={code}
                                setCode={setCode}
                                language={language}
                                setLanguage={setLanguage}
                                readOnly={false}
                            />
                            <div className="w-full flex justify-end">
                                <button
                                    onClick={() => handleRun()}
                                    className="btn btn-sm lg:btn-md mt-4 bg-slate-600 hover:bg-slate-700 text-white w-16"
                                    disabled={
                                        isLoadingUpdate2 || isLoadingUpdate
                                    }
                                >
                                    {isLoadingUpdate2 ? (
                                        <span className="loading loading-dots"></span>
                                    ) : (
                                        "RUN"
                                    )}
                                </button>
                                <button
                                    disabled={
                                        isLoadingUpdate || isLoadingUpdate2
                                    }
                                    onClick={() => handleSubmit()}
                                    className="btn btn-sm lg:btn-md mt-4 bg-teal-600 hover:bg-teal-700 text-white w-24 ms-2"
                                >
                                    {isLoadingUpdate ? (
                                        <span className="loading loading-dots"></span>
                                    ) : (
                                        "SUBMIT"
                                    )}
                                </button>
                            </div>
                            <div className="mt-8">
                                <p className="font-bold text-center mb-2 text-lg bg-gray-200 py-2 rounded-xl">
                                    Sample Test Case Result -
                                    {runResult.length > 0 ? (
                                        runResult.every(
                                            (res) => res?.verdict === "Accepted"
                                        ) ? (
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
                                        )
                                    ) : (
                                        <Chip
                                            label="Not Generated Yet"
                                            color="error"
                                            size="small"
                                            sx={{ marginLeft: "10px" }}
                                        />
                                    )}
                                </p>
                                {runResult.map((res, idx) => (
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            <div>
                                                <span>Test Case {idx + 1}</span>
                                                {res.verdict === "Accepted" ? (
                                                    <Chip
                                                        label={res.verdict}
                                                        color="success"
                                                        size="small"
                                                        sx={{
                                                            marginLeft: "15px",
                                                        }}
                                                    />
                                                ) : (
                                                    <Chip
                                                        label={res.verdict}
                                                        color="error"
                                                        size="small"
                                                        sx={{
                                                            marginLeft: "15px",
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div className="bg-gray-200 p-2">
                                                <p>Input</p>
                                                <pre>
                                                    <code>{res?.input}</code>
                                                </pre>
                                            </div>
                                            <div className="bg-gray-200 p-2">
                                                <p>Expected Output</p>
                                                <pre>
                                                    <code>{res?.output}</code>
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
                                ))}
                            </div>
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

export default ViewSingleProblem;
