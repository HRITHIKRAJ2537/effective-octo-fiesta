const express = require('express');
const bonjour = require('bonjour')();

const app = express();
const PORT = 3000;

// Advertise a service
bonjour.publish({
  name: 'My Windows Device',
  type: 'http',
  port: PORT,
  txt: { description: 'This is a sample mDNS service' }
});

console.log('mDNS service is running. This device can be discovered on the network.');

// Define the /light/on endpoint
app.get('/light-on', (req, res) => {
  console.log('Light has been turned on');
  res.send('Light is now ON');
});
app.get('/light-off', (req, res) => {
    console.log('Light has been turned on');
    res.send('Light is now ON');
  });

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Keep the process alive to continue broadcasting
process.on('SIGINT', () => {
  bonjour.unpublishAll(() => {
    console.log('All mDNS services have been stopped.');
    process.exit();
  });
});
