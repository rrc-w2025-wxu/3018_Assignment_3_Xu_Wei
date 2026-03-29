import 'dotenv/config';
import { initializeFirebaseAdmin } from '../config/firebaseConfig';
import app from "./app"; // Express app

// Initialize Firebase Admin SDK (e.g., for database or authentication operations)
initializeFirebaseAdmin(); 

// Use the PORT from environment variables if available; otherwise, default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});