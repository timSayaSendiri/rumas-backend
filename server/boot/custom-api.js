'use strict';
const axios = require('axios');
const API_KEY = 'FMTYqeTayozJiH2PNcN3Y2nTqGfVKKoK';
const requestConfig = {
  headers: {
    apikey: API_KEY
  }
}
const HOUSE_LIST_API_URL = 'https://mortgtech-eval-prod.apigee.net/btn-mortgtech/house-list'

module.exports = function(server) {
  // Install a `/` route that returns server status
  const router = server.loopback.Router();

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

  const postUserRegister = async (req, res) => {
    const CREATE_USER_API = 'https://mortgtech-eval-prod.apigee.net/btn-mortgtech/user-register'
    const {
      nik,
      nama,
      tgl_lahir,
      nama_ibu_kandung
    } = req.query
    try {
      const { data: { payload } } = await axios.post(CREATE_USER_API, {
        nik,
        nama,
        tgl_lahir,
        nama_ibu_kandung
      }, requestConfig)

      if (payload) {
        res
          .status(200)
          .send({
            status: 200,
            message: 'Create User Success',
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

  const accountCreation = async (req, res) => {
    const CREATE_USER_API = 'https://mortgtech-eval-prod.apigee.net/btn-mortgtech/account-creation'
    const {
      nomor_cif,
      amount
    } = req.query
    
    try {
      const { data: { payload } } = await axios.post(CREATE_USER_API, {
        nomor_cif,
        amount: parseInt(amount, 10)
      }, requestConfig)

      if (payload) {
        res
          .status(200)
          .send({
            status: 200,
            message: 'Account Creation Success',
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
  router.get('/api/user-register', postUserRegister);
  router.get('/api/account-creation', accountCreation);

  server.use(router);
};
