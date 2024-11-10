const express = require('express');
const bonjour = require('bonjour')();
const cors = require('cors');

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

let devices = [];

bonjour.find({ type: 'http' }, (service) => {
  console.log('Found device:', service);

  if (service.name.toLowerCase()) {
    // Filter only IPv4 addresses
    const ipv4Addresses = service.addresses.filter(address => address.includes('.'));

    devices.push({
      name: service.name,
      host: service.host,
      port: service.port,
      addresses: ipv4Addresses, // Store only IPv4 addresses
    });
  }
});

app.get('/devices', (req, res) => {
  res.json(devices);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
