import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Task from "../interfaces/task";

const TaskItem = () => {
    const { id } = useParams<{ id: string }>();
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
          try {
            const response = await fetch(`http://localhost:3001/api/tasks/${id}`);
            const data = await response.json();
            setTask(data);
          } catch (error) {
            console.error("Error al cargar la tarea:", error);
          }
        };

        fetchTask();
    }, [id]);

    if (!task) return <p>Cargando tarea...</p>;

    return(
        <div>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
        <p>Estado: {task.completed ? "Completada" : "Pendiente"}</p>
        <Link to={`/task/edit/${task.id}`}>
          <button>Editar</button>
        </Link>
        <Link to="/">Volver a la lista</Link>
      </div>
    )
}
export default TaskItem;