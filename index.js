const express = require('express');
const cors = require('cors')

const PORT = process.env.PORT || 8080;
const app = express();
const auth = require('./routes/auth.routes');
app.use(cors());
app.use(express.json())
app.use('/auth', auth);


app.listen(PORT, () => console.log("App started at port " + PORT))
