CREATE TABLE IF NOT EXISTS people (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'Member',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO people (full_name, email, role) VALUES 
('Alice Smith', 'alice@example.com', 'Admin'),
('Bob Johnson', 'bob@example.com', 'Developer'),
('Charlie Brown', 'charlie@example.com', 'Designer'),
('Diana Prince', 'diana@example.com', 'Product Manager')
ON CONFLICT (email) DO NOTHING;
