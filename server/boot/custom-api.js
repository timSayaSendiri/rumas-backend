'use strict';
const axios = require('axios');

module.exports = function(server) {
  // Install a `/` route that returns server status
  const router = server.loopback.Router();
  const API_KEY = 'FMTYqeTayozJiH2PNcN3Y2nTqGfVKKoK'
  const HOUSE_LIST_API_URL = 'https://mortgtech-eval-prod.apigee.net/btn-mortgtech/house-list'
  const requestConfig = {
    headers: {
      apikey: API_KEY
    }
  }

  const getHouseListController = async (req, res) => {
    const { keyword } = req.query

    try {
      const { data: { payload } } = await axios.post(HOUSE_LIST_API_URL, { keyword }, requestConfig)

      if (payload) {
        res
          .status(200)
          .send({
            status: 200,
            message: 'Getting house list is success',
            payload
          })
      }

    } catch (err) {
      console.log(err);
      res
        .status(400)
        .send({
          status: 400,
          message: 'Something wrong with your request',
          error: err.message
        })
    }
  }

  router.get('/api/house-list', getHouseListController);

  server.use(router);
};
