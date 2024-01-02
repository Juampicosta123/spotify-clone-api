require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const { dbConnect } = require('./config/dbConnect');

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/songs', require('./routes/song'));

app.listen(PORT, () => {
    console.log(`server is running at PORT ${PORT}`);
  });

dbConnect();