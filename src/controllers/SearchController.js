const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArrays = require('../utils/parseStringAsArrays');

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArrays(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
           },
           location: {
               $near: {
                   $geometry: {
                       type: 'Point',
                       coordinates: [longitude, latitude],
                   },
                   $maxDistance: 1000,
               }
           }
        });

        return response.json(devs);
    }
};