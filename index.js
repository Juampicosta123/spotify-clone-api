require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const { dbConnect } = require('./config/dbConnect');


app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/album', require('./routes/album'));
app.use('/api/song', require('./routes/song'));
app.use('/api/playlist', require('./routes/playlist'));
app.use('/api/search', require('./routes/search'));
app.use('/api/queue', require('./routes/queue'));


app.listen(PORT, () => {
    console.log(`server is running at PORT ${PORT}`);
  });

dbConnect();