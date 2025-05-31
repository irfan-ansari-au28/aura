import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import axiosInstance from '../../axiosInstance';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (username && password) {
      try {
        const responseData = await login(username, password);
        console.log('25', responseData);
  
        if (responseData.status === 200) {
          showToast('Logged in successfully!');
          navigate('/dashboard');
        } else {
          showToast('Invalid username or password', 'error');
        }
      } catch (error) {
        console.error('Login error:', error);
        showToast('An error occurred during login', 'error');
      }
    } else {
      showToast('Please enter both username and password', 'error');
    }
  };
  

  const handleSignupClick = () => {
    navigate('/register');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
      <Card sx={{ width: '100%', maxWidth: 400 }}>
        <CardHeader
          title={<Typography variant="h5" align="center">Welcome Back</Typography>}
        />
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TextField
              id="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              fullWidth
              margin="normal"
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign In
            </Button>
          </form>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, cursor: 'pointer', color: 'primary.main', textDecoration: 'underline' }}
            onClick={handleSignupClick}
          >
            Don't have an account? Sign up
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;