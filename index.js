require('dotenv').config();
const mercadopago = require('mercadopago');
const compression = require('compression');
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(cors());
app.use(express.json());
app.use(compression());

// Configura las credenciales de Mercado Pago
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
  integrator_id: process.env.INTEGRADOR_ID,
});

const headers = {
  Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
};

app.get('/', (req, res) => res.json({ server: 'online' }));

app.get('/preapproval', async (req, res) => {
  try {
    const response = await axios.get('https://api.mercadopago.com/preapproval/search?limit=50', { headers });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

app.get('/preapproval/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get('https://api.mercadopago.com/preapproval/' + id, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

app.post('/preapproval', async (req, res) => {
  const data = req.body;
  try {
    const response = await axios.post('https://api.mercadopago.com/preapproval', data, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

app.put('/preapproval/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const response = await axios.put('https://api.mercadopago.com/preapproval/' + id, data, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

app.get('/preapproval_plan', async (req, res) => {
  try {
    const response = await axios.get('https://api.mercadopago.com/preapproval_plan/search?limit=50', { headers });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

app.get('/preapproval_plan/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get('https://api.mercadopago.com/preapproval_plan/' + id, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

app.post('/preapproval_plan', async (req, res) => {
  const data = req.body;
  try {
    const response = await axios.post('https://api.mercadopago.com/preapproval_plan', data, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

app.put('/preapproval_plan/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const response = await axios.put('https://api.mercadopago.com/preapproval_plan/' + id, data, { headers });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

// CREAR PLAN
app.post('/api/preapproval', async (req, res) => {
  let data = req.body;
  try {
    mercadopago.preapproval
      .create(data)
      .then((resp) => {
        res.json(resp.response);
      })
      .catch((error) => {
        res.status(500).json({ msg: error.message });
      });
  } catch (error) {
    return res.json({ msg: error.message });
  }
});

// BUSCAR PLAN POR ID
app.get('/api/preapproval_plan/:id', async (req, res) => {
  const { id } = req.params;
  try {
    mercadopago.preapproval
      .findById(id)
      .then((resp) => {
        res.json(resp.response);
      })
      .catch((error) => {
        res.status(500).json({ msg: error.message });
      });
  } catch (error) {
    return res.json({ msg: error.message });
  }
});

// BUSCAR TODOS LOS PLANES
app.get('/api/search_plans', async (req, res) => {
  try {
    mercadopago.preapproval
      .search()
      .then((response) => {
        res.json(response.response);
      })
      .catch((error) => {
        res.status(500).json({ msg: error.message });
      });
  } catch (error) {
    return res.json({ msg: error.message });
  }
});

// ACTUALIZAR PLAN
app.put('/api/preapproval_plan', async (req, res) => {
  let data = req.body;
  try {
    mercadopago.preapproval
      .update(data)
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        res.status(500).json({ msg: error.message });
      });
  } catch (error) {
    return res.json({ msg: error.message });
  }
});

app.post('/api/card_token', async (req, res) => {
  const cardData = {
    card_number: '5031755734530604',
    cardholder: {
      name: 'Gerson Aranibar',
      identification: {
        type: 'DNI',
        number: '12345699',
      },
    },
    expiration_month: 11,
    expiration_year: 2025,
    security_code: '123',
    email: 'aranibar28@gmail.com',
  };

  try {
    const cardTokenResponse = await mercadopago.card_token.create(cardData);
    res.json(cardTokenResponse.response);
  } catch (error) {
    return res.json({ msg: error.message });
  }
});

app.post('/api/preapproval2', async (req, res) => {
  let data = req.body;
  try {
    mercadopago.pre
      .create(data)
      .then((resp) => {
        res.json(resp.response);
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
