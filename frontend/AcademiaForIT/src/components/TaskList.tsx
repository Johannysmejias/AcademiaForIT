import { useEffect, useState } from "react";
import Task from "../interfaces/task"
import { alpha, Button, IconButton, styled } from "@mui/material";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "../App.css";
import { Link } from "react-router-dom";


const TaskList = () => {
    const UrlAPI = import.meta.env.VITE_API_URL
    const ODD_OPACITY = 0.2;
    const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
        [`& .${gridClasses.row}.even`]: {
            backgroundColor: theme.palette.grey[200],
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
            const response = await fetch(`${UrlAPI}/api/tasks`)
            const data = await response.json()
            setTasks(data)
        }
        catch (error) {
            console.error(error)
        }

    }
    const DeleteTask = async (id: number) => {
        console.log(id)
        try {
          await fetch(`${UrlAPI}/api/tasks/${id}`, {
            method: "DELETE"
          });
        loadTasks()
        } catch (error) {
          console.error(error)
        }
      }
    
    useEffect(() => {
        loadTasks()
    }, [])

    

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', },
        { field: 'title', headerName: 'Titulo', width: 200 },
        { field: 'description', headerName: 'Descripción', width: 200 },
        {
            field: 'completed', headerName: 'Estado', width: 200, sortable: false,
            valueGetter: (value, row) => `${row.completed == true ? 'Completada' : 'Incompleta'}`
        },
        { field: 'createdAt', headerName: 'Fecha de creación', width: 200 },
        {
            field: 'actions', headerName: 'Acciones', width: 200, renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => DeleteTask(params.row.id)}> <DeleteIcon /> </IconButton>


                    <Link to={`/task/edit/${params.row.id}`}>
                        <IconButton aria-label="Edit"> <EditIcon /> </IconButton>
                    </Link>
                </>
            ),
        }
    ];

    if (!tasks) return <p>Cargando tarea...</p>;
    return (
        <div>

            <h1>Lista de tareas</h1>
            <div className="crearTarea">
                <Link to={`/task/new`}>
                    <Button variant="contained">Crear</Button>
                </Link>
            </div>
            <StripedDataGrid
                sx={{ m: 2 }}
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

            />

        </div>
    );
};
export default TaskList;
