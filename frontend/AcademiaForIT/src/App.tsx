import { Paper, Button, TextField, Chip } from '@mui/material'
import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';




function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const loadTasks = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/tasks')
      const data = await response.json()
      console.log(data)
      setTasks(data)
    }
    catch (error) {
      console.error(error)
    }

  }
  useEffect(() => {
    loadTasks()
  }, [])

  const AddTask = async () => {
    try {
      const data = { title: title, description: description, completed: false }
      const response = await fetch('http://localhost:3001/api/tasks', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });
      loadTasks()
    } catch (error) {
      console.error(error)
    }
  }

  const DeleteTask = async() => {
    console.log(selectedId)

    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${selectedId}`, {
        method: "DELETE"
      });
      loadTasks()
    } catch (error) {
      console.error(error)
    }
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Titulo', width: 130 },
    { field: 'description', headerName: 'Descripción', width: 130 },
    { field: 'completed', headerName: 'Estado', width: 130, sortable: false,
      valueGetter: (value, row) => `${row.completed == true ? 'Completada': 'Incompleta'}`
    },
    { field: 'createdAt', headerName: 'Fecha de creación', width: 130 }
    
  ];

  return (
    <>
      <div>



      </div>
      <Button variant="outlined" onClick={AddTask}>Agregar Tarea</Button>
      <Button variant="outlined" onClick={DeleteTask}>Eliminar Tarea</Button>
      <Button variant="outlined">Editar Tarea</Button>
      <TextField id="outlined-basic" value={title} onChange={(e) => setTitle(e.target.value)} label="Title" variant="outlined" type='text' />
      <TextField id="outlined-basic" value={description} onChange={(e) => setDescription(e.target.value)} label="Description" variant="outlined" />
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={tasks}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          checkboxSelection
          disableMultipleRowSelection= {true}
          onRowClick={(params) => setSelectedId(params.id as number)} 
          
          sx={{ border: 0 }}
        />
      </Paper>
      
    </>

  )
}

export default App
