require('dotenv').config();
const mercadopago = require('mercadopago');
const compression = require('compression');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());

// Configura las credenciales de Mercado Pago
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
  integrator_id: process.env.INTEGRADOR_ID,
});

app.get('/', (req, res) => res.json({ welcome: 'Server online' }));

app.post('/api/checkout', async (req, res) => {
  let data = req.body;
  try {
    let payload = build_data(data); // Construir preferencias

    mercadopago.preferences
      .create(payload)
      .then((response) => {
        res.json({ id: response.body.id, payload }); // Retornar GUID
      })
      .catch((error) => {
        res.status(500).json({ msg: error.message });
      });
  } catch (error) {
    return res.json({ msg: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log('Servidor iniciado en el puerto ' + process.env.PORT);
});

const build_data = (data) => {
  return {
    items: [
      {
        title: data.title,
        quantity: data.quantity,
        currency_id: data.currency_id,
        unit_price: data.unit_price,
      },
    ],
    payer: {
      name: 'Raul Alvarez',
      email: data.email,
    },
    external_reference: 'Referencia externa de la compra',
  };
};
