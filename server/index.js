import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('server running');
});

app.listen(5000, () => {
    console.log('listening on http://localhost:5000');
});