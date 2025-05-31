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
import logo from '../../logo.svg'; // Placeholder, will replace with northern lights SVG


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
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f58529 0%, #dd2a7b 40%, #8134af 70%, #515bd4 100%)',
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 420,
          borderRadius: 4,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
          background: 'rgba(255,255,255,0.95)',
          px: 2,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 24, marginBottom: 8 }}>
          {/* Text-based Aura Vibe logo */}
          <div style={{ width: '100%', textAlign: 'center' }}>
            <span style={{
              fontFamily: 'Segoe UI, sans-serif',
              fontWeight: 800,
              fontSize: 36,
              background: 'linear-gradient(90deg, #f58529 0%, #dd2a7b 40%, #8134af 70%, #515bd4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: 2,
              textAlign: 'center',
            }}>Aura </span>
            <div style={{
              fontFamily: 'Segoe UI, sans-serif',
              fontWeight: 400,
              fontSize: 14,
              color: '#515bd4',
              marginTop: 4,
              textAlign: 'center',
              maxWidth: 260,
              lineHeight: 1.4,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              Turn your idea into reality.
            </div>
          </div>
        </div>
        {/* <Typography variant="subtitle1" align="center" color="#f58529" style={{ marginBottom: 8 }}>
          Welcome back to Aura
        </Typography> */}
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 8 }}>
            <TextField
              id="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              fullWidth
              margin="normal"
              InputProps={{
                style: {
                  background: '#fbeee6',
                  borderRadius: 8,
                },
              }}
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
              InputProps={{
                style: {
                  background: '#fbeee6',
                  borderRadius: 8,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                background: 'linear-gradient(90deg, #f58529 0%, #dd2a7b 40%, #8134af 70%, #515bd4 100%)',
                color: '#fff',
                fontWeight: 600,
                borderRadius: 8,
                boxShadow: '0 2px 8px 0 rgba(221, 42, 123, 0.12)',
                py: 1.5,
                fontSize: 18,
                letterSpacing: 1,
                mt: 1,
                '&:hover': {
                  background: 'linear-gradient(90deg, #515bd4 0%, #8134af 30%, #dd2a7b 70%, #f58529 100%)',
                },
              }}
            >
              Sign In
            </Button>
          </form>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, cursor: 'pointer', color: '#dd2a7b', textDecoration: 'underline' }}
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