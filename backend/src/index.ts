import express, { Request, Response } from "express";
import { Task } from './task';
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error al conectar la base de datos:", err.message);
  } else {
    console.log("Conectado a la base de datos SQLite.");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      completed BOOLEAN NOT NULL,
      createdAt DATE NOT NULL
    )
  `);
});


const app = express();
const port = 3000
app.use(express.json())


app.get('/api/tasks', (req: Request, res: Response) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });

})
app.post('/api/tasks', (req: Request, res: Response) => {
  const { title, description, completed} = req.body
  const createdAt = new Date().toLocaleString()
  db.run("INSERT INTO tasks (title, description, completed, createdAt) VALUES (?, ?, ?, ?)", 
    [title, description, completed, createdAt], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID,title, description, completed, createdAt});
  });
})
app.put('/api/tasks/:id', (req: Request, res: Response) => {
  let id = req.params.id
  const { title, description, completed} = req.body
   if (title === ''|| description ==='') {
    res.status(400).json({ error: "Faltan datos" });
    return 
   }
   db.run("UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?", 
    [title, description, completed, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
     }
     if (this.changes === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
     }
      res.json({ message: "Tarea actualizada", id, title, description, completed});
    });
})


app.delete('/api/tasks/:id', (req: Request, res: Response) => {
  let id = req.params.id
  db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json({ message: "Tarea eliminada", id });
  });
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})