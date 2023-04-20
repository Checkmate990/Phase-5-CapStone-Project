import  React,{useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Forgot from "./forgot";
import SignUp from "./signUp";
import { useNavigate } from "react-router-dom";

export default function Login({open,setOpen,BaseUrl}) {
  const naviate=useNavigate()
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [login, setLogin] = useState({
    email: "admin@touraments.com",
    password: "greaterthaneight",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = (e)=>{
    setLogin({...login,[e.target.name]:e.target.value})
  }
 
const saveLogin = () =>{
 
  fetch(`${BaseUrl}users/auth/login`, {
    method: "post",
     headers: { "Content-Type": "application/json" },
    body: JSON.stringify(login)
    })
.then(function(response) {
    if(response.ok){
        return response.json();
    }{
        throw new Error("Post Failed")
    }
}).then(function(res){
  localStorage.setItem("token",res.data.auth_token)
  localStorage.setItem("userName",res.data.firstname)
  
  handleClose()
})
.catch(function(error) {
    console.log("Request failed", error);
});
}
const handleLogOut = () =>{
  localStorage.clear()
  naviate("/")
}
  return (
    <div>
      {localStorage.getItem("token")? <button
        href="#"
        variant="body2"
        onClick={handleLogOut}
        className=" bg-gradient-to-r from-blue to-dark py-5 px-7 text-[15px]  text-white "
        style={{
          borderTopLeftRadius: "80px",
          borderBottomRightRadius: "80px",
        }}
      >
         Log out
      </button>: <button
        href="#"
        variant="body2"
        onClick={handleClickOpen}
        className=" bg-gradient-to-r from-blue to-dark py-5 px-7 text-[15px]  text-white "
        style={{
          borderTopLeftRadius: "80px",
          borderBottomRightRadius: "80px",
        }}
      >
        Sign in
      </button>}
    

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box
                    component="form"
                    // onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="email"
                      value={login.email}
                      onChange={handleLogin}
                      id="email"
                      label="Email Address"
                    
                      autoComplete="email"
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={login.password}
                      onChange={handleLogin}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                  </Box>
                  <Button
                    onClick={saveLogin}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Forgot />
                    </Grid>
                    <Grid item>
                      <SignUp setOpen1={setOpen} BaseUrl={BaseUrl}/>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </ThemeProvider>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
