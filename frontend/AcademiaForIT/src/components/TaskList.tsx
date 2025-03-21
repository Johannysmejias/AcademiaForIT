import { useEffect, useState } from "react";
import Task from "../interfaces/task"
import { alpha, Button, IconButton, styled } from "@mui/material";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "../App.css";
import { Link } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const UrlAPI = import.meta.env.VITE_API_URL
    const ODD_OPACITY = 0.2;
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
    const [open, setOpen] = useState(false);

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
            backgroundColor: 'white',
            '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
                '@media (hover: none)': {
                    backgroundColor: 'transparent',
                },
            },
        },
    }));


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


    const handleOpenDialog = (id: number) => {
        setSelectedTaskId(id);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setSelectedTaskId(null);
    };

    const handleDeleteTask = async () => {
        if (selectedTaskId === null) return;

        try {
            await fetch(`${UrlAPI}/api/tasks/${selectedTaskId}`, {
                method: "DELETE",
            });
            loadTasks();
            handleCloseDialog();
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
        }
    };

    useEffect(() => {
        loadTasks()
    }, [])



    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', disableColumnMenu: true },
        { field: 'title', headerName: 'Titulo', width: 200, disableColumnMenu: true },
        { field: 'description', headerName: 'Descripción', width: 200, disableColumnMenu: true },
        {
            field: 'completed',
            headerName: 'Estado',
            width: 200,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100%">
                    {params.value ? (
                        <CheckIcon sx={{ color: "green", fontSize: 24 }} />
                    ) : (
                        <CloseIcon sx={{ color: "red", fontSize: 24 }} />
                    )}
                </Box>
            ),
        },
        { field: 'createdAt', headerName: 'Fecha de creación', width: 200, disableColumnMenu: true },
        {
            field: 'actions', headerName: 'Acciones', width: 200, disableColumnMenu: true, renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleOpenDialog(params.row.id)}> <DeleteIcon /> </IconButton>


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

            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Confirmar eliminación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancelar</Button>
                    <Button onClick={handleDeleteTask} color="error">Eliminar</Button>
                </DialogActions>
            </Dialog>

        </div>

    );
};
export default TaskList;
