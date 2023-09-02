import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "./bg/signin.svg";
import bgimg from "./bg/backimg.jpg";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { useAppState } from "../AppContext";
import { toast } from "react-hot-toast";


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const boxstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    height: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
};

const center = {
    position: "relative",
    top: "50%",
    left: "37%",
};

export default function Login() {
    const [open, setOpen] = useState(false);
    const [remember, setRemember] = useState(false);
    const vertical = "top";
    const horizontal = "right";
    const navigate = useNavigate();

    const { user, setUser } = useAppState()

    const [formData, setFormData] = useState({
        "username": "",
        "password": ""
    })

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (e) => {

        try {

            e.preventDefault();


            const { data } = await axios.post('http://localhost:5000/api/v1/auth/login', formData)

            setUser(data?.user)

            Cookies.set("token", data.token, { expires: 7 }); // Cookie expires in 7 days

            navigate("/article")
            setOpen(true);
        } catch (error) {
            return toast.error("User Not Exist!.", {
                style: {
                    padding: "16px",
                    animationDuration: "2s",
                },
            });
        }


    };


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    function TransitionLeft(props) {
        return <Slide {...props} direction="left" />;
    }

    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                TransitionComponent={TransitionLeft}
                anchorOrigin={{ vertical, horizontal }}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                    You have successfully logged in!
                </Alert>
            </Snackbar>
            <div
                style={{
                    backgroundImage: `url(${bgimg})`,
                    backgroundSize: "cover",
                    height: "100vh",
                    color: "#f5f5f5",
                }}
            >
                <Box sx={boxstyle}>
                    <Grid container>
                        <Grid item xs={12} sm={12} lg={6}>
                            <Box
                                style={{
                                    backgroundImage: `url(${bg})`,
                                    backgroundSize: "cover",
                                    marginTop: "40px",
                                    marginLeft: "15px",
                                    marginRight: "15px",
                                    height: "63vh",
                                    color: "#f5f5f5",
                                }}
                            ></Box>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                            <Box
                                style={{
                                    backgroundSize: "cover",
                                    height: "70vh",
                                    minHeight: "500px",
                                    backgroundColor: "#3b33d5",
                                }}
                            >
                                <ThemeProvider theme={darkTheme}>
                                    <Container>
                                        <Box height={35} />
                                        <Box sx={center}>
                                            <Avatar
                                                sx={{ ml: "35px", mb: "4px", bgcolor: "#ffffff" }}
                                            >
                                                <LockOutlinedIcon />
                                            </Avatar>
                                            <Typography component="h1" variant="h4">
                                                Sign In
                                            </Typography>
                                        </Box>
                                        <Box sx={{ mt: 2 }} />
                                        <form onSubmit={(e) => onSubmit(e)}>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                                                    <TextField
                                                        {...register("email", { required: true })}
                                                        fullWidth
                                                        id="email"
                                                        label="Username"
                                                        name="email"
                                                        autoComplete="email"
                                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                    />
                                                    {errors.email && (
                                                        <span
                                                            style={{ color: "#f7d643", fontSize: "12px" }}
                                                        >
                                                            This field is required
                                                        </span>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                                                    <TextField
                                                        fullWidth
                                                        {...register("password", { required: true })}
                                                        name="password"
                                                        label="Password"
                                                        type="password"
                                                        id="password"
                                                        autoComplete="new-password"
                                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    />
                                                    {errors.password && (
                                                        <span
                                                            style={{ color: "#f7d643", fontSize: "12px" }}
                                                        >
                                                            This field is required
                                                        </span>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                                                    <Stack direction="row" spacing={2}>
                                                        <FormControlLabel
                                                            sx={{ width: "60%" }}
                                                            onClick={() => setRemember(!remember)}
                                                            control={<Checkbox checked={remember} />}
                                                            label="Remember me"
                                                        />
                                                        <Typography
                                                            variant="body1"
                                                            component="span"
                                                            onClick={() => {
                                                                navigate("/reset-password");
                                                            }}
                                                            style={{ marginTop: "10px", cursor: "pointer" }}
                                                        >
                                                            Forgot password?
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        fullWidth={true}
                                                        size="large"
                                                        sx={{
                                                            mt: "10px",
                                                            mr: "20px",
                                                            borderRadius: 28,
                                                            color: "#ffffff",
                                                            minWidth: "170px",
                                                            backgroundColor: "#FF9A01",
                                                        }}
                                                    >
                                                        Sign in
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                                                    <Stack direction="row" spacing={2}>
                                                        <Typography
                                                            variant="body1"
                                                            component="span"
                                                            style={{ marginTop: "10px" }}
                                                        >
                                                            Not registered yet?{" "}
                                                            <span
                                                                style={{
                                                                    color: "#beb4fb",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => {
                                                                    navigate("/register");
                                                                }}
                                                            >
                                                                Create an Account
                                                            </span>
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Container>
                                </ThemeProvider>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    );
}
