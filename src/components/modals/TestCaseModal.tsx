import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import testCaseService from "../../services/testCaseService";
import { useParams } from "react-router-dom";
import CustomToast from "../toast/CustomToast";
import useAuthStore from "../../store/auth";
interface IProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    editable?: {input: string, output: string,id?: number,sample: boolean, problemId: number} | null;
    getTestCases: ()=> void;
}
const TestCaseModal = ({ open, setOpen, editable, getTestCases }: IProps) => {
    const token = useAuthStore(state => state.userToken);
    const { id } = useParams();
    const handleClose = () => setOpen(false);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [sample, setSample] = useState(false);
    const [testCaseId, setTestCaseId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [type, setType] = useState<"success" | "error" | "info" | "warning">(
        "success"
    );
    const handleSubmit = ()=> {
        testCaseService
            .addTestCase({input, output, sample, problemId: parseInt(id)}, token)
            .then((res: any) => {
                setErrorMessage(res?.data?.message);
                setOpenToast(true);
                setType("success");
                setIsLoading(false);
                setOpen(false);
                getTestCases();
            })
            .catch((err: any) => {
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
                setIsLoading(false);
            });
    }
    const handleUpdate = ()=> {
        testCaseService
            .updateTestCase(testCaseId,{input, output, sample}, token)
            .then((res: any) => {
                setErrorMessage(res?.data?.message);
                setOpenToast(true);
                setType("success");
                setIsLoading(false);
                setOpen(false);
                getTestCases();
            })
            .catch((err: any) => {
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
                setIsLoading(false);
            });
    }
    useEffect(()=> {
        if(editable) {
            setInput(editable.input);
            setOutput(editable.output);
            setSample(editable.sample);
            setTestCaseId(editable.id);
        } else {
            setInput("");
            setOutput("");
            setSample(false);
            setTestCaseId(null);
        }
    }, [open])
    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute" as "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: "16px",
                    }}
                    className="w-[300px] md:w-[500px] lg:w-[700px]"
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                    >
                        {editable ? "Update Test Case" : "Add Test Case"}
                        <hr className="mt-1" />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 4 }}>
                        <p className="text-md font-light ms-1">Input</p>
                        <textarea
                            className="textarea textarea-bordered w-full h-[100px]"
                            placeholder="Input"
                            value={input}
                            onChange={(e)=> setInput(e.target.value)}
                        ></textarea>
                        <p className="text-md font-light ms-1 mt-4">Output</p>
                        <textarea
                            className="textarea textarea-bordered w-full h-[100px]"
                            placeholder="Output"
                            value={output}
                            onChange={(e)=> setOutput(e.target.value)}
                        ></textarea>
                        <div className="flex items-center mt-4">
                            <span className="me-2">Sample Test Case</span>
                            <input
                                checked={sample}
                                onChange={(e) => setSample(e.target.checked)}
                                type="checkbox"
                                className="checkbox checkbox-sm checkbox-info"
                            />
                        </div>
                    </Typography>
                    <div className="w-full flex justify-end">
                        <button
                            disabled={isLoading}
                            onClick={() => editable ?  handleUpdate() : handleSubmit()}
                            className="btn btn-sm lg:btn-md mt-4 bg-teal-600 hover:bg-teal-700 text-white w-24"
                        >
                            {isLoading ? (
                                <span className="loading loading-dots"></span>
                            ) : (
                                editable ? "UPDATE" : "ADD"
                            )}
                        </button>
                    </div>
                </Box>
            </Modal>
            <CustomToast
                type={type}
                message={errorMessage}
                open={openToast}
                setOpen={setOpenToast}
            />
        </div>
    );
};

export default TestCaseModal;
