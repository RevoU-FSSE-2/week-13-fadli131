import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Avatar, CssBaseline, Container, FormControlLabel, Checkbox, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useFormik } from 'formik'; 
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;

      try {
        const response = await axios.post('https://mock-api.arikmpt.com/api/user/login', {
          email,
          password,
        });

        if (response.status === 200) {
          console.log('Login berhasil:', response.data);
          sessionStorage.setItem('userToken', response.data.data.token);
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'You have successfully logged in. You will be redirected to dashboard shortly...',
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/MainMenu');
            }
            setInterval(() => {
              navigate('/MainMenu');
            }, 3000);
          });
        } else {
          setError('Login failed. Double check your email and password.');
        }
      } catch (error) {
        console.error('There is an error:', error);
        setError('An error occurred while trying to log in. Please try again later.');
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email} 
            onChange={formik.handleChange} 
            error={formik.touched.email && Boolean(formik.errors.email)} 
            helperText={formik.touched.email && formik.errors.email} 
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password} 
            onChange={formik.handleChange} 
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}
          <Grid container>
            <Grid item xs>
              <Link href="/ForgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;