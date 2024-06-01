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
import authService from "../../services/authService";

const ViewAllUsers = () => {
    const token = useAuthStore(state => state.userToken);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [allUsers, setAllUsers] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [type, setType] = useState<"success" | "error" | "info" | "warning">(
        "success"
    );

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmId, setConfirmId] = useState(null);
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

    const getAllUsers = () => {
        setIsLoading(true);
        authService
            .getAllUsers(page, limit, search, token)
            .then((res: any) => {
                setAllUsers(res?.data?.data);
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
    const updateActive = (userId: number, value: boolean) => {
        authService
            .updateActive({ userId, value: !value }, token)
            .then((res: any) => {
                setErrorMessage(res?.data?.message);
                setOpenToast(true);
                setType("success");
                getAllUsers();
            })
            .catch((err: any) => {
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
            });
    };
    useEffect(() => {
        getAllUsers();
    }, [search, page, limit]);
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
                        className="input input-bordered w-64 input-md"
                        value={debounceSearch}
                        onChange={(e) => handleSearch(e)}
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
                                                Username
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                Email
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                Email Verified
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                Active
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                Actions
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {allUsers.map((row) => (
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
                                                    {row?.username}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row?.email}
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
                                                    />
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Chip
                                                        size="small"
                                                        label={
                                                            row?.isActive
                                                                ? "Active"
                                                                : "Not Active"
                                                        }
                                                        color={
                                                            row?.isActive
                                                                ? "success"
                                                                : "error"
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Tooltip
                                                        title={
                                                            row?.isActive
                                                                ? "Deactivate User"
                                                                : "Activate User"
                                                        }
                                                    >
                                                        <IconButton
                                                            onClick={() => {
                                                                updateActive(
                                                                    row?.id,
                                                                    row?.isActive
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
                                                                <ClearIcon color="error" />
                                                            ) : (
                                                                <DoneIcon color="success" />
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
            <CustomToast
                type={type}
                message={errorMessage}
                open={openToast}
                setOpen={setOpenToast}
            />
        </>
    );
};

export default ViewAllUsers;
