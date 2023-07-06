const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const photosRouter = require('./routes/photos');

const app = express();

mongoose.connect('mongodb://localhost:27017/photos',
                {useNewUrlParser: true,
                useUnifiedTopology: true})
.then((db) => {
  console.log("database connected on " + db.connection.host);
}).catch((error) => {
  console.log(error);
});

app.use(cors());
app.use(express.json());

app.use('/photos', photosRouter);

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000.');
});
