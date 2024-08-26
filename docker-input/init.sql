CREATE TABLE IF NOT EXISTS users (
                                             username VARCHAR(50) PRIMARY KEY,
                                             password_hash VARCHAR(255) NOT NULL
    );

-- hash for password: "demo"
INSERT INTO users (username, password_hash) VALUES ('demoUser', '2a97516c354b68848cdbd8f54a226a0a55b21ed138e207ad6c5cbb9c00aa5aea');
