const express = require('express');
const app = express();
app.use(express.json());

let inventory = [
    { id: 1, item: 'Balaji Special Thali', quantity: 15 },
    { id: 2, item: 'Paneer Chatpata Thali', quantity: 20 }
];

app.get('/api/inventory', (req, res) => res.status(200).json(inventory));
app.post('/api/inventory', (req, res) => {
    const newItem = { id: inventory.length + 1, ...req.body };
    inventory.push(newItem);
    res.status(201).json(newItem);
});
app.get('/health', (req, res) => res.status(200).send('OK'));

if (require.main === module) {
    app.listen(3000, () => console.log('Canteen API running on port 3000'));
}
module.exports = app;