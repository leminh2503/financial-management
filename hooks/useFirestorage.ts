// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDcikbPQaFJObyloeo7ZzBwFL_AJS1wzBE',
  authDomain: 'firestore-cc482.firebaseapp.com',
  projectId: 'firestore-cc482',
  storageBucket: 'firestore-cc482.appspot.com',
  messagingSenderId: '442296153857',
  appId: '1:442296153857:web:87167a9e9a77b7c4514d00',
  measurementId: 'G-XTMY8CSZQR',
};

console.log(firebaseConfig.apiKey);

if (getApps().length === 0) {
  // Initialize Firebase
  initializeApp(firebaseConfig);
}
// Initialize Firebase
const fbApp = getApp();
const fbStorage = getStorage();

const getImageStorage = async (name: any) => {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${name}`);
  const url = await getDownloadURL(storageRef);
  return url;
};

const uploadStorage = async (uri: string, name: any) => {
  const fetchRepsonse = await fetch(uri);
  const blob = await fetchRepsonse.blob();
  const storage = getStorage();
  const storageRef = ref(storage, `images/${name}`);

  const uploadTask = uploadBytesResumable(storageRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        reject(error);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          resolve(downloadURL);
        });
        // resolve({
        //   downloadUrl: downloadUrl,
        //   metadata: uploadTask.snapshot.metadata,
        // });
      }
    );
  });
};

export { fbApp, fbStorage, uploadStorage, getImageStorage };
