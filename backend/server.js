const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// PostgreSQL Pool configuration
const pool = new Pool({
  user: process.env.DB_USER || 'admin',
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'seng384_db',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

app.get('/', (req, res) => {
  res.send('Backend API is running!');
});

// GET people from the database
app.get('/api/people', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM people ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// GET a specific person by ID
app.get('/api/people/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM people WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new person to the database
app.post('/api/people', async (req, res) => {
  const { full_name, email, role } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!full_name || !email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Valid full name and email are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO people (full_name, email, role) VALUES ($1, $2, $3) RETURNING *',
      [full_name, email, role || 'Member']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
       return res.status(409).json({ error: 'Email already exists' });
    }
    console.error('Database validation error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// PUT to update an existing person
app.put('/api/people/:id', async (req, res) => {
  const { id } = req.params;
  const { full_name, email, role } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!full_name || !email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Valid full name and email are required' });
  }
  
  try {
    const result = await pool.query(
      'UPDATE people SET full_name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *',
      [full_name, email, role, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Email already exists' });
    console.error('Update error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE a person
app.delete('/api/people/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM people WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.status(204).send(); // No content response for successful deletion
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
