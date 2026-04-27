const { MercadoPagoConfig, Preference } = require('mercadopago');

exports.handler = async (event) => {
  try {
    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
    const preference = new Preference(client);
    const body = JSON.parse(event.body);

    const result = await preference.create({
      body: {
        items: [{
          title: body.lecturaLabel || "Lectura de Tarot",
          quantity: 1,
          unit_price: Number(body.sena),
          currency_id: 'ARS'
        }],
        auto_return: 'approved',
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: result.id, init_point: result.init_point })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
