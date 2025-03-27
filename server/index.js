import express from 'express';
import cors from 'cors';
import user from './routers/users.js';
import categories from './routers/categories.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', user);
app.use('/categories', categories);

app.get('/', (req, res) => {
    res.send('server running');
});

app.listen(5000, () => {
    console.log('listening on http://localhost:5000');
});