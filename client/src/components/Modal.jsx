import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useAppState } from "../AppContext";

function Modal({ open, setOpen, article, createFlag, setCreateFlag }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const { setRefresh } = useAppState()


    const updateArticle = async () => {

        try {
            let data;
            if (title && content && category) {
                data = { title, content, category }
            } else if (title && category) {
                data = { title, category }

            } else if (title && content) {
                data = { title, content }

            } else if (content && category) {
                data = { category, content }

            } else if (title) {
                data = { title }

            } else if (category) {
                data = { category }

            } else if (content) {
                data = { content }
            }

            await axios.patch(`http://localhost:5000/api/v1/article/${article._id}`, data, {
                withCredentials: true
            })

            setOpen(false)
            setRefresh(Math.random() * 6000000);
        } catch (error) {
            console.log(error);
        }

    }

    const createArticle = async () => {
        try {
            if (title && content && category) {
                const data = { title, content, category }
                await axios.post("http://localhost:5000/api/v1/article", data, { withCredentials: true })
                console.log("article created");
                setOpen(false)
                setRefresh(Math.random() * 6000000);
            }
        } catch (error) {
            console.log(error);
        }
    }


    const handleClose = () => {
        setOpen(false);
        if (createFlag) {
            setCreateFlag(false)
        }
    };

    console.log(createFlag);

    return (
        createFlag ? <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Article</DialogTitle>
                <DialogContent>
                    <DialogContentText>Create the article details:</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Category"
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Content"
                        fullWidth
                        multiline
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={createArticle} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div> : <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Article</DialogTitle>
                <DialogContent>
                    <DialogContentText>Update the article details:</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Category"
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Content"
                        fullWidth
                        multiline
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateArticle} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Modal;
