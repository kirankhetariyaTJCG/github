import { initializeApp } from "firebase/app";
import { doc, setDoc, getFirestore, Firestore } from "firebase/firestore";

import { FIREBASE_CONFIG, FIREBASE_LOG_EVENTS } from "@/Helper/Constants/FirebaseConstants";
import { RESTAURANT_DATA } from "../Constants/PublicVariable";

// Define types for the parameters passed to the log function
type LogParams = [string, string, any] | [string, any];

const app = initializeApp(JSON.parse(FIREBASE_CONFIG));

const db: Firestore | null = FIREBASE_LOG_EVENTS ? getFirestore(app) : null;

// Function to extract parameters from log function
const extractParams = (params: LogParams) => {
    let category: string | null = params.length === 3 ? params[0] : null;
    let key: string = params[params.length === 3 ? 1 : 0];
    let value: any = params[params.length === 3 ? 2 : 1];

    return { category, key, value };
};

// Function to generate log object
const generateLogObj = (category: string | null, key: string, value: any) => {
    const dateTime = +new Date().getTime();
    const timestamp = Math.floor(dateTime / 10);
    key = timestamp + "_" + key;
    let obj: { [key: string]: any } = { [key]: value };
    if (category) {
        obj = { [category]: obj };
    }

    return obj;
};

export const LogFirebase = async (...params: LogParams): Promise<void> => {
    if (FIREBASE_LOG_EVENTS) {
        let { category, key, value } = extractParams(params);

        if (db) {
            const obj = generateLogObj(category, key, value);

            try {
                const Table: any = RESTAURANT_DATA.ID;
                const TableData: any = RESTAURANT_DATA.currentpath;
                const document = doc(db, Table, TableData); // Create the document reference
                await setDoc(document, obj, { merge: true }); // Merge the log into the Firestore document
            } catch (error) {
                console.error(error);
            }
        }
    }
};
