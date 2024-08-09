
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('Public'));

app.post('/test-request', async (req, res) => {
    const { url, method, data } = req.body;

    try {
        const response = await axios({
            url,
            method,
            data,
        });

        res.json({
            status: response.status,
            headers: response.headers,
            data: response.data,
        });
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            error: error.message,
        });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});