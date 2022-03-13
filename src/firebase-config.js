import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBbGuUBYWvlFWIPLd-i1IXQmgCJYO0--XI',
  authDomain: 'restaurant-43699.firebaseapp.com',
  projectId: 'restaurant-43699',
  storageBucket: 'restaurant-43699.appspot.com',
  messagingSenderId: '587123624694',
  appId: '1:587123624694:web:ea4cedda746541a7a97ad7',
  measurementId: 'G-BW7XYW0N3Q'
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
