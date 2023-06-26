import React from 'react';
import { List, ListItem, ListItemText, Button, Typography, Box } from '@mui/material';

const Tasks = ({ tasks, handleDeleteTask, handleEditTask }) => {
  return (
    <div>
      <Typography variant="h6">Here are your tasks:</Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText
              primary={
                <Typography variant="subtitle1">
                  <Box fontWeight="fontWeightBold">Task Name:</Box>
                </Typography>
              }
              secondary={
                <Typography variant="body1">
                  {task.title}
                </Typography>
              }
            />
            <ListItemText
              primary={
                <Typography variant="subtitle1">
                  <Box fontWeight="fontWeightBold">Description:</Box>
                </Typography>
              }
              secondary={
                <Typography variant="body1">
                  {task.description}
                </Typography>
              }
            />
            <Button onClick={() => handleDeleteTask(task.id)}>Delete</Button>
            <Button onClick={() => handleEditTask(task.id)}>Edit</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Tasks;
