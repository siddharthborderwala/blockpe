import { PAYMENT_LINK_STATUS } from '../constants';

import firebase from 'firebase';
// Required for side-effects
require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyDY_XDSekHK3nEGq-VxtvthLRCWaJXNHZk',
  authDomain: 'blockpe-db.firebaseapp.com',
  projectId: 'blockpe-db',
  storageBucket: 'blockpe-db.appspot.com',
  messagingSenderId: '235167614224',
  appId: '1:235167614224:web:18ae931b46fbe073e85195',
  measurementId: 'G-BGE126JRJP',
};

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

export async function addUser(payload) {
  const docRef = await db.collection('users').add(payload);
  return docRef.id;
}

export async function getUserByWalletAddress(docId) {
  try {
    const getUserQuery = db
      .collection('users')
      .where('wallet_address', '==', docId);

    const results = await getUserQuery.get();
    const userIds = [];
    results.forEach((doc) => {
      userIds.push(doc.id);
    });
    if (userIds.length) return { id: userIds[0] };
    return false;
  } catch (err) {
    console.error('Error reading user document: ', err);
  }
}

export async function getUserById(userId) {
  try {
    const user = await db.collection('users').doc(userId).get();
    const data = user.data();
    if (data) return data;
    else false;
  } catch (err) {
    console.error('Error reading user: ', err);
  }
}

export async function createLink(userId, metadata) {
  try {
    const paymentRef = await db.collection('paymentLinks').add({
      userId,
      metadata,
      status: PAYMENT_LINK_STATUS.ACTIVE,
    });
    return paymentRef.id;
  } catch (err) {
    console.error('Error creating payment link: ', err);
  }
}

export async function getPaymentLinkById(paymentId) {
  try {
    const paymentDoc = await db.collection('paymentLinks').doc(paymentId).get();
    const data = paymentDoc.data();
    if (data) return data;
    else false;
  } catch (err) {
    console.error('Error reading payment document: ', err);
  }
}

export async function getPaymentLinksByUserId(userId) {
  try {
    const paymentLinksQuery = db
      .collection('paymentLinks')
      .where('userId', '==', userId);
    const results = await paymentLinksQuery.get();

    const links = [];
    results.forEach((doc) => {
      links.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    if (links.length) return links;
    return false;
  } catch (err) {
    console.error('Error reading payment document: ', err);
  }
}

export async function updatePaymentLinkById(paymentId, status) {
  try {
    const paymentDoc = db.collection('paymentLinks').doc(paymentId);
    const data = await paymentDoc.get();
    if (data) {
      await paymentDoc.update({
        status,
      });
    }
  } catch (err) {
    console.error('Error reading payment document: ', err);
  }
}

export async function createUser(payload) {
  try {
    const userRef = await db.collection('users').add({
      ...payload,
    });
    return userRef.id;
  } catch (err) {
    console.error('Error creating user: ', err);
  }
}

export async function updateUser(userId, payload) {
  try {
    const paymentDoc = db.collection('users').doc(userId);
    const data = await paymentDoc.get();
    if (data) {
      await paymentDoc.update({
        ...payload,
      });
    }
  } catch (err) {
    console.error('Error updating user document: ', err);
  }
}
