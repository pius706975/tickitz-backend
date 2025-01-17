import admin, { ServiceAccount } from 'firebase-admin';
import {
    FIREBASE_AUTH_PROVIDER_CERT_URL,
    FIREBASE_AUTH_URI,
    FIREBASE_CLIENT_CERT_URL,
    FIREBASE_CLIENT_EMAIl,
    FIREBASE_CLIENT_ID,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_PRIVATE_KEY_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_TOKEN_URI,
    FIREBASE_TYPE,
} from '.';

const serviceAccount = {
    type: FIREBASE_TYPE,
    project_id: FIREBASE_PROJECT_ID,
    private_key_id: FIREBASE_PRIVATE_KEY_ID,
    private_key: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: FIREBASE_CLIENT_EMAIl,
    client_id: FIREBASE_CLIENT_ID,
    auth_uri: FIREBASE_AUTH_URI,
    token_uri: FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: FIREBASE_CLIENT_CERT_URL,
};

const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    storageBucket: FIREBASE_STORAGE_BUCKET,
});

export default firebaseAdmin;
