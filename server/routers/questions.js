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
            `SELECT questionId, question FROM questions AS q INNER JOIN categories AS c WHERE q.categoryId = c.categoryId AND q.categoryId = ?;`, [category]
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

router.post('/', async (req, res) => {
    try {
        const {question, categoryId} = req.body;
        const data = await connection.promise().query(
            `INSERT INTO questions (question, categoryID) VALUES (?, ?);`, [question, categoryId]
        );

        res.status(202).json({
            question: data[0]
        });
    } catch (err) {
        res.status(500).json({
            message: err
        });
    };
});

export default router;