import {
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CustomToast from "../toast/CustomToast";
import submissionsService from "../../services/submissionsService";
import { debounce } from "lodash";
import useAuthStore from "../../store/auth";

const AllSubmissions = () => {
    const token = useAuthStore(state => state.userToken);
    const [params, setParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [allSubmissions, setAllSubmissions] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState<null | string>(null);
    const [type, setType] = useState<"success" | "error" | "info" | "warning">(
        "success"
    );
    const [problemId, setProblemId] = useState("");
    useEffect(() => {
        setProblemId(params.get("problemId"));
    }, [params.get("problemId")]);

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
    const getAllSubmissions = () => {
        setIsLoading(true);
        submissionsService
            .getAllSubmissions(problemId, page, limit, search, token)
            .then((res: any) => {
                setAllSubmissions(res?.data?.data);
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
        getAllSubmissions();
    }, [problemId, search, page, limit]);
    return (
        <>
            <div className="w-full h-[75vh] px-4 lg:px-16">
                <p
                    className="bg-teal-600 hover:bg-teal-700 text-white cursor-pointer text-md lg:text-xl font-bold text-center mb-4 py-1"
                    style={{ borderRadius: "10px" }}
                >
                    All Submissions
                </p>
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
                                    size="small"
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
                                                <p className="text-xs lg:text-md">Tags</p>
                                                
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                <p className="text-xs lg:text-md">Submitted By</p>
                                                
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                <p className="text-xs lg:text-md">Submitted At</p>
                                                
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                <p className="text-xs lg:text-md">Language</p>
                                                
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                <p className="text-xs lg:text-md">Result</p>
                                                
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {allSubmissions.map((row) => (
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
                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/problems/${row?.problem?.id}`
                                                            )
                                                        }
                                                        className="btn btn-link btn-sm"
                                                    >
                                                        <p className="text-xs lg:text-md">{`${row?.problem?.id}. ${row?.problem?.title}`}</p>
                                                        </button>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Chip
                                                        size="small"
                                                        label={
                                                            row?.problem
                                                                ?.difficulty
                                                        }
                                                        color={
                                                            row?.problem.difficulty ===
                                                            "Easy"
                                                                ? "success"
                                                                : row?.problem?.difficulty ===
                                                                  "Medium"
                                                                ? "warning"
                                                                : "error"
                                                        }
                                                        sx={{fontSize:"12px"}}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row?.problem?.tags?.map(
                                                        (tag: any) => (
                                                            <Chip
                                                                size="small"
                                                                label={
                                                                    tag?.tagName
                                                                }
                                                                sx={{
                                                                    marginLeft:
                                                                        "5px",
                                                                        fontSize: "12px"
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Chip
                                                        size="small"
                                                        label={
                                                            row?.user?.username
                                                        }
                                                        sx={{fontSize:"12px"}}
                                                    />
                                                </TableCell>
                                                <TableCell align="left">
                                                <p className="text-xs lg:text-md">{new Date(
                                                        row?.createdAt
                                                    ).toLocaleString()}</p>
                                                    
                                                </TableCell>
                                                <TableCell align="left">
                                                <p className="text-xs lg:text-md">{row?.language}</p>
                                                    
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Chip
                                                        size="small"
                                                        label={row?.result}
                                                        color={
                                                            row?.result ===
                                                            "Accepted"
                                                                ? "success"
                                                                : "error"
                                                        }
                                                        sx={{fontSize:"12px"}}
                                                    />
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

export default AllSubmissions;
