const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'your-app.firebaseapp.com',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function login() {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, 'teacher@example.com', 'password123');
    const token = await userCredential.user.getIdToken();
    console.log('ID Token:', token);
  } catch (err) {
    console.error(err);
  }
}

login();
