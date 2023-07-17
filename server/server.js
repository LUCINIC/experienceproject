const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Importa il body-parser per analizzare il corpo delle richieste POST

const PORT = 5080;

const app = express();

// Configura il body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Importa il modello per la registrazione
const User = require('./models/User');

// Rotta per la registrazione
app.post('/register', async (req, res) => {
  try {
    // Ricevi i dati di registrazione dal frontend
    const { name, email, password } = req.body;

    // Crea un nuovo utente utilizzando il modello User
    const user = new User({ name, email, password });

    // Salva l'utente nel database
    await user.save();

    // Invia una risposta di conferma al frontend
    res.json({ message: 'Registrazione avvenuta con successo!' });
  } catch (error) {
    console.error('Errore durante la registrazione:', error);
    res.status(500).json({ error: 'Si è verificato un errore durante la registrazione.' });
  }
});

// Rotta per l'accesso
app.post('/login', async (req, res) => {
  try {
    // Ricevi i dati di accesso dal frontend
    const { email, password } = req.body;

    // Cerca l'utente nel database tramite l'email
    const user = await User.findOne({ email });

    // Verifica che l'utente esista e la password sia corretta
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Credenziali di accesso non valide.' });
    }

    // Invia una risposta di conferma al frontend
    res.json({ message: 'Accesso effettuato con successo!' });
  } catch (error) {
    console.error('Errore durante l\'accesso:', error);
    res.status(500).json({ error: 'Si è verificato un errore durante l\'accesso.' });
  }
});

const locationRoute = require('./routes/locations');

app.use('/', locationRoute);

mongoose.connect('mongodb+srv://lucacorrado709:qaS9XnzYbbV952Hg@cluster0.abeauqm.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Errore di connesione al database'));
db.once('open', () => {
  console.log('Database connesso correttamente');
});

app.listen(PORT, () => console.log(`Server avviato sulla porta ${PORT}`));
