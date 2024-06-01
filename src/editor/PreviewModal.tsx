import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import katex from "katex";
import "katex/dist/katex.min.css";

interface IProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    text: string;
}
export default function PreviewModal({ open, setOpen, text }: IProps) {
    const handleClose = () => setOpen(false);
    const [newText, setNewText] = React.useState(text);

    React.useEffect(() => {
        const latexRegex = /\$([^$]+)\$/g;
        const text2 = text.replace(latexRegex, (match, p1) => {
            return katex.renderToString(p1, {
                throwOnError: false,
            });
        });
        setNewText(text2);
    }, [open]);
    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute" as "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: "16px",
                    }}
                    className="w-[300px] md:w-[500px] lg:w-[700px]"
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                            textAlign: "center",
                            marginBottom: "3rem",
                            fontWeight: "bold",
                        }}
                    >
                        Preview
                        <hr className="mt-1" />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div
                            className="ck-content"
                            id="preview2"
                            lang="en"
                            dir="ltr"
                            role="textbox"
                            dangerouslySetInnerHTML={{ __html: newText }}
                        ></div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
