const express = require('express');
require('dotenv').config();   

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
// app.use(dotenv.config());
const app = express();

// dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
        