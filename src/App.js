//kxl654
import React from 'react';
import './style.css';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddCircle from '@mui/icons-material/AddCircle';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Cancel from '@mui/icons-material/Cancel';
import DoDisturb from '@mui/icons-material/DoDisturb';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { useState } from 'react';
import moment from 'moment';
import Checkbox from '@mui/material/Checkbox';
import Edit from '@mui/icons-material/Edit';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

export default function App() {
  const [open, setOpen] = React.useState(false);
  const [Task, setTask] = useState([]);
  const [index, setIndex] = React.useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');
  const [titleError, setTitleError] = React.useState(false);
  const [titleHelperText, setTitleHelperText] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState(false);
  const [descriptionHelperText, setDescriptionHelperText] = React.useState('');
  const [completed, setCompleted] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [edittingTask, setEdittingTask] = React.useState(-1);
  let today = new Date();

  const handleClickToOpen = () => {
    clearErrors();
    setOpen(true);
    setEditMode(false);
  };

  const handleClickToClose = () => {
    setOpen(false);
  };

  let changeDescription = (updatedDescription) => {
    setDescription(updatedDescription);
  };

  let changeDeadline = (updateDeadline) => {
    setDeadline(updateDeadline);
  };

  let changePriority = (updatePriority) => {
    setPriority(updatePriority);
  };

  function addRow(title, description, deadline, priority) {
    setTask([
      ...Task,
      {
        index: index,
        title: title,
        description: description,
        deadline: deadline,
        priority: priority,
        completed: completed,
      },
    ]);
    setIndex((index) => index + 1);
  }

  const deleteRow = (index) => {
    let position = -1;
    for (let i = 0; i < Task.length; i++) {
      if (Task[i].index == index) {
        position = i;
      }
    }
    setTask((Task) => {
      let newTask = [...Task];
      newTask.splice(position, 1);
      setTask([...newTask]);
      return newTask;
    });
  };

  function checkTitleUniqueness(newTitle) {
    let taken = false;
    for (let i = 0; i < Task.length; i++) {
      if (Task[i].title == newTitle) {
        taken = true;
      }
    }
    return taken;
  }

  const checkCompleted = (index) => {
    let position = -1;
    for (let i = 0; i < Task.length; i++) {
      if (Task[i].index == index) {
        position = i;
      }
    }
    setTask((Task) => {
      let newTask = [...Task];
      Task[position].completed = !Task[position].completed;
      return newTask;
    });
  };

  const editRow = (description, deadline, priority) => {
    let position = -1;
    for (let i = 0; i < Task.length; i++) {
      if (Task[i].index == edittingTask) {
        position = i;
      }
    }
    Task[position].description = description;
    Task[position].deadline = deadline;
    Task[position].priority = priority;
    setOpen(false);
  };

  function validateValues() {
    clearErrors();
    if (
      document.getElementById('titleInput').value == '' ||
      document.getElementById('descriptionInput').value == '' ||
      document.getElementById('deadlineInput').value == '' ||
      priority == ''
    ) {
      if (document.getElementById('titleInput').value == '') {
        setTitleError(true);
        setTitleHelperText('Title cannot be empty');
      }

      if (document.getElementById('descriptionInput').value == '') {
        setDescriptionError(true);
        setDescriptionHelperText('Description cannot be empty');
      }
      if (document.getElementById('deadlineInput').value == '') {
        console.log('This should not be possible, how did you do it?');
      }
      if (priority == '') {
        console.log('This should not be possible, how did you do it?');
      }
    } else if (
      checkTitleUniqueness(document.getElementById('titleInput').value)
    ) {
      setTitleError(true);
      setTitleHelperText('Title must be unique');
    } else {
      addRow(
        document.getElementById('titleInput').value,
        document.getElementById('descriptionInput').value,
        document.getElementById('deadlineInput').value,
        priority,
        setOpen(false),
        toastr.success('Task was added succesfully')
      );
    }
  }

  function validateEdit() {
    clearErrors();
    if (
      document.getElementById('descriptionInput').value == '' ||
      document.getElementById('deadlineInput').value == '' ||
      priority == ''
    ) {
      if (document.getElementById('descriptionInput').value == '') {
        setDescriptionError(true);
        setDescriptionHelperText('Description cannot be empty');
      }
      if (document.getElementById('deadlineInput').value == '') {
        console.log('This should not be possible, how did you do it?');
      }
      if (priority == '') {
        console.log('This should not be possible, how did you do it?');
      }
    } else {
      editRow(
        document.getElementById('descriptionInput').value,
        document.getElementById('deadlineInput').value,
        priority,
        toastr.success('Task was updated successfully')
      );
    }
  }

  function clearErrors() {
    setTitleError(false);
    setTitleHelperText('');
    setDescriptionError(false);
    setDescriptionHelperText('');
  }

  const fillValues = (id) => {
    let position = -1;
    for (let i = 0; i < Task.length; i++) {
      if (Task[i].index == id) {
        position = i;
      }
    }
    setDescription(Task[position].description);
    setDeadline(Task[position].deadline);
    setPriority(Task[position].priority);
  };

  toastr.options = { positionClass: 'toast-bottom-right' };

  return (
    <Container maxWidth={false}>
      <Dialog open={open} onClose={handleClickToClose}>
        <AppBar position="static">
          <Toolbar style={{ align: 'center', background: '#1665c0' }}>
            {editMode ? (
              <Typography
                align="center"
                style={{ width: '100%', alignItems: 'center' }}
              >
                <Grid
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Edit />
                  &nbsp;Update Task
                </Grid>
              </Typography>
            ) : (
              <Typography
                align="center"
                style={{ width: '100%', alignItems: 'center' }}
              >
                <Grid
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AddCircle />
                  &nbsp;Add Task
                </Grid>
              </Typography>
            )}
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Stack spacing={3}>
            {!editMode ? (
              <TextField
                id="titleInput"
                label="Title"
                error={titleError}
                helperText={titleHelperText}
              ></TextField>
            ) : (
              <></>
            )}

            <TextField
              id="descriptionInput"
              label="Description"
              error={descriptionError}
              helperText={descriptionHelperText}
              value={description}
              onChange={(e) => changeDescription(e.target.value)}
            ></TextField>
            <TextField
              type="date"
              id="deadlineInput"
              label="Deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            ></TextField>
            <FormControl>
              <FormLabel>Priority</FormLabel>
              <RadioGroup
                row
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <FormControlLabel value="Low" control={<Radio />} label="Low" />
                <FormControlLabel
                  value="Medium"
                  control={<Radio />}
                  label="Medium"
                />
                <FormControlLabel
                  value="High"
                  control={<Radio />}
                  label="High"
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          {!editMode ? (
            <Button
              style={{
                background: '#1E88E5',
                color: 'white',
                width: 100,
              }}
              onClick={validateValues}
            >
              <Grid display="flex" justifyContent="center" alignItems="center">
                <AddCircle fontSize="small" /> &nbsp;Add
              </Grid>
            </Button>
          ) : (
            <Button
              style={{
                background: '#1E88E5',
                color: 'white',
                width: 100,
              }}
              onClick={() => {
                validateEdit();
              }}
            >
              <Grid display="flex" justifyContent="center" alignItems="center">
                <AddCircle fontSize="small" /> &nbsp;Edit
              </Grid>
            </Button>
          )}
          <Button
            style={{
              background: '#dc3545',
              color: 'white',
              width: 100,
            }}
            onClick={handleClickToClose}
          >
            <Grid display="flex" justifyContent="center" alignItems="center">
              <DoDisturb fontSize="small" /> &nbsp;Cancel
            </Grid>
          </Button>
        </DialogActions>
      </Dialog>

      <AppBar position="static">
        <Toolbar style={{ align: 'center', background: '#1564bf' }}>
          <Typography
            align="center"
            style={{ width: '100%', alignItems: 'center' }}
          >
            <Grid display="flex" justifyContent="center" alignItems="center">
              <MenuIcon />
              &nbsp;FRAMEWORKS
            </Grid>
          </Typography>
          <Button
            style={{
              background: '#1976d3',
              color: 'white',
            }}
            onClick={() => {
              handleClickToOpen();
              changeDescription('');
              changeDeadline(today.toLocaleDateString('en-CA'));
              changePriority('Low');
            }}
          >
            <Grid display="flex" justifyContent="center" alignItems="center">
              <AddCircle fontSize="small" /> &nbsp;Add
            </Grid>
          </Button>
        </Toolbar>
      </AppBar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ color: 'gray' }}>
              Title
            </TableCell>
            <TableCell align="center" sx={{ color: 'gray' }}>
              Description
            </TableCell>
            <TableCell align="center" sx={{ color: 'gray' }}>
              Deadline
            </TableCell>
            <TableCell align="center" sx={{ color: 'gray' }}>
              Priority
            </TableCell>
            <TableCell align="center" sx={{ color: 'gray' }}>
              Is Complete
            </TableCell>
            <TableCell align="center" sx={{ color: 'gray' }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Task.map((Task) => (
            <TableRow key={Task.id}>
              <TableCell align="center">{Task.title}</TableCell>
              <TableCell align="center">{Task.description}</TableCell>
              <TableCell align="center">
                {moment(Task.deadline).format('MM/DD/YYYY')}
              </TableCell>
              <TableCell align="center">{Task.priority}</TableCell>
              <TableCell align="center">
                {Task.completed ? (
                  <Checkbox
                    defaultChecked
                    onClick={() => {
                      checkCompleted(Task.index);
                    }}
                  ></Checkbox>
                ) : (
                  <Checkbox
                    onClick={() => {
                      checkCompleted(Task.index);
                    }}
                  ></Checkbox>
                )}
              </TableCell>
              <TableCell align="center">
                {!Task.completed ? (
                  <div>
                    <Button
                      style={{
                        background: '#1E88E5',
                        color: 'white',
                        width: 100,
                      }}
                      onClick={() => {
                        setEditMode(true);
                        setEdittingTask(Task.index);
                        setOpen(true);
                        clearErrors();
                        fillValues(Task.index);
                      }}
                    >
                      <Edit fontSize="small" /> &nbsp;Update
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
                <div>
                  <Button
                    style={{
                      background: '#dc3545',
                      color: 'white',
                      width: 100,
                    }}
                    onClick={() => {
                      deleteRow(Task.index);
                      toastr.success('Task was deleted successfully');
                    }}
                  >
                    <Cancel fontSize="small" /> &nbsp;Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
