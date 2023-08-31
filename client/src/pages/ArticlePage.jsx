import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Article from '../components/Article';
import './articlePage.css'
import Modal from '../components/Modal';
import { Button } from '@mui/material';
import { BiUserCircle } from 'react-icons/bi'

import { useAppState } from '../AppContext';
import { useNavigate } from 'react-router-dom';


const ArticlePage = () => {


    const { user, refresh } = useAppState()
    const [createFlag, setCreateFlag] = useState(false)
    const [open, setOpen] = useState(false);
    const [articles, setArticles] = useState([]);


    const navigate = useNavigate()

    const fetchArticles = async () => {

        try {
            const data = await axios.get("http://localhost:5000/api/v1/article")
            return data?.data?.data;
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        fetchArticles().then(data => {
            setArticles(data)
        }).catch((error) => {
            console.log(error);
        })

    }, [refresh])

    console.log("articles", articles);

    const handleCreateArticle = () => {
        setCreateFlag(true);
        setOpen(true)
    }

    console.log("user", user);

    return (
        <div className='container'>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90%" }}>
                <Button style={{ margin: "10px 0", fontSize: "1.1rem" }} onClick={() => handleCreateArticle()}>Create Article <span style={{ fontSize: "2rem", margin: "0 6px" }}>+</span></Button >
                <div style={{ fontSize: "1.5rem" }}>All Articles</div>
                <BiUserCircle fontSize={"2.5rem"} cursor={"pointer"} onClick={() => {
                    navigate(`/profile/${user?._id}`)
                }} />
            </div>

            {createFlag ? <Modal open={open} setOpen={setOpen} article={null} createFlag={createFlag} setCreateFlag={setCreateFlag} /> : null}
            {/* <SearchInput /> */}
            {articles?.map((article, index) => {
                console.log(article);
                return <Article article={article} flag={false} key={index} createFlag={createFlag} setCreateFlag={setCreateFlag} />
            })}
        </div>
    )
}

export default ArticlePage