import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function main() {
  const docRef = doc(db, 'WebContentsNew', 'events_kahaani');
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const data = docSnap.data();
    let updated = false;
    
    // deeply traverse the data to replace "25" with "26" in specific context
    const replaceText = (text: string) => {
        let newText = text.replace(/Antaragni'25/g, "Antaragni'26");
        newText = newText.replace(/Antaragni’25/g, "Antaragni’26");
        newText = newText.replace(/August'25/g, "August'26");
        newText = newText.replace(/August’25/g, "August’26");
        return newText;
    };

    const processObj = (obj: any) => {
      for (const key in obj) {
        if (typeof obj[key] === 'string') {
          const newText = replaceText(obj[key]);
          if (newText !== obj[key]) {
            obj[key] = newText;
            updated = true;
          }
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          processObj(obj[key]);
        }
      }
    };

    processObj(data);

    if (updated) {
      await updateDoc(docRef, data);
      console.log('Document updated!');
    } else {
      console.log('No changes needed.');
    }
  } else {
    console.log('No such document!');
  }
}

main().catch(console.error);
