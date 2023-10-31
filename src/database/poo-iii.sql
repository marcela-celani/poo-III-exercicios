-- Active: 1698711076821@@127.0.0.1@3306

CREATE TABLE cars (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    model TEXT NOT NULL,
    color TEXT NOT NULL,
    year INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (DATETIME())
);

SELECT * FROM cars;
DROP TABLE cars;

DELETE FROM cars WHERE id = 'c002';

INSERT INTO cars (id, model, color, year)
VALUES
	('c001', 'Renegade', 'branco blaze', 2022),
	('c002', 'Golf', 'vermelho tornado', 2019);
