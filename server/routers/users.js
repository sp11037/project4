import express from 'express';
import mysql from 'mysql2';

const router = express.Router();
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydb'
});

// get login info by username
router.get('/:uname', async (req, res) => {
    try {
        const {uname} = req.params;
        const data = await connection.promise().query(
            `SELECT * FROM users WHERE uname=?;`, [uname]
        );

        res.status(202).json({
            user: data[0]
        });
    } catch (err) {
        res.status(500).json({
            message: err
        });
    };
});

export default router;