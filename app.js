const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const os = require('os');
const fileRoutes = require('./routes/fileRoutes');
const authRoutes = require('./routes/authRoutes');
const config = require('./config');
const morgan = require('morgan')

const app = express();


mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const version = 'v1'

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(`/${version}/files`, fileRoutes);
app.use(`/${version}/auth`, authRoutes);


function getServerIP() {
  const interfaces = os.networkInterfaces();
  for (const iface in interfaces) {
    for (const alias of interfaces[iface]) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return 'localhost'; 
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  const serverIP = getServerIP();
  console.log(`Server running at http://${serverIP}:${PORT}/${version}`);
});
