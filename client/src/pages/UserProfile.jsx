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


    return (
        <>
            <div style={{ fontWeight: 700, textAlign: "center", fontSize: "20px", letterSpacing: "2px" }}>Author : {article?.author?.username ?? user.username}</div>

            {userArticles.length > 0 ? <div className='userArticle'>
                {userArticles?.map((article, index) => {
                    return <Article article={article} flag={true} key={index} open={open} setOpen={setOpen} setIsDeleted={setIsDeleted} createFlag={false} setCreateFlag={false} />
                })}
            </div> : <div style={{ display: "flex", justifyContent: "center", "alignItems": "center", height: "90vh", fontWeight: "bold", fontSize: "3rem", letterSpacing: "2px" }}>No Articles Posted..!</div>}


        </>
    )
}

export default UserProfile