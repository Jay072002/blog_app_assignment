import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useActionData, useLocation, useParams } from 'react-router-dom';
import Article from '../components/Article';
import "./userprofile.css"
import { Button } from '@mui/material';
import Modal from '../components/Modal';
import { useAppState } from '../AppContext';

const UserProfile = () => {

    const location = useLocation()

    const [open, setOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false)
    const article = location.state?.article;

    const { user, refresh } = useAppState()
    const [createFlag, setCreateFlag] = useState(false)
    const { userId } = useParams()


    const [userArticles, setUserArticles] = useState([]);

    const fetchUserArticles = async () => {
        try {
            const data = await axios.get(`http://localhost:5000/api/v1/article/user/${userId}`)
            return data?.data?.data

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {

        if (isDeleted) {
            setIsDeleted(false)
        }
        fetchUserArticles().then(data => {
            setUserArticles(data);
        }).catch(error => console.log(error))
    }, [open, isDeleted, refresh])

    const handleCreateArticle = () => {
        setCreateFlag(true);
        setOpen(true)
    }


    return (
        <>
            <div style={{ fontWeight: 700, textAlign: "center", fontSize: "20px", letterSpacing: "2px" }}>Author : {article?.author?.username ?? user.username}</div>

            {userArticles.length > 0 ? <div className='userArticle'>
                {userArticles?.map((article, index) => {
                    return <Article article={article} flag={true} key={index} open={open} setOpen={setOpen} setIsDeleted={setIsDeleted} createFlag={false} setCreateFlag={false} />
                })}
            </div> : <div style={{ display: "flex", justifyContent: "center", "alignItems": "center", height: "90vh", fontWeight: "bold", fontSize: "3rem", letterSpacing: "2px", flexDirection: "column" }}>
                <div>No Articles Posted..!</div>
                <Button style={{ margin: "10px 0", fontSize: "1.1rem" }} onClick={() => handleCreateArticle()}>Create Article <span style={{ fontSize: "2rem", margin: "0 6px" }}>+</span></Button >
            </div>}

            {createFlag ? <Modal open={open} setOpen={setOpen} article={null} createFlag={createFlag} setCreateFlag={setCreateFlag} /> : null}

        </>
    )
}

export default UserProfile