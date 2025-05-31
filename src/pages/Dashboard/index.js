import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Plus, User, ChevronDown, LogOut } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import ProjectList from './components/ProjectList';
import ChatInterface from './components/ChatInterface';

function Dashboard() {
  const { logout } = useAuth();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem('user'));
  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <Box display="flex" height="100vh" sx={{ background: '#f9fafb' }}>
      {/* Left Sidebar - Project List */}
      <Box width={260} borderRight={0} bgcolor="rgba(255,255,255,0.85)" p={2} display="flex" flexDirection="column" boxShadow={1} borderRadius={0}>
        <Typography variant="h6" mb={2} fontWeight={700} color="#dd2a7b">Projects</Typography>
        <ProjectList 
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      </Box>

      {/* Main Content Area */}
      <Box flex={1} display="flex" flexDirection="column">
        {/* Top Bar: Aura logo/subtitle left, user login right */}
        <Box p={2} display="flex" alignItems="center" justifyContent="space-between" sx={{ background: 'rgba(255,255,255,0.85)', borderRadius: 0, boxShadow: 1 }}>
          <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
            <span style={{
              fontFamily: 'Segoe UI, sans-serif',
              fontWeight: 800,
              fontSize: 28,
              background: 'linear-gradient(90deg, #f58529 0%, #dd2a7b 40%, #8134af 70%, #515bd4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: 2,
              textAlign: 'left',
              display: 'block',
            }}>Aura</span>
            {/* <span style={{
              fontFamily: 'Segoe UI, sans-serif',
              fontWeight: 400,
              fontSize: 14,
              color: '#515bd4',
              textAlign: 'left',
              lineHeight: 1.4,
              display: 'block',
              marginLeft: 2,
              marginTop: 2,
            }}>
              Turn your idea into reality.
            </span> */}
          </Box>
          <Box position="relative">
            <Button 
              variant="outlined"
              sx={{ display: 'flex', alignItems: 'center', gap: 1, borderColor: '#e0e0e0', color: '#8134af', fontWeight: 600, background: '#fff', borderRadius: 2, boxShadow: 0 }}
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            >
              <Box width={32} height={32} borderRadius="50%" bgcolor="#e0e7ff" display="flex" alignItems="center" justifyContent="center" color="#8134af" fontWeight={700} fontSize={18}>
                {user?.name?.charAt(0).toUpperCase()}
              </Box>
              <span style={{ color: '#8134af', fontWeight: 600 }}>{user?.name}</span>
              <ChevronDown style={{ height: 20, width: 20, transition: 'transform 0.2s', transform: showUserDropdown ? 'rotate(180deg)' : 'none', color: '#8134af' }} />
            </Button>
            {showUserDropdown && (
              <Box position="absolute" right={0} mt={1} width={180} bgcolor="#fff" borderRadius={2} boxShadow={3} zIndex={10}>
                <Button
                  onClick={handleSignOut}
                  startIcon={<LogOut />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', color: '#8134af', fontWeight: 600, borderRadius: 2 }}
                >
                  Sign Out
                </Button>
              </Box>
            )}
          </Box>
        </Box>
        {/* Second Row: Centered card for project title and chat */}
        <Box flex={1} display="flex" flexDirection="column" alignItems="stretch" justifyContent="stretch">
          <Box flex={1} width="100%" sx={{ background: 'rgba(255,255,255,0.85)', borderRadius: 0, boxShadow: 1, p: 3, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="h5"
              fontWeight={700}
              color={selectedProject?.name ? "#8134af" : "#b0b3c6"}
              mb={2}
              align="center"
              sx={selectedProject?.name ? {} : {
                border: '1.5px solid #e0e0e0',
                borderRadius: 2,
                background: 'rgba(245,248,250,0.5)',
                color: '#b0b3c6',
                fontWeight: 500,
                fontSize: 20,
                p: 2,
                mb: 3,
                letterSpacing: 1,
              }}
            >
              {selectedProject?.name || 'No Project Selected'}
            </Typography>
            <Box flex={1} display="flex" flexDirection="column">
              <ChatInterface selectedProject={selectedProject} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;