// import React from "react";
// import { useForm } from 'react-hook-form';
// import { useHistory } from 'react-router-dom';

// function Login() {
//   //values for login 
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   //pushing to home page
//   let history = useHistory();
//   // if data submitted 
//   const onSubmit = (values) => {
//     console.log(values);
//     history.push("/Home");
//   }
// ;
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>

//       <h3>Log in</h3>

//       <div className="form-group">
//         <label>Email</label>
//         <input

//           {...register("email", {
//             required: "Required",
//             pattern: {
//               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//               message: "invalid email address"
//             }
//           })} className="form-control" placeholder="Enter email" type="text" />
//         {errors.email ? errors.email.type ==="pattern" ? <span style={{ color: 'red' }}>@ is missing</span>: <span style={{ color: 'red' }}>This field is required</span> :null}
//       </div>

//       <div className="form-group">
//         <label>Password</label>
//         <input
//           {...register('password', {
//             required: "Required"
//           })} className="form-control" placeholder="Enter password" type="password" />
//         {errors.password && <span style={{ color: 'red' }}>This field is required</span>}
//       </div>

//       {/* <div className="form-group">
//         <div className="custom-control custom-checkbox">
//             <input type="checkbox" className="custom-control-input" id="customCheck1" />
//             <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
//         </div>
//     </div> */}

//       <button type="submit" value="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>

//     </form>
//   );
// };

// export default Login;
import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
function Copyright() {
 return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  let history = useHistory();
  
  const classes = useStyles();
  const [ userName, setuserName ] = useState();
  const [password, setPassword] = useState();
  const onSubmit = () => {
    console.log('userName :',userName);
    console.log('password :',password);
    if(password && userName){
      history.push("/Home");

    }else{
      return
    }
  
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
              value={userName}
              error={userName === ""}
  helperText={userName === "" ? 'Empty!' : ' '}
  onChange={
    (evt)=>{
      console.log("you have typed: ",setuserName(evt.target.value));
    }
  }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              error={password === ""}
  helperText={password === "" ? 'Empty!' : ' '}
  onChange={
    (evt)=>{
      console.log("you have typed: ",setPassword(evt.target.value));
    }
  }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={()=>onSubmit()}
            >
              Sign In
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}