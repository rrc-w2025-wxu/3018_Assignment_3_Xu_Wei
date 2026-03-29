/**
 * Firebase Admin SDK initialization module
 *
 * This module handles the initialization of Firebase Admin SDK for server-side
 * operations. It sets up authentication and Firestore database connections.
 */

/**
 * Firebase Admin SDK initialization module
 *
 * This module handles the initialization of Firebase Admin SDK for server-side
 * operations. It sets up authentication and Firestore database connections.
 */

import { initializeApp, cert, getApps, App, AppOptions, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

const getFirebaseConfig = (): AppOptions => {
    const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

    if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
        throw new Error("Missing Firebase configuration. Please check your environment variables.");
    }

    const serviceAccount: ServiceAccount = {
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };

    return { credential: cert(serviceAccount) };
};

// export
export const initializeFirebaseAdmin = (): App => {
    const existingApp: App | undefined = getApps()[0];
    if (existingApp) return existingApp;
    return initializeApp(getFirebaseConfig());
};

const app: App = initializeFirebaseAdmin();
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

// export db and auth
export { db, auth };