import express from 'express';
import mysql from 'mysql2';

const router = express.Router();
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydb'
})

router.get('/:category', async (req, res) => {
    try {
        const {category} = req.params;
        const data = await connection.promise().query(
            `SELECT questionId, question from questions as q inner join categories as c where q.categoryId = c.categoryId and q.categoryId = ?;`, [category]
        );

        res.status(202).json({
            questions: data[0]
        });
    } catch (err) {
        res.status(500).json({
            message: err
        });
    };
});

export default router;