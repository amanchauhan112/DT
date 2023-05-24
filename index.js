const express = require('express')
const app = express();
const PORT = 8080
const routes = require('./routes')

require('./conn/conn');

app.use(express.json());

app.use('/api/v3/app', routes)

app.listen(PORT, () => {
    console.log(`Server listening to PORT:${PORT}`);
})
