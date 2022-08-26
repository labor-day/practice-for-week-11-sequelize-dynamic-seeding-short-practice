'use strict';

//import models
const {Musician, Band} = require('../models');

//define seed data
const bandMusicians = [
  {
    name: 'The Falling Box',
    musicians: [
      { firstName: 'Adam', lastName: 'Appleby' },
      { firstName: 'Anton', lastName: 'Martinovic' },
      { firstName: 'Wilson', lastName: 'Holt' }
    ]
  },
  {
    name: 'America The Piano',
    musicians: [
      { firstName: 'Marine', lastName: 'Sweet' },
      { firstName: 'Georgette', lastName: 'Kubo' }
    ]
  },
  {
    name: 'Loved Autumn',
    musicians: [
      { firstName: 'Aurora', lastName: 'Hase' }
    ]
  },
  {
    name: 'Playin Sound',
    musicians: [
      { firstName: 'Trenton', lastName: 'Lesley' },
      { firstName: 'Camila', lastName: 'Nenci' }
    ]
  },
  {
    name: 'The King River',
    musicians: [
      { firstName: 'Rosemarie', lastName: 'Affini' },
      { firstName: 'Victoria', lastName: 'Cremonesi' }
    ]
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let bandIndex = 0; bandIndex < bandMusicians.length; bandIndex++) {
      const {name, musicians} = bandMusicians[bandIndex];
      const band = await Band.findOne({where: {name}});

      for (let musicianIndex = 0; musicianIndex < musicians.length; musicianIndex++) {
        const musician = musicians[musicianIndex];
        await band.createMusician(musician);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    for (let bandIndex = 0; bandIndex < bandMusicians.length; bandIndex++) {
      const {name, musicians} = bandMusicians[bandIndex];
      const band = await Band.findOne({where: {name}});

      for (let musicianIndex = 0; musicianIndex < musicians.length; musicianIndex++) {
        const musician = musicians[musicianIndex];
        await Musician.destroy({where:{...musician, bandId: band.id}});
      }
    }
  }
};
