const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3001;

const pool = new Pool({
    user: 'login_node_jwt_hfcp_user',
    host: 'dpg-csk7ppdsvqrc73f32u0g-a.oregon-postgres.render.com',
    database: 'login_node_jwt_hfcp',
    password: 'RhbIVzHY17ofoLxiRSkH9Tgq1kcGTlIb',
    port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

app.get('/api/proyectos/all', async (req, res) => {
    const result = await pool.query('SELECT * FROM proyectos');
    res.json(result.rows);
});



app.delete('/api/proyectos/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
