import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import problemsService from "../../services/problemsService";
import tagService from "../../services/tagService";
import PreviewModal from "../../editor/PreviewModal";
import CustomToast from "../toast/CustomToast";
import CustomEditor from "../../editor/CustomEditor";
import useAuthStore from "../../store/auth";
import TestCaseModal from "../modals/TestCaseModal";
import testCaseService from "../../services/testCaseService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../modals/ConfirmDialog";

const ManageTestCases = () => {
    const token = useAuthStore(state => state.userToken);
    const { id } = useParams();
    const encoder = new TextEncoder();
    const userObject = useAuthStore((state) => state.userObject);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [type, setType] = useState<"success" | "error" | "info" | "warning">(
        "success"
    );
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmId, setConfirmId] = useState();
    const [allTestCases, setAllTestCases] = useState([]);
    const [editable, setEditable] = useState<{
        input: string;
        output: string;
        id?: number;
        sample: boolean;
        problemId: number;
    } | null>(null);

    const getTestCases = () => {
        setIsLoading(true);
        testCaseService
            .getTestCaseByProblemId(id, token)
            .then((res: any) => {
                setAllTestCases(res?.data?.data);
                setIsLoading(false);
            })
            .catch((err: any) => {
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
                setIsLoading(false);
            });
    };
    const deleteTestCase = () => {
        testCaseService
            .deleteTestCase(confirmId, token)
            .then((res: any) => {
                setErrorMessage(res?.data?.message);
                setOpenToast(true);
                setType("success");
                getTestCases();
                setConfirmOpen(false);
            })
            .catch((err: any) => {
                setErrorMessage(err?.response?.data?.message);
                setOpenToast(true);
                setType("error");
                setConfirmOpen(false);
            });
    };
    useEffect(() => {
        getTestCases();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="w-full h-[80vh] flex justify-center items-center">
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            ) : (
                <div className="px-4 py-4">
                    <p
                        className="bg-teal-600 hover:bg-teal-700 text-white cursor-pointer text-md lg:text-xl font-bold text-center py-1"
                        style={{ borderRadius: "10px" }}
                    >
                        Manage Test Cases
                    </p>
                    <div className="w-full flex justify-end">
                        <button
                            onClick={() => {
                                setEditable(null);
                                setOpen(true);
                            }}
                            className="btn btn-sm mt-4 bg-teal-600 hover:bg-teal-700 text-white w-48"
                        >
                            ADD NEW TEST CASE
                        </button>
                    </div>
                    <div className="mt-8">
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
                                            Test Case Number
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            Input File Size
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            Output File Size
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            Sample
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
                                    {allTestCases.map((row, idx) => (
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
                                                {idx}
                                            </TableCell>
                                            <TableCell align="left">
                                                {
                                                    encoder.encode(row?.input)
                                                        .length
                                                }{" "}
                                                bytes
                                            </TableCell>
                                            <TableCell align="left">
                                                {
                                                    encoder.encode(row?.output)
                                                        .length
                                                }{" "}
                                                bytes
                                            </TableCell>
                                            <TableCell align="left">
                                                <input
                                                    checked={row?.sample}
                                                    type="checkbox"
                                                    className="checkbox checkbox-sm checkbox-info"
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Tooltip title="Edit Test Case">
                                                    <IconButton
                                                        onClick={() => {
                                                            setEditable(row);
                                                            setOpen(true);
                                                        }}
                                                        size="small"
                                                        aria-label="delete"
                                                    >
                                                        <EditIcon color="info" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete Test Case">
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
                                                            marginLeft: "5px",
                                                        }}
                                                        size="small"
                                                        aria-label="delete"
                                                    >
                                                        <DeleteIcon color="error" />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            )}
            <CustomToast
                type={type}
                message={errorMessage}
                open={openToast}
                setOpen={setOpenToast}
            />
            <Dialog
        open={confirmOpen}
        onClose={()=> setConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirmation Dialog"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure your want to delete this test case?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setConfirmOpen(false)}>Close</Button>
          <Button onClick={()=> deleteTestCase()} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
            <TestCaseModal
                open={open}
                setOpen={setOpen}
                getTestCases={getTestCases}
                editable={editable}
            />
        </>
    );
};

export default ManageTestCases;
