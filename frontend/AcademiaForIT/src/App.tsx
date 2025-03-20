import { Paper, Button, TextField, Checkbox, FormControlLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import { DataGrid, GridColDef, gridClasses } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
import loadTasks from "./components/TaskList"
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './App.css';
import { Task } from './interfaces/task';
import AppRouter from "./routes/AppRouter";





function App() {
  
  // const [title, setTitle] = useState('')
  // const [description, setDescription] = useState('')
  // const [open, setOpen] = useState(false)
  // const [completed, setCompleted] = useState(false);
  // const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  //  const handleClickOpen = (task: Task) => {
  //   setSelectedTask(task)
  //   setTitle(task.title)
  //   setDescription(task.description)
  //   setCompleted(false);
  //   setOpen(true)
  // }
  // const handleClose = () => {setOpen(false);}




  

  // const AddTask = async () => {
  //   try {
  //     const data = { title: title, description: description, completed: false }
  //     const response = await fetch('http://localhost:3001/api/tasks', {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     loadTasks()
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // const DeleteTask = async (id: number) => {
  //   console.log(id)
  //   try {
  //     const response = await fetch(`http://localhost:3001/api/tasks/${id}`, {
  //       method: "DELETE"
  //     });
  //   loadTasks()
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // const EditTask = async () => {
  //   if (!selectedTask) return; 
  //   try {   
  //     const data = { title, description, completed };
  //     await fetch(`http://localhost:3001/api/tasks/${selectedTask.id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
    
  //   loadTasks()
  //   handleClose()
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // const columns: GridColDef[] = [
  //   { field: 'id', headerName: 'ID', width: 70 },
  //   { field: 'title', headerName: 'Titulo', width: 130 },
  //   { field: 'description', headerName: 'Descripción', width: 130 },
  //   {
  //     field: 'completed', headerName: 'Estado', width: 130, sortable: false,
  //     valueGetter: (value, row) => `${row.completed == true ? 'Completada' : 'Incompleta'}`
  //   },
  //   { field: 'createdAt', headerName: 'Fecha de creación', width: 130 },
  //   {
  //     field: 'actions', headerName: 'Acciones', width: 130, renderCell: (params) => (
  //       <>
  //       <IconButton
  //         aria-label="delete"
  //         onClick={() => DeleteTask(params.row.id)}>
  //         <DeleteIcon />
  //       </IconButton>

  //       <IconButton
  //       aria-label="delete"
  //       onClick={() => handleClickOpen(params.row)}>
  //       <EditIcon />
  //     </IconButton>
  //     </>
  //     ),
     

  //];

  return <AppRouter/>
  //   <>
  //     <div className="app-container">
  //       <div className='button-container'>
  //       <Button variant="outlined" onClick={AddTask}>Agregar Tarea</Button>
  //     </div>

  //     <Dialog
  //       open={open}
  //       onClose={handleClose}
  //       slotProps={{
  //         paper: {
  //           component: 'form',
  //           onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
  //             event.preventDefault();
  //             const formData = new FormData(event.currentTarget);
  //             const formJson = Object.fromEntries((formData as any).entries());
  //             const title = formJson.title;
  //             const description = formJson.description;
  //             const completed = formJson.completed;
  //             console.log(title);
  //             handleClose();
  //           },
  //         },
  //       }}
  //     >
  //       <DialogTitle>Editar tarea</DialogTitle>
  //       <DialogContent>
          
  //         <TextField
  //           autoFocus
  //           required
  //           margin="dense"
  //           id="title"
  //           name="Title"
  //           label="Título"
  //           fullWidth
  //           variant="standard"
  //           value={title}
  //           onChange={(e) => setTitle(e.target.value)}
  //         />
  //         <TextField
  //           autoFocus
  //           required
  //           margin="dense"
  //           id="title"
  //           name="Description"
  //           label="Descripción"
  //           fullWidth
  //           variant="standard"
  //           value={description}
  //           onChange={(e) => setDescription(e.target.value)}
  //         />
  //         <FormControlLabel
  //             control={
  //               <Checkbox
  //                 checked={completed}
  //                 onChange={(e) => setCompleted(e.target.checked)}
  //               />
  //             }
  //             label="Tarea completa"
  //           />

          
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={handleClose}>Cancelar</Button>
  //         <Button type="submit" onClick={EditTask}>Editar</Button>
  //       </DialogActions>
  //     </Dialog>

      
  //     </div>
    
  //   </>

  // )
}

export default App
