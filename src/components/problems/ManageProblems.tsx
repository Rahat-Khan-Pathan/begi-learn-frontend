import {
    Autocomplete,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Tooltip,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import problemsService from "../../services/problemsService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import HideSourceIcon from "@mui/icons-material/HideSource";
import ConfirmDialog from "../modals/ConfirmDialog";
import CustomToast from "../toast/CustomToast";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import { debounce } from "lodash";
import tagService from "../../services/tagService";
import useAuthStore from "../../store/auth";

const ManageProblems = () => {
    const token = useAuthStore(state => state.userToken);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [allProblems, setAllProblems] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [type, setType] = useState<"success" | "error" | "info" | "warning">(
        "success"
    );

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmId, setConfirmId] = useState(null);
    const [allTags, setAllTags] = useState([]);
    const [tag, setTag] = useState({ id: null });
    const [search, setSearch] = useState("");
    const [debounceSearch, setDebounceSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage + 1);
        setDebounceSearch("");
    };

    const handleChangeRowsPerPage = (event: any) => {
        setLimit(+event.target.value);
        setDebounceSearch("");
        setPage(1);
        setDebounceSearch("");
    };
    const handleSearch = (e: any) => {
        setDebounceSearch(e.target.value);
    };

    const searchApi = () => {
        if (debounceSearch !== null) {
            setSearch(debounceSearch);
        }
    };
    const delayedQuery = useCallback(debounce(searchApi, 500), [
        debounceSearch,
    ]);
    useEffect(() => {
        delayedQuery();
        return delayedQuery.cancel;
    }, [debounceSearch, delayedQuery]);
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

    const getAllProblem = () => {
        setIsLoading(true);
        problemsService
            .getAllProblems(0, page, limit, search, tag?.id, token)
            .then((res: any) => {
                setAllProblems(res?.data?.data);
                setTotal(res?.data?.total);
                setIsLoading(false);
            })
            .catch((err: any) => {
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
                setIsLoading(false);
            });
    };
    const deleteProblem = () => {
        problemsService
            .deleteProblem(confirmId, token)
            .then((res: any) => {
                setErrorMessage(res?.data?.message);
                setOpenToast(true);
                setType("success");
                setConfirmOpen(false);
                getAllProblem();
            })
            .catch((err: any) => {
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
                setConfirmOpen(false);
            });
    };
    const updateVerification = (problemId: number, value: boolean) => {
        problemsService
            .updateVerification({ problemId, value: !value }, token)
            .then((res: any) => {
                setErrorMessage(res?.data?.message);
                setOpenToast(true);
                setType("success");
                getAllProblem();
            })
            .catch((err: any) => {
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
            });
    };
    useEffect(() => {
        getAllProblem();
    }, [search, tag, page, limit]);
    useEffect(() => {
        getAllTags();
    }, []);
    return (
        <>
            <div className="w-[90vw]">
                
                <div>
                    <div
                        className="text-sm lg:text-normal font-semibold breadcrumbs bg-[#F2F2F2] pt-4 pb-4 w-full"
                        style={{ position: "fixed", zIndex: 1000 }}
                    >
                        <ul>
                            <li></li>
                            <li>
                                <a onClick={() => navigate("/dashboard")}>
                                    Dashboard
                                </a>
                            </li>
                            <li>Manage Problems</li>
                        </ul>
                    </div>
                    <div className="mb-4 flex items-center pt-20 px-8">
                    <input
                        type="text"
                        placeholder="Search By Title"
                        className="input input-bordered md:w-64 w-32 md:input-md input-sm"
                        value={debounceSearch}
                        onChange={(e) => handleSearch(e)}
                    />
                    <Autocomplete
                        sx={{ width: 250, marginLeft: "10px" }}
                        size="small"
                        limitTags={5}
                        id="multiple-limit-tags"
                        options={allTags}
                        getOptionLabel={(option) => option.tagName}
                        onChange={(e, v) => {
                            if (v) setTag(v);
                            else setTag({ id: null });
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Select Tag"
                                size="small"
                            />
                        )}
                    />
                </div>
                    {isLoading ? (
                        <div className="w-full h-[100vh] flex justify-center items-center">
                            <span className="loading loading-dots loading-lg"></span>
                        </div>
                    ) : (
                        <div className="px-8">
                            <TableContainer component={Paper}>
                                <Table
                                    size="medium"
                                    sx={{ minWidth: 650 }}
                                    aria-label="simple table"
                                >
                                    <TableHead>
                                        <TableRow hover>
                                            <TableCell
                                                align="left"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                <p className="text-xs lg:text-md">Problem Title</p>
                                                
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                <p className="text-xs lg:text-md">Difficulty</p>
                                                
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                <p className="text-xs lg:text-md">Author</p>
                                                
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                <p className="text-xs lg:text-md">Verified</p>
                                                
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                <p className="text-xs lg:text-md">Actions</p>
                                                
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {allProblems.map((row) => (
                                            <TableRow
                                                hover
                                                key={row?.id}
                                                sx={{
                                                    "&:last-child td, &:last-child th":
                                                        { border: 0 },
                                                }}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    <p className="text-xs lg:text-md">{`${row?.id}. ${row.title}`}</p>
                                                    
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Chip
                                                        size="small"
                                                        label={row?.difficulty}
                                                        color={
                                                            row?.difficulty ===
                                                            "Easy"
                                                                ? "success"
                                                                : row?.difficulty ===
                                                                  "Medium"
                                                                ? "warning"
                                                                : "error"
                                                                
                                                        }
                                                        sx={{fontSize:"12px"}}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Chip
                                                        size="small"
                                                        label={
                                                            row?.creator
                                                                ?.username
                                                        }
                                                        sx={{fontSize:"12px"}}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Chip
                                                        size="small"
                                                        label={
                                                            row?.isVerified
                                                                ? "Verified"
                                                                : "Not Verified"
                                                        }
                                                        color={
                                                            row?.isVerified
                                                                ? "success"
                                                                : "error"
                                                        }
                                                        sx={{fontSize:"12px"}}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Tooltip title="Edit Problem">
                                                        <IconButton
                                                            onClick={() =>
                                                                navigate(
                                                                    `/dashboard/manage-problems/${row?.id}`
                                                                )
                                                            }
                                                            size="small"
                                                            aria-label="delete"
                                                        >
                                                            <EditIcon color="info" fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete Problem">
                                                        <IconButton
                                                            onClick={() => {
                                                                setConfirmOpen(
                                                                    true
                                                                );
                                                                setConfirmId(
                                                                    row?.id
                                                                );
                                                            }}
                                                            sx={{
                                                                marginLeft:
                                                                    "5px",
                                                            }}
                                                            size="small"
                                                            aria-label="delete"
                                                        >
                                                            <DeleteIcon color="error" fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip
                                                        title={
                                                            row?.isVerified
                                                                ? "Deny"
                                                                : "Verify"
                                                        }
                                                    >
                                                        <IconButton
                                                            onClick={() => {
                                                                updateVerification(
                                                                    row?.id,
                                                                    row?.isVerified
                                                                );
                                                            }}
                                                            sx={{
                                                                marginLeft:
                                                                    "5px",
                                                            }}
                                                            size="small"
                                                            aria-label="delete"
                                                        >
                                                            {row?.isVerified ? (
                                                                <ClearIcon color="error" fontSize="small" />
                                                            ) : (
                                                                <DoneIcon color="success" fontSize="small" />
                                                            )}
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                sx={{
                                    "& p": {
                                        m: 0,
                                    },
                                }}
                                className="mt-4"
                                rowsPerPageOptions={[5, 10, 25, 100]}
                                component="div"
                                count={total}
                                rowsPerPage={limit}
                                page={page - 1}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div>
                    )}
                </div>
            </div>
            <Dialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirmation Dialog"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure your want to delete this problem?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>Close</Button>
                    <Button onClick={() => deleteProblem()} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <CustomToast
                type={type}
                message={errorMessage}
                open={openToast}
                setOpen={setOpenToast}
            />
        </>
    );
};

export default ManageProblems;
