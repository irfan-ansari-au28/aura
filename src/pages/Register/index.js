import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import useToast from '../../hooks/useToast';
import axiosInstance from '../../axiosInstance';

const roles = [
  { value: 'business_user', label: 'Business User' },
  { value: 'product_manager', label: 'Product Manager' },
  { value: 'architect', label: 'Architect' },
];

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('business_user');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axiosInstance.post('/auth/register', {
        email,
        password,
        name,
        role,
      });
  
      // If the request succeeds and status is 201 (Created)
      if (response.status === 201) {
        showToast('Registered successfully!');
        navigate('/');
      } else {
        // Should rarely hit this if Axios is configured correctly
        showToast(response.data?.message || 'Registration failed', 'error');
      }
    } catch (err) {
      // Axios errors include the server response (if any)
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.detail || // in case of FastAPI/Django style
        'Registration failed';
  
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
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
        <Typography variant="subtitle1" align="center" color="#f58529" style={{ marginBottom: 8 }}>
          Create your Aura account
        </Typography>
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 8 }}>
            <TextField
              id="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              fullWidth
              margin="normal"
              required
              InputProps={{
                style: {
                  background: '#fbeee6',
                  borderRadius: 8,
                },
              }}
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              fullWidth
              margin="normal"
              required
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
              required
              InputProps={{
                style: {
                  background: '#fbeee6',
                  borderRadius: 8,
                },
              }}
            />
            <TextField
              id="role"
              label="Role (optional)"
              select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{
                style: {
                  background: '#fbeee6',
                  borderRadius: 8,
                },
              }}
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value} style={{ color: '#dd2a7b' }}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
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
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register; 