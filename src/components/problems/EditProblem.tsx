import { Autocomplete, Box, Paper, Tab, Tabs, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import problemsService from "../../services/problemsService";
import tagService from "../../services/tagService";
import PreviewModal from "../../editor/PreviewModal";
import CustomToast from "../toast/CustomToast";
import CustomEditor from "../../editor/CustomEditor";
import useAuthStore from "../../store/auth";

const EditProblem = () => {
    const token = useAuthStore(state => state.userToken);
    const { id } = useParams();
    const userObject = useAuthStore((state) => state.userObject);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [type, setType] = useState<"success" | "error" | "info" | "warning">(
        "success"
    );

    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [statement, setStatement] = useState("");
    const [inputFormat, setInputFormat] = useState("");
    const [outputFormat, setOutputFormat] = useState("");
    const [constraints, setConstraints] = useState("");
    const [open, setOpen] = useState(false);
    const [previewText, setPreviewText] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [statementError, setStatementError] = useState(false);
    const [inputFormatError, setInputFormatError] = useState(false);
    const [outputFormatError, setOutputFormatError] = useState(false);
    const [constraintsError, setConstraintsError] = useState(false);
    const [tags, setTags] = useState([]);
    const [tagsError, setTagsError] = useState(false);
    const [allTags, setAllTags] = useState([]);
    const [newTag, setNewTag] = useState("");

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
        setIsLoadingUpdate(true);
        problemsService
            .updateProblemById(id, {
                title,
                difficulty,
                statement,
                inputFormat,
                outputFormat,
                constraints,
                tags: tags.map((tag) => tag.id),
            }, token)
            .then((res: any) => {
                setErrorMessage(res?.data?.message);
                setOpenToast(true);
                setType("success");
                setIsLoadingUpdate(false);
                getProblemData();
            })
            .catch((err: any) => {
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
                setIsLoadingUpdate(false);
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
    const getProblemData = ()=> {
        setIsLoading(true);
        problemsService
            .getProblemById(id, token)
            .then((res: any) => {
                const data = res?.data?.data;
                setTitle(data?.title);
                setDifficulty(data?.difficulty);
                setStatement(data?.statement);
                setInputFormat(data?.inputFormat);
                setOutputFormat(data?.outputFormat);
                setConstraints(data?.constraints);
                setTags(data?.tags)
                setIsLoading(false);
            })
            .catch((err: any) => {
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
                setIsLoading(false);
            });
    }
    useEffect(()=> {
        if(id) {
            getAllTags();
            getProblemData();
        }
    }, [id])

    return (
        <>
            {isLoading ? (
                <div className="w-full h-[100vh] flex justify-center items-center">
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            ) : (
                <div className="px-4 py-4">
                        <p
                            className="bg-teal-600 hover:bg-teal-700 text-white cursor-pointer text-md lg:text-xl font-bold text-center mb-8 py-1"
                            style={{ borderRadius: "10px" }}
                        >
                            Update Problem Details
                        </p>
                        <p className="badge text-xs lg:text-md bg-gray-600 text-white cursor-pointer font-semibold mb-2">
                            Problem Title
                        </p>
                        <input
                            type="text"
                            value={title}
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
                            value={difficulty}
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
                        <div className="mt-4 flex items-center flex-row">
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
                            value={tags}
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
                                disabled={isLoadingUpdate}
                                onClick={() => handleSubmit()}
                                className="btn btn-sm lg:btn-md mt-4 bg-teal-600 hover:bg-teal-700 text-white w-24"
                            >
                                {isLoadingUpdate ? (
                                    <span className="loading loading-dots"></span>
                                ) : (
                                    "UPDATE"
                                )}
                            </button>
                        </div>
                    </div>
            )}
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

export default EditProblem;
