import 'dotenv/config';
import { initializeFirebaseAdmin } from '../config/firebaseConfig';
import app from "./app"; // Express app

initializeFirebaseAdmin(); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});