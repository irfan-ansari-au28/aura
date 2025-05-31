import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { Plus } from 'lucide-react';
import axiosInstance from '../../../axiosInstance';
import useToast from '../../../hooks/useToast';





export default function ProjectList({ selectedProject, setSelectedProject }) {
    const { showToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleCreateProject = async () => {
    if (newProjectName.trim()) {
      try {
        const payload = {
          name: newProjectName,
          description: 'A project for AI-assisted development',
        };
        const response = await axiosInstance.post('/project', payload);
     console.log('response', response.data);
        const createdProject = response.data;
        const updatedProjects = [createdProject, ...projects];
        setProjects(updatedProjects);
        // setSelectedProject(createdProject);
        setNewProjectName('');
        setShowCreateModal(false);
        showToast('Project created successfully!');
      } catch (error) {
        console.error('Error creating project:', error);
      }
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.post('/projects');
      const data = response.data;
      setProjects(data);
      setSelectedProject(data[0]);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }
 useEffect(() => {
     fetchProjects();
     setSelectedProject(projects[0]);
 },[])
  return (
    <>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {projects.map((project) => (
          <Card
            key={project}
            sx={{ p: 2, mb: 2, cursor: 'pointer', backgroundColor: selectedProject?.name === project?.name  ? '#e3f2fd' : '#fff', border: selectedProject?.name === project?.name  ? '1px solid #90caf9' : 'none' }}
            onClick={() => setSelectedProject(project)}
          >
            <Typography>{project?.name }</Typography>
          </Card>
        ))}
      </div>

     {user.role === 'business_user' && <Button
        variant="contained"
        startIcon={<Plus />}
        sx={{ mt: 2, width: '100%' }}
        onClick={() => setShowCreateModal(true)}
      >
        New Project
      </Button> }

      <Dialog open={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="projectName"
            label="Project Name"
            type="text"
            fullWidth
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateProject} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}