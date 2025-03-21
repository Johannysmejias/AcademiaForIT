import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import '../App.css';


const TaskForm = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false)
    const UrlAPI = import.meta.env.VITE_API_URL


    useEffect(() => {
        if (id) {
            const fetchTask = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/api/tasks/${id}`);
                    const data = await response.json();
                    setTitle(data.title);
                    setDescription(data.description);
                    setCompleted(data.completed);

                } catch (error) {
                    console.error("Error al cargar la tarea:", error);
                }
            };
            fetchTask();

        }
    }, [id])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const taskData = { title, description, completed };
        const url = id
            ? `http://localhost:3001/api/tasks/${id}`
            : "http://localhost:3001/api/tasks"

        const method = id ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData),
            });
            if (!response.ok) throw new Error("Error al guardar la tarea");

            navigate("/")
        } catch (error) {
            console.error("Error al guardar la tarea:", error);
        }
    }
    const CreateOrUpdateTask = async () => {
        if (!id) {
            try {
                const data = { title: title, description: description, completed: completed }
                const response = await fetch(`${UrlAPI}/api/tasks/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    window.location.href = '/'
                }
            } catch (error) {
                console.error(error)
            }
        } else {
            try {
                console.log(id)
                const data = { title, description, completed };
                const response = await fetch(`${UrlAPI}/api/tasks/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),


                });
                if (response.ok) {
                    window.location.href = '/'
                }
            } catch (error) {
                console.error(error)
            }
        }

    }


    return (
        <Box component="form"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "60vh",
            }}>
            <FormGroup onSubmit={handleSubmit} sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: 500,
            }}>
                <h1>{id ? "Editar Tarea" : "Nueva Tarea"}</h1>
                <Link to="/">Volver a la lista</Link>
                <TextField
                    id="title"
                    variant="outlined"
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <TextField
                    id="description"
                    variant="outlined"
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <FormControlLabel checked={completed} onChange={() => setCompleted(!completed)} control={<Checkbox />} label="Tarea completada" />
                <Button variant="contained" type="submit" onClick={CreateOrUpdateTask}>{id ? "Actualizar" : "Crear"}</Button>
            </FormGroup>
        </Box>


    )
}
export default TaskForm;