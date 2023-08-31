import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import "./Article.css"
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import axios from 'axios';
import Modal from './Modal';
import { useAppState } from '../AppContext';

export default function Article({ article, flag, open, setOpen, setIsDeleted, createFlag, setCreateFlag }) {

    const navigate = useNavigate()

    const { userId } = useParams()
    const { user } = useAppState()

    const handleOpen = () => {
        setOpen(true);
    };



    async function handleDelete() {
        try {
            // Send DELETE request to the API
            const response = await axios.delete(`http://localhost:5000/api/v1/article/${article._id}`, {
                withCredentials: true,
            });

            setIsDeleted(true)

            // Check if the response indicates success
            if (response.status === 200) {
                console.log("Article deleted successfully");
                // You might want to update your UI or do other actions here
            } else {
                console.log("Failed to delete article");
                // Handle error cases if necessary
            }
        } catch (error) {
            console.error("Error deleting article:", error);
            // Handle error cases if necessary
        }
    }

    return (

        flag ? <Card sx={{ minHeight: "30vh", padding: "10px 7px", border: "1px solid grey", margin: "7px" }} >
            <CardActionArea>
                <CardContent>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {article.title}
                        </Typography>

                        {user._id == userId ? <div>
                            <EditIcon
                                bg={"green.500"}
                                _hover={{ bg: "green.400" }}
                                cursor={"pointer"}
                                fontSize="1.5rem"
                                p={"5px"}
                                onClick={handleOpen}
                            />
                            <DeleteIcon
                                bg={"red.500"}
                                cursor={"pointer"}
                                fontSize="1.5rem"
                                p={"5px"}
                                onClick={handleDelete}
                            ></DeleteIcon>

                            {open ? <Modal open={open} setOpen={setOpen} article={article} createFlag={createFlag} setCreateFlag={setCreateFlag} /> : null}

                        </div> : null}

                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                        <span style={{ color: "grey" }}>category: </span> {article?.category}
                    </Typography>
                </CardContent>
                <Typography marginY={"20px"} fontSize={"1rem"} marginX={"10px"} variant="body2" color="text.secondary">
                    {article?.content}
                </Typography>
            </CardActionArea>
        </Card > : <Card sx={{ width: "80vw", minHeight: "30vh", padding: "10px 7px", border: "1px solid grey", margin: "17px 7px" }} >
            <CardActionArea>
                <CardContent>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {article?.title}
                        </Typography>

                        <Button onClick={() => navigate(`/profile/${article?.author._id}`, { state: { article: article } })}>
                            <Typography className='username' gutterBottom variant="h5" component="div" fontWeight={500}>
                                {article?.author?.username}
                            </Typography>
                        </Button>
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                        <span style={{ color: "grey" }}>category: </span> {article?.category}
                    </Typography>

                </CardContent>
                <Typography marginY={"20px"} marginX={"10px"} fontSize={"1rem"} variant="body2" color="text.secondary">
                    {article?.content}
                </Typography>
            </CardActionArea>
        </Card >


    );
}