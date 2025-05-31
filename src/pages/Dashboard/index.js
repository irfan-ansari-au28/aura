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
    <Box display="flex" height="100vh" bgcolor="#f9fafb">
      {/* Left Sidebar - Project List */}
      <Box width={260} borderRight={1} borderColor="#e0e0e0" bgcolor="#fff" p={2} display="flex" flexDirection="column">
        <Typography variant="h6" mb={2}>Projects</Typography>
        <ProjectList 
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      </Box>

      {/* Main Content Area */}
      <Box flex={1} display="flex" flexDirection="column">
        {/* Header */}
        <Box borderBottom={1} borderColor="#e0e0e0" p={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">{selectedProject?.name || 'No Project Selected'}</Typography>
          <Box position="relative">
            <Button 
              variant="outlined"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            >
              <Box width={32} height={32} borderRadius="50%" bgcolor="#1976d2" display="flex" alignItems="center" justifyContent="center" color="#fff">
                {user?.name?.charAt(0).toUpperCase()}
              </Box>
              <span>{user?.name}</span>
              <ChevronDown style={{ height: 20, width: 20, transition: 'transform 0.2s', transform: showUserDropdown ? 'rotate(180deg)' : 'none' }} />
            </Button>
            {showUserDropdown && (
              <Box position="absolute" right={0} mt={1} width={180} bgcolor="#fff" borderRadius={1} boxShadow={3} zIndex={10}>
                <Button
                  onClick={handleSignOut}
                  startIcon={<LogOut />}
                  fullWidth
                  sx={{ justifyContent: 'flex-start', color: '#333' }}
                >
                  Sign Out
                </Button>
              </Box>
            )}
          </Box>
        </Box>
        {/* Chat Interface */}
        <ChatInterface selectedProject={selectedProject} />
      </Box>
    </Box>
  );
}

export default Dashboard;