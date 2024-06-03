import React, { useEffect, useState } from "react";
import CustomEditor from "../../editor/CustomEditor";
import { useNavigate } from "react-router-dom";
import PreviewModal from "../../editor/PreviewModal";
import CustomToast from "../toast/CustomToast";
import { Autocomplete, Chip, Paper, TableContainer, TextField } from "@mui/material";
import tagService from "../../services/tagService";
import problemsService from "../../services/problemsService";
import useAuthStore from "../../store/auth";
const AddProblem = () => {
    const token = useAuthStore(state => state.userToken);
    const userObject = useAuthStore((state) => state.userObject);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [statement, setStatement] = useState("");
    const [inputFormat, setInputFormat] = useState("");
    const [outputFormat, setOutputFormat] = useState("");
    const [constraints, setConstraints] = useState("");
    const [open, setOpen] = useState(false);
    const [previewText, setPreviewText] = useState("");
    const [openToast, setOpenToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [type, setType] = useState<"success" | "error" | "info" | "warning">(
        "success"
    );
    const [titleError, setTitleError] = useState(false);
    const [statementError, setStatementError] = useState(false);
    const [inputFormatError, setInputFormatError] = useState(false);
    const [outputFormatError, setOutputFormatError] = useState(false);
    const [constraintsError, setConstraintsError] = useState(false);

    const [allTags, setAllTags] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagsError, setTagsError] = useState(false);

    const [newTag, setNewTag] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        if (!title) {
            setOpenToast(true);
            setErrorMessage("Problem Title Can't be Empty!");
            setType("error");
            setTitleError(true);
            return;
        }
        if (!statement) {
            setOpenToast(true);
            setErrorMessage("Problem Statement Can't be Empty!");
            setType("error");
            setStatementError(true);
            return;
        }
        if (!inputFormat) {
            setOpenToast(true);
            setErrorMessage("Input Format Can't be Empty!");
            setType("error");
            setInputFormatError(true);
            return;
        }
        if (!outputFormat) {
            setOpenToast(true);
            setErrorMessage("Output Format Can't be Empty!");
            setType("error");
            setOutputFormatError(true);
            return;
        }
        if (!constraints) {
            setOpenToast(true);
            setErrorMessage("Constraints Can't be Empty!");
            setType("error");
            setConstraintsError(true);
            return;
        }
        if (tags.length === 0) {
            setOpenToast(true);
            setErrorMessage("Problem Tags Can't be Empty!");
            setType("error");
            setTagsError(true);
            return;
        }
        setIsLoading(true);
        problemsService
            .addProblem({
                title,
                difficulty,
                statement,
                inputFormat,
                outputFormat,
                constraints,
                tags: tags.map((tag) => tag.id),
                creatorId: userObject.id,
            }, token)
            .then((res: any) => {
                setErrorMessage(res?.data?.message);
                setOpenToast(true);
                setType("success");
                setIsLoading(false);
                navigate(`/dashboard/manage-problems/${res?.data?.problemId}`);
                window.location.reload();
            })
            .catch((err: any) => {
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
                setIsLoading(false);
            });
    };
    const getAllTags = () => {
        tagService
            .getAllTags(token)
            .then((res: any) => {
                setAllTags(res?.data?.data);
            })
            .catch((err: any) => {
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
            });
    };
    const handleAddNewTag = () => {
        tagService
            .addTag({ tagName: newTag }, token)
            .then((res: any) => {
                getAllTags();
                setErrorMessage(res?.data?.message);
                setOpenToast(true);
                setType("success");
                setNewTag("");
            })
            .catch((err: any) => {
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
            });
    };
    useEffect(() => {
        getAllTags();
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
                                <a onClick={() => navigate("/dashboard")}>
                                    Dashboard
                                </a>
                            </li>
                            <li>Create New Problem</li>
                        </ul>
                    </div>

                    <Paper className="sm:mx-8 mx-2 px-4 mt-8 py-4" elevation={2} sx={{borderRadius: "15px"}}>
                        <p
                            className="bg-teal-600 hover:bg-teal-700 text-white cursor-pointer text-md lg:text-xl font-bold text-center mb-8 py-1"
                            style={{ borderRadius: "10px" }}
                        >
                            Create New Problem
                        </p>
                        <p className="badge text-xs lg:text-md bg-gray-600 text-white cursor-pointer font-semibold mb-2">
                            Problem Title
                        </p>
                        <input
                            type="text"
                            placeholder="Enter Title"
                            className={`input input-bordered w-full ${
                                titleError ? "input-error" : ""
                            }`}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                if (e.target.value) {
                                    setTitleError(false);
                                }
                            }}
                        />
                        <p className="badge text-xs lg:text-md bg-gray-600 text-white cursor-pointer font-semibold mb-2 mt-4">
                            Problem Difficulty
                        </p>
                        <select
                            className="select select-bordered w-full"
                            style={{ display: "block", fontSize: "1rem" }}
                            onChange={(e) => setDifficulty(e.target.value)}
                        >
                            <option selected>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                        <div className="w-full flex items-center">
                            <p className="badge text-xs lg:text-md bg-gray-600 text-white cursor-pointer font-semibold mb-2 mt-4">
                                Problem Statetment
                            </p>
                            <button
                                onClick={() => {
                                    setOpen(true);
                                    setPreviewText(statement);
                                }}
                                className="btn btn-xs ms-auto"
                            >
                                Preview
                            </button>
                        </div>
                        <CustomEditor
                            error={statementError}
                            setError={setStatementError}
                            text={statement}
                            setText={setStatement}
                        />
                        <div className="w-full flex items-center">
                            <p className="badge text-xs lg:text-md bg-gray-600 text-white cursor-pointer font-semibold mb-2 mt-4">
                                Input Format
                            </p>
                            <button
                                onClick={() => {
                                    setOpen(true);
                                    setPreviewText(inputFormat);
                                }}
                                className="btn btn-xs ms-auto"
                            >
                                Preview
                            </button>
                        </div>
                        <CustomEditor
                            error={inputFormatError}
                            setError={setInputFormatError}
                            text={inputFormat}
                            setText={setInputFormat}
                        />
                        <div className="w-full flex items-center">
                            <p className="badge text-xs lg:text-md bg-gray-600 text-white cursor-pointer font-semibold mb-2 mt-4">
                                Output Format
                            </p>
                            <button
                                onClick={() => {
                                    setOpen(true);
                                    setPreviewText(outputFormat);
                                }}
                                className="btn btn-xs ms-auto"
                            >
                                Preview
                            </button>
                        </div>
                        <CustomEditor
                            error={outputFormatError}
                            setError={setOutputFormatError}
                            text={outputFormat}
                            setText={setOutputFormat}
                        />
                        <div className="w-full flex items-center">
                            <p className="badge text-xs lg:text-md bg-gray-600 text-white cursor-pointer font-semibold mb-2 mt-4">
                                Constraints
                            </p>
                            <button
                                onClick={() => {
                                    setOpen(true);
                                    setPreviewText(constraints);
                                }}
                                className="btn btn-xs ms-auto"
                            >
                                Preview
                            </button>
                        </div>
                        <CustomEditor
                            error={constraintsError}
                            setError={setConstraintsError}
                            text={constraints}
                            setText={setConstraints}
                        />
                        <div className="mt-4 flex items-center md:flex-row flex-col">
                            <span className="text-xs lg:text-md font-semibold mb-2 mt-4">
                                No tag found? Insert a tag here and try again
                            </span>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter Tag"
                                    className="input input-bordered md:ms-4 input-sm lg:input-md"
                                    value={newTag}
                                    onChange={(e) => {
                                        setNewTag(e.target.value);
                                    }}
                                />
                                <button
                                    disabled={!newTag}
                                    onClick={() => handleAddNewTag()}
                                    className="btn btn-sm lg:btn-md mt-4 bg-teal-600 hover:bg-teal-700 text-white ms-1"
                                >
                                    Insert
                                </button>
                            </div>
                        </div>
                        <div className="w-full flex items-center">
                            <p className="badge text-xs lg:text-md bg-gray-600 text-white cursor-pointer font-semibold mb-2 mt-4">
                                Problem Tags
                            </p>
                        </div>
                        <Autocomplete
                            multiple
                            limitTags={5}
                            id="multiple-limit-tags"
                            options={allTags}
                            getOptionLabel={(option) => option.tagName}
                            onChange={(e, v) => {
                                setTags(v);
                                if (v.length) {
                                    setTagsError(false);
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Select tags"
                                    size="medium"
                                    error={tagsError}
                                />
                            )}
                            className="w-full"
                        />

                        <div className="w-full flex justify-end">
                            <button
                                disabled={isLoading}
                                onClick={() => handleSubmit()}
                                className="btn btn-sm lg:btn-md mt-4 bg-teal-600 hover:bg-teal-700 text-white w-24"
                            >
                                {isLoading ? (
                                    <span className="loading loading-dots"></span>
                                ) : (
                                    "SUBMIT"
                                )}
                            </button>
                        </div>
                    </Paper>
                </div>
            </div>
            <PreviewModal open={open} setOpen={setOpen} text={previewText} />
            <CustomToast
                type={type}
                message={errorMessage}
                open={openToast}
                setOpen={setOpenToast}
            />
        </>
    );
};

export default AddProblem;
