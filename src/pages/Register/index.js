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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
      <Card sx={{ width: '100%', maxWidth: 400 }}>
        <CardHeader
          title={<Typography variant="h5" align="center">Register</Typography>}
        />
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TextField
              id="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              fullWidth
              margin="normal"
              required
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
            />
            <TextField
              id="role"
              label="Role (optional)"
              select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
              margin="normal"
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register; 