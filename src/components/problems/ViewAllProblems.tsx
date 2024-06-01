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

const ViewAllProblems = () => {
    const token = useAuthStore(state => state.userToken);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [allProblems, setAllProblems] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [type, setType] = useState<"success" | "error" | "info" | "warning">(
        "success"
    );
    const [allTags, setAllTags] = useState([]);
    const [tag, setTag] = useState({id: null});
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
            .getAllProblems(1,page, limit,search,tag?.id, token)
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
    useEffect(()=>{
        getAllProblem();
    },[search, tag, page, limit])
    useEffect(() => {
        getAllTags();
    }, []);
    return (
        <>
            <div className="w-full h-[75vh] px-4 lg:px-16">
                <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Search By Title"
                        className="input input-bordered w-32 md:w-64 md:input-md input-sm"
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
                            if(v) setTag(v);
                            else setTag({id: null});
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
                                                sx={{ fontWeight: "bold", }}
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
                                                <p className="text-xs lg:text-md">Total Submissions</p>
                                                
                                            </TableCell>
                                            <TableCell
                                                align="left"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                <p className="text-xs lg:text-md">Accepted</p>
                                                
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                <p className="text-xs lg:text-md">Tags</p>
                                                
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
                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/problems/${row?.id}`
                                                            )
                                                        }
                                                        className="btn btn-link btn-sm"
                                                    ><p className="text-xs lg:text-md">{`${row?.id}. ${row.title}`}</p></button>
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
                                                        sx={{fontSize: "12px"}}
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
                                                <p className="text-xs lg:text-md">{row?.submission?.length}</p>
                                                </TableCell>
                                                <TableCell align="left">
                                                <p className="text-xs lg:text-md">{(row?.submission?.filter((sb:any) => sb?.result === "Accepted"))?.length}</p>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row?.tags?.map(
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

export default ViewAllProblems;
