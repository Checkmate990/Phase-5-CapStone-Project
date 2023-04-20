import * as React from "react";
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
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Forgot from "./forgot";
import Login from "./login";

export default function SignUp({setOpen1,BaseUrl}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [formData, setFormData] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });



  const handleInput = (event) => {
    console.log("even",event.target.value,event.target.name)
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const register = ( ) =>{
    console.log("formData",formData)
    fetch(`${BaseUrl}users/auth/register`, {
      method: "post",
       headers: { "Content-Type": "application/json" ,
      },
      body: JSON.stringify(formData)
      })
  .then(function(response) {
      if(response.ok){
          return response.json();
      }{
          throw new Error("Post Failed")
      }
  }).then(function(res){
    console.log("res")
    handleClose()
    setOpen(false)
  })
  .catch(function(error) {
      console.log("Request failed", error);
  });
  }

  return (
    <div>
      <Link href="#" variant="body2" onClick={handleClickOpen}>
        {"Don't have an account? Sign Up"}
      </Link>
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
                    Sign up
                  </Typography>
                  <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <form onSubmit={handleSubmit}>
                          <TextField
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleInput}
                            fullWidth
                            label="First Name"
                            autoFocus
                            style={{marginTop:"10px"}}
                          />
                          <TextField
                            fullWidth
                            label="Last Name"
                            name="lastname"
                            value={formData.lastName}
                            onChange={handleInput}
                            style={{marginTop:"10px"}}

                          />
                          <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleInput}
                            style={{marginTop:"10px"}}

                          />
                          <TextField
                            fullWidth
                            value={formData.password}
                            onChange={handleInput}
                            label="Password"
                            type={values.showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            style={{marginTop:"10px"}}

                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {values.showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          <Button
                          onClick={register}
                            // type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            Sign Up
                          </Button>
                        </form>
                      </Grid>
                      {/* <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          value={formData.lastname}
                          onChange={handleInput}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          value={formData.email}
                          onChange={handleInput}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          value={formData.password}
                          onChange={handleInput}
                          label="Password"
                          type="password"
                        />
                      </Grid> */}
                    </Grid>
                    {/* <Button
                      type="submit"
                      onSubmit={handleSubmit}
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button> */}
                    {/* </form> */}
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Login />
                      </Grid>
                    </Grid>
                  </Box>
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
