import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  MenuItem,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import backgroundImage from '../assets/banner2.jpg';

const styles = {
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '2rem',
    color: '#fff',
  },
};

const Dashboard = ({ user }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskId, setTaskId] = useState(''); // New state for task ID
  const [taskProgress, setTaskProgress] = useState('');
  const [tasks, setTasks] = useState(user.tasks || []);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState('');
  const [editTaskName, setEditTaskName] = useState('');
  const [editTaskDescription, setEditTaskDescription] = useState('');
  const [editTaskProgress, setEditTaskProgress] = useState('');

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (taskName.trim() === '' && taskDescription.trim() === '') {
      return;
    }

    const newTask = {
      id: taskId, // Assign the task ID
      name: taskName,
      description: taskDescription,
      progress: taskProgress,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setTaskId('');
    setTaskName('');
    setTaskDescription('');
    setTaskProgress('In Progress');

    // Store the tasks in localStorage
    localStorage.setItem(user.email + '_tasks', JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem(user.email + '_tasks', JSON.stringify(updatedTasks));
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditTaskId(taskId);
    setEditTaskName(taskToEdit.name);
    setEditTaskDescription(taskToEdit.description);
    setEditTaskProgress(taskToEdit.progress);
    setEditDialogOpen(true);
  };

  const handleUpdateTask = () => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === editTaskId) {
        return {
          ...task,
          name: editTaskName,
          description: editTaskDescription,
          progress: editTaskProgress,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem(user.email + '_tasks', JSON.stringify(updatedTasks));
    setEditDialogOpen(false);
  };

  const handleCancelEdit = () => {
    setEditDialogOpen(false);
  };

  const getProgressColor = (progress) => {
    switch (progress) {
      case 'Completed':
        return '#4caf50'; // Green
      case 'In Progress':
        return '#2196f3'; // Blue
      case 'Not Able to Complete':
        return '#f44336'; // Red
      default:
        return '';
    }
  };

  return (
    <div>
      <Box sx={styles.container}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Welcome to Daily Task Monitor.
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ marginBottom: '1rem' }}>
              Welcome to Daily Task Monitor! This application allows you to manage and track your daily tasks efficiently.
              Stay organized, set goals, and accomplish your tasks with ease.
            </Typography>
            <Button variant="contained">View Tasks</Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ paddingTop: '5rem' }}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '4rem' }}
            >
              Add Your Task Below
            </Typography>
            <form onSubmit={handleCreateTask}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Task ID" // New input for Task ID
                    variant="outlined"
                    fullWidth
                    sx={{ borderRadius: '8px', height: '100%' }}
                    value={taskId}
                    onChange={(e) => setTaskId(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Task Name"
                    variant="outlined"
                    fullWidth
                    sx={{ borderRadius: '8px', height: '100%' }}
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Task Description"
                    variant="outlined"
                    fullWidth
                    sx={{ borderRadius: '8px', height: '100%' }}
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    select
                    label="Progress"
                    variant="outlined"
                    fullWidth
                    sx={{ borderRadius: '8px', height: '100%' }}
                    value={taskProgress}
                    onChange={(e) => setTaskProgress(e.target.value)}
                  >
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Not Able to Complete">Not Able to Complete</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '1rem' }}>
                  <Button variant="contained" type="submit" sx={{ backgroundColor: '#3f51b5', color: '#fff' }}>
                    Add Task
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          {tasks && tasks.length > 0 ? (
            <Paper elevation={3} sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Your Tasks
              </Typography>
              <List>
                {tasks.map((task) => (
                  <ListItem
                    key={task.id}
                    disableGutters
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem',
                      borderRadius: '8px',
                      marginBottom: '1rem',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    <ListItemText
                      primary={task.name}
                      secondary={task.description}
                      sx={{ fontWeight: 'bold' }}
                    />
                    <Box
                      sx={{
                        backgroundColor: getProgressColor(task.progress),
                        color: '#fff',
                        borderRadius: '4px',
                        padding: '0.5rem 0.5rem',
                        display: 'inline-block',
                      }}
                    >
                      {task.progress}
                    </Box>
                    <Box>
                      <IconButton
                        color="primary"
                        aria-label="Edit"
                        component="span"
                        onClick={() => handleEditTask(task.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        aria-label="Delete"
                        component="span"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Paper>
          ) : (
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              No tasks available.
            </Typography>
          )}
        </Grid>
      </Grid>

      <Dialog open={editDialogOpen} onClose={handleCancelEdit}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Task Name"
                variant="outlined"
                fullWidth
                sx={{ borderRadius: '8px', height: '100%' }}
                value={editTaskName}
                onChange={(e) => setEditTaskName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Task Description"
                variant="outlined"
                fullWidth
                sx={{ borderRadius: '8px', height: '100%' }}
                value={editTaskDescription}
                onChange={(e) => setEditTaskDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Progress"
                variant="outlined"
                fullWidth
                sx={{ borderRadius: '8px', height: '100%' }}
                value={editTaskProgress}
                onChange={(e) => setEditTaskProgress(e.target.value)}
              >
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Not Able to Complete">Not Able to Complete</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit}>Cancel</Button>
          <Button onClick={handleUpdateTask} variant="contained" sx={{ backgroundColor: '#3f51b5', color: '#fff' }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
