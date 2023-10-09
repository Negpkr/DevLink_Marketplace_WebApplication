import { initializeApp } from "firebase/app";
import { sendPasswordResetEmail, signOut, getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, browserSessionPersistence, setPersistence } from 'firebase/auth';
import { updateDoc, getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, addDoc, where } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4, v4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyDg62fHOeKPJz_OyzflQVCqwNL3aqFWVsE",
  authDomain: "sit313-mywebapp.firebaseapp.com",
  projectId: "sit313-mywebapp",
  storageBucket: "sit313-mywebapp.appspot.com",
  messagingSenderId: "665282681025",
  appId: "1:665282681025:web:5c18842ce1b3fd91f7dc40"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

// Authentication
export const auth = getAuth();

// Set persistence to ensure 2FA works
setPersistence(auth, browserSessionPersistence);

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Firestore
export const db = getFirestore();

// Firebase Storage
export const storage = getStorage(firebaseApp); 

// Upload job image to Storage and save its URL in Firebase
export const uploadImageAndSaveURL = async (imageFile) => {
  try {
    const timestamp = new Date().getTime();
    const imageFileName = `image/${timestamp}_${v4()}`;
    const imageRef = ref(storage, imageFileName)
    await uploadBytes(imageRef, imageFile)
    const imageUrl = await getDownloadURL(imageRef);
    //console.log("Image uploaded and URL saved successfully.");

    return imageUrl;

  } catch (error) {
    console.error("Error uploading image:", error.message);
  }
}

//Create Firebase collection and add documents
export const createCollectionAndAddDocuments = async (collectionName, objectsToAdd) => {
  const collectionRef = collection(db, collectionName)
  const batch = writeBatch(db)
  for (const object in objectsToAdd) {
    if (objectsToAdd.hasOwnProperty(object)) {
      const value = objectsToAdd[object];
      //console.log(object)
      const docRef = doc(collectionRef, objectsToAdd.title.toLowerCase());
      if (value != "")
        batch.set(docRef, objectsToAdd)
    }
  }
  await batch.commit()
  //console.log('Job added successfully!')
}

//Fetch job documents from firebase
export const fetchJobAndDocuments = async (collectionName) => {
  const collectionRef = collection(db, collectionName)
  const q = query(collectionRef)
  const querySnapshot = await getDocs(q);
  const jobMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { key, ...items } = docSnapshot.data();
    acc[key] = items
    return acc;
  }, {})
  return jobMap;
}

//Fetch user documents from firebase
export const fetchUsersAndDocuments = async () => {
  const collectionRef = collection(db, 'users')
  const q = query(collectionRef)
  const querySnapshot = await getDocs(q);
  const userMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { email, ...items } = docSnapshot.data();
    acc[email] = items
    return acc;
  }, {})
  return userMap;
}

//Create User document and Authorisation
export const createUserDocFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth.email) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  //console.log(userSnapshot);

  //if the data exist
  //console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    }
    catch (error) {
      console.log('error in creating ', error.message)
    }
  }
  return userDocRef;
}

//for create account
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return null;
  return await createUserWithEmailAndPassword(auth, email, password)
}

//fot login
export const SigninAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return null;
  return await signInWithEmailAndPassword(auth, email, password)
}

//SignOut function added for Task 9.1 
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error.message);
  }
};

// Function to send a password reset email
export const sendPasswordReset = async (email) => {
  try {
    // Check if a reset email has already been sent to this user
    const userRef = doc(db, 'users', email);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      if (data.passwordResetRequested) {
        console.log('A reset email has already been sent to this user.');
        return;
      }
    }

    // If not, send the reset email
    await sendPasswordResetEmail(auth, email);

    // Mark that a reset email has been requested for this user
    await updateDoc(userRef, {
      passwordResetRequested: true,
    });

    console.log('Password reset email sent successfully.');
  } catch (error) {
    console.error('Error sending password reset email:', error.message);
  }
};

//create a collection for messages in firebase
export const createMessageCollectionAndAddMessage = async (message) => {
  const collectionRef = collection(db, 'messages');
  const docRef = doc(collectionRef, uuidv4()); // Use a unique ID for each message
  try {
    await setDoc(docRef, message);
    console.log('Message added successfully!');
  } catch (error) {
    console.error('Error adding message:', error.message);
  }
}

//get uid of 'users' collection by email
export const getDocumentIdByEmail = async (email) => {
  const usersCollection = collection(db, 'users');
  const q = query(usersCollection, where('email', '==', email));
  try {
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      // if no matching document found
      return null;
    }
    // Get the document ID from the first matching document
    const document = querySnapshot.docs[0];
    return document.id;
  }
  catch (error) {
    console.error('Error fetching document ID by email:', error.message);
    throw error;
  }
};

// Function to update user's display name or 2FA (Based on the name value) by email
export const updateUserName = async (email, value, choose_name) => {
  try {
    const uid = await getDocumentIdByEmail(email);
    const userDocRef = doc(db, "users", uid);

    if (choose_name) {
      await updateDoc(userDocRef, {
        displayName: value,
      });
    }
    else {
      await updateDoc(userDocRef, {
        TwoFactorAuthEnable: value,
      });
    }
    return true; // Return true to indicate success
  }
  catch (error) {
    console.error("Error updating:", error.message);
  }
};
