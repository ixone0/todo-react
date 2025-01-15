import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_db',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.use(cors());


app.use(bodyParser.json());

// API: Get all todos
app.get('/todos', (req, res) => {
    console.log('GET /todos received');
    const sql = 'SELECT * FROM todos';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching todos:', err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});


// API: Get a specific todo
app.get('/todos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM todos WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(results[0]);
    });
});

// API: Toggle todo completion status



// API: Update a todo
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Todo name is required' });
    }

    const sql = 'UPDATE todos SET name = ? WHERE id = ?';
    db.query(sql, [name, id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json({ id, name });
    });
});

app.put('/todos/:id/toggle', (req, res) => {
    const { id } = req.params;
    console.log('Toggle request received for ID:', id); // Log the request

    const sql = 'UPDATE todos SET is_done = NOT is_done WHERE id = ?'; 
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Database error:', err); // Log any database errors
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            console.log('No todo found with ID:', id); // Log if no rows were updated
            return res.status(404).json({ error: 'Todo not found' });
        }
        console.log('Todo status toggled for ID:', id); // Log success
        res.json({ message: 'Todo status toggled successfully' });
    });
});

// API: Add a new todo
app.post('/todos', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO todos (name) VALUES (?)';
    db.query(sql, [name], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id: result.insertId, name });
    });
});

// API: Delete a todo
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM todos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.sendStatus(200);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
