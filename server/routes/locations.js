const express = require('express');
const router = express.Router();
const Prenotazione = require('../models/prenotazione');

// Aggiungi la nuova route per la gestione delle prenotazioni
router.post('/prenotazioni', (req, res) => {
  const { name, email, message } = req.body;

  // Crea un nuovo oggetto prenotazione utilizzando il modello Prenotazione
  const prenotazione = new Prenotazione({
    name,
    email,
    message,
  });

  // Salva la prenotazione nel database
  prenotazione.save((err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Errore durante la salvataggio della prenotazione' });
    } else {
      res.status(200).json({ message: 'Prenotazione effettuata con successo' });
    }
  });
});

module.exports = router;
