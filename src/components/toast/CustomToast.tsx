import { Alert, Snackbar } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

interface IProps {
    type: "success" | "error" | "info" | "warning";
    message: string;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}
const CustomToast = ({ type, message, open, setOpen }: IProps) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            key={"bottom" + "right"}
        >
            <Alert
                onClose={()=> setOpen(false)}
                severity={type}
                sx={{ width: "100%"}}
            >
                    
                {message || "Something went wrong. Please try again!"}
            </Alert>
        </Snackbar>
    );
};

export default CustomToast;
