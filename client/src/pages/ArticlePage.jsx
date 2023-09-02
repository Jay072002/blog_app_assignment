import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Article from '../components/Article';
import './articlePage.css'
import Modal from '../components/Modal';
import { Button } from '@mui/material';
import { BiUserCircle } from 'react-icons/bi'

import { useAppState } from '../AppContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';


const ArticlePage = () => {


    const { user, refresh, setIsLogin } = useAppState()
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


    const handleCreateArticle = () => {
        setCreateFlag(true);
        setOpen(true)
    }

    const handlelogout = () => {

        Cookies.remove('token');
        setIsLogin(false);
        navigate("/login")

        return toast.success("logout success!", {
            style: {
                padding: "16px",
                animationDuration: "2s",
            },
        });
    }


    return (
        <div className='container'>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "90%" }}>
                <Button style={{ margin: "10px 0", fontSize: "1.1rem" }} onClick={() => handleCreateArticle()}>Create Article <span style={{ fontSize: "2rem", margin: "0 6px" }}>+</span></Button >
                <div style={{ fontSize: "1.5rem" }}>All Articles</div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <BiUserCircle fontSize={"2.5rem"} cursor={"pointer"} size={"3.2rem"} onClick={() => {
                        navigate(`/profile/${user?._id}`)
                    }} />
                    <button onClick={handlelogout} style={{ background: "#4867aa", padding: "6px 10px", margin: "0 1rem", fontSize: "1.3rem", cursor: "pointer", color: "#ffffff", borderRadius: "6px" }}>logout</button>
                </div>
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