import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Button onClick={() => navigate("/register")}>register</Button>
            <Button onClick={() => navigate("/login")}>login</Button>
            <Button onClick={() => navigate("/article")}>view articles</Button>
        </div>
    )
}

export default Home