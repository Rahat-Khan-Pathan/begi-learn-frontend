import { Box, Paper, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditProblem from "./EditProblem";
import ManageTestCases from "./ManageTestCases";

const ManageSingleProblem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = React.useState("one");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <>
            <div className="w-[90vw]">
                <div>
                    <div
                        className="text-sm lg:text-normal font-semibold breadcrumbs bg-[#F2F2F2] px-12 pt-4 pb-4 w-full"
                        style={{ position: "fixed", zIndex: 1000, top: 0 }}
                    >
                        <ul>
                            <li></li>
                            <li>
                                <a onClick={() => navigate("/dashboard")}>
                                    Dashboard
                                </a>
                            </li>
                            <li>Edit Problem</li>
                        </ul>
                    </div>
                    <Paper className="mx-8 mt-16" elevation={2} sx={{borderRadius: "15px"}}>
                        <Box sx={{ width: "100%" }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                sx={{
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: 'teal',
                                    },
                                    '& .MuiTab-root': {
                                        color: 'gray',
                                        fontWeight: "bold"
                                    },
                                    '& .Mui-selected': {
                                        color: 'teal', 
                                    },
                                }}
                                aria-label="secondary tabs example"
                            >
                                <Tab value="one" label="Update Problem Details" />
                                <Tab value="two" label="Manage Test Cases" />
                                <Tab value="three" label="Item Three" />
                            </Tabs>
                            {value === "one" ? <EditProblem /> : <ManageTestCases/>}
                        </Box>
                    </Paper>
                </div>
            </div>
        </>
    );
};

export default ManageSingleProblem;
