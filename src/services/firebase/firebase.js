import { createUnifireFirebaseApp } from '@unifire-js/firebase';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';
import { FIREBASE_CONFIG } from '@root/app-settings';

initializeApp(FIREBASE_CONFIG);
createUnifireFirebaseApp(FIREBASE_CONFIG);

export const auth = getAuth();
export const database = getDatabase();
export const functions = getFunctions();
export const storage = getStorage();