import express from 'express';
import mysql from 'mysql2';

const router = express.Router();
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydb'
});

router.get('/', async (req, res) => {
    try {
        const data = await connection.promise().query(
            `SELECT * FROM categories;`
        );

        res.status(202).json({
            categories: data[0]
        });
    } catch (err) {
        res.status(500).json({
            message: err
        });
    };
});

router.post('/', async (req, res) => {
    try {
        const {categoryId, categoryName} = req.body;
        const data = await connection.promise().query(
            `INSERT INTO categories VALUES (?, ?);`, [categoryId, categoryName]
        );
        
        res.status(202).json({
            category: data[0]
        });
    } catch (err) {
        res.status(500).json({
            message: err
        });
    };
});

export default router;