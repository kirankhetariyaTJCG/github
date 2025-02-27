// Ensure environment variables are properly loaded and not undefined
const firebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;
const firestoreLogEvents = process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_LOG;
// const firestoreLogEvents = false;

if (!firebaseConfig || !firestoreLogEvents) {
    throw new Error("Firebase config or Firestore logging flag is missing in environment variables");
}

// Cast the values to string and export them
export const FIREBASE_CONFIG = firebaseConfig as string;
export const FIREBASE_LOG_EVENTS = firestoreLogEvents as string;

export const FIREBASE_EVENT_CATEGORY = {
    // Define your categories here
};

export const FIREBASE_LOG_KEY = {
    // Define your log keys here
};

export const FIREBASE_LOG_VALUE = {
    // Define your log values here
};