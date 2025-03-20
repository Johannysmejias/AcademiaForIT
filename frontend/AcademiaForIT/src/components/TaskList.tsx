import { useEffect, useState } from "react";
import Task from "../interfaces/task"
import { alpha, IconButton, Paper, styled } from "@mui/material";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const TaskItem = () =>{
    const ODD_OPACITY = 0.2;
const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200], // Color para las filas pares
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
        ),
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: 'white', // Color para las filas impares
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
}));

const [tasks, setTasks] = useState<Task[]>([])

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

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Titulo', width: 130 },
    { field: 'description', headerName: 'Descripción', width: 130 },
    {
      field: 'completed', headerName: 'Estado', width: 130, sortable: false,
      valueGetter: (value, row) => `${row.completed == true ? 'Completada' : 'Incompleta'}`
    },
    { field: 'createdAt', headerName: 'Fecha de creación', width: 130 },
    {
      field: 'actions', headerName: 'Acciones', width: 130, renderCell: (params) => (
        <>
        <IconButton
          aria-label="delete"
          >
          <DeleteIcon />
        </IconButton>

        <IconButton
        aria-label="delete"
        >
        <EditIcon />
      </IconButton>
      </>
      ),
    }
];

if (!tasks) return <p>Cargando tarea...</p>;
return (
    <div className="tabla">
      
        <Paper sx={{ height: 400, width: '100%' }}>
          <StripedDataGrid
            rows={tasks}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10, 20, 50]}
            getRowClassName={(params) => 
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            sx={{ border: 0 }}
          />
        </Paper>
      </div>
);
};
export default TaskItem;
