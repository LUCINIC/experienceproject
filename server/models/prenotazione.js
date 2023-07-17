const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prenotazioneSchema = new Schema({
  name: String,
  email: String,
  message: String,
});

const Prenotazione = mongoose.model('Prenotazione', prenotazioneSchema);
module.exports = Prenotazione;
