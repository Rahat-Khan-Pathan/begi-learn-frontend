import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import problemsService from "../../services/problemsService";
import CustomToast from "../toast/CustomToast";
import {
    Autocomplete,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
} from "@mui/material";
import tagService from "../../services/tagService";
import { debounce } from "lodash";
import useAuthStore from "../../store/auth";
import authService from "../../services/authService";

const LeaderBoard = () => {
    const token = useAuthStore((state) => state.userToken);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [allUsers, setAllUsers] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [type, setType] = useState<"success" | "error" | "info" | "warning">(
        "success"
    );

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
            .getLeaderboard(page, limit, search, token)
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
    useEffect(() => {
        getAllUsers();
    }, [search, page, limit]);
    return (
        <>
            <div className="w-full h-[75vh] px-4 lg:px-16">
                <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Search By Title"
                        className="input input-bordered w-48 md:w-64 input-sm md:input-md"
                        value={debounceSearch}
                        onChange={(e) => handleSearch(e)}
                    />
                </div>
                <div>
                    {isLoading ? (
                        <div className="w-full h-[70vh] flex justify-center items-center">
                            <span className="loading loading-dots loading-lg"></span>
                        </div>
                    ) : (
                        <Paper elevation={2} sx={{ borderRadius: "15px" }}>
                            <TableContainer>
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
                                                <p className="text-xs lg:text-md">
                                                    Rank
                                                </p>
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                <p className="text-xs lg:text-md">
                                                    Username
                                                </p>
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                <p className="text-xs lg:text-md">
                                                    Problems Tried
                                                </p>
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                <p className="text-xs lg:text-md">
                                                    Problems Accepted
                                                </p>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {allUsers.map((row, idx) => (
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
                                                    <p className="text-xs lg:text-md">
                                                        {idx + 1}
                                                    </p>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Chip
                                                        size="small"
                                                        label={row?.username}
                                                        sx={{
                                                            fontSize: "12px",
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <p className="text-xs lg:text-md">
                                                    <Chip
                                                        size="small"
                                                        label={
                                                            row?.submission
                                                                ?.length
                                                        }
                                                        sx={{
                                                            fontSize: "12px",
                                                        }}
                                                        color="warning"
                                                    />
                                                        
                                                    </p>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <p className="text-xs lg:text-md">
                                                    <Chip
                                                        size="small"
                                                        label={
                                                            row?.submission?.filter(
                                                                (sb: any) =>
                                                                    sb?.result ===
                                                                    "Accepted"
                                                            )?.length
                                                        }
                                                        sx={{
                                                            fontSize: "12px",
                                                        }}
                                                        color="success"
                                                    />
                                                        
                                                    </p>
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
                        </Paper>
                    )}
                </div>
            </div>
            <CustomToast
                type={type}
                message={errorMessage}
                open={openToast}
                setOpen={setOpenToast}
            />
            <footer className="bg-gray-800 m-0 mt-12 text-white py-4">
                <div className="container mx-auto px-4 text-center">
                    <p>
                        &copy; {new Date().getFullYear()} BegiLearn. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </>
    );
};

export default LeaderBoard;
