'use strict';

//import models
const {Musician, Instrument} = require('../models');
//import Op for queries
const {Op} = require('sequelize');

//define seed data
const musicianInstruments = [
  {
    musician: { firstName: 'Adam', lastName: 'Appleby' },
    instruments: [{ type: 'piano' }, { type: 'guitar' }]
  },
  {
    musician: { firstName: 'Anton', lastName: 'Martinovic' },
    instruments: [{ type: 'piano' }, { type: 'bass' }]
  },
  {
    musician: { firstName: 'Wilson', lastName: 'Holt' },
    instruments: [{ type: 'cello' }]
  },
  {
    musician: { firstName: 'Marine', lastName: 'Sweet' },
    instruments: [{ type: 'saxophone' }]
  },
  {
    musician: { firstName: 'Georgette', lastName: 'Kubo' },
    instruments: [{ type: 'drums' }, { type: 'trumpet' }, { type: 'saxophone' }]
  },
  {
    musician: { firstName: 'Aurora', lastName: 'Hase' },
    instruments: [{ type: 'violin' }, { type: 'cello' }]
  },
  {
    musician: { firstName: 'Trenton', lastName: 'Lesley' },
    instruments: [{ type: 'piano' }]
  },
  {
    musician: { firstName: 'Camila', lastName: 'Nenci' },
    instruments: [{ type: 'piano' }]
  },
  {
    musician: { firstName: 'Rosemarie', lastName: 'Affini' },
    instruments: [{ type: 'piano' }, { type: 'violin' }]
  },
  {
    musician: { firstName: 'Victoria', lastName: 'Cremonesi' },
    instruments: [{ type: 'violin' }]
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {

    for (let i = 0; i < musicianInstruments.length; i++) {
      let {musician, instruments} = musicianInstruments[i];
      let targetMusician = await Musician.findOne({
        where: {
          firstName: musician.firstName,
          lastName: musician.lastName
        }
      });
      let targetInstruments = await Instrument.findAll({
        where: {
          [Op.or]: instruments
        }
      });

      await targetMusician.addInstruments(targetInstruments);
    }
  },

  down: async (queryInterface, Sequelize) => {

    for (let i = 0; i < musicianInstruments.length; i++) {
      let {musician, instruments} = musicianInstruments[i];
      let targetMusician = await Musician.findOne({
        where: {
          firstName: musician.firstName,
          lastName: musician.lastName
        }
      });
      let targetInstruments = await Instrument.findAll({
        where: {
          [Op.or]: instruments
        }
      });

      await targetMusician.removeInstruments(targetInstruments);
    }
  }
};
