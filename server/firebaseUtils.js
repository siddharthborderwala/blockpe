import { PAYMENT_LINK_STATUS } from "../contants";

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDY_XDSekHK3nEGq-VxtvthLRCWaJXNHZk",
  authDomain: "blockpe-db.firebaseapp.com",
  projectId: "blockpe-db",
  storageBucket: "blockpe-db.appspot.com",
  messagingSenderId: "235167614224",
  appId: "1:235167614224:web:18ae931b46fbe073e85195",
  measurementId: "G-BGE126JRJP",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

export async function addUser(payload) {
  try {
    const docRef = await db.collection("users").add(payload);
    return docRef.id;
  } catch (err) {
    console.error("Error adding user document: ", error);
  }
}

export async function getUser(docId) {
  try {
    const doc = await db.collection("users").doc(docId);
    const data = doc.get();
    if(data.exists) return data
    else false;
  } catch (err) {
    console.error("Error reading user document: ", error);
  }
}

export async function createLink(userId, metadata) {
  try {
    const paymentRef = await db.collection("paymentLinks").add({
      userId,
      data: metadata,
      status: PAYMENT_LINK_STATUS.PENDING,
    });
    return paymentRef.id;
  } catch (err) {
    console.error("Error creating payment link: ", error);
  }
}


export async function getPaymentLinkById(paymentId) {
  try {
    const paymentDoc = await db.collection("paymentLinks").doc(paymentId);
    const data = paymentDoc.get();
    if(data.exists) return data
    else false;
  } catch (err) {
    console.error("Error reading payment document: ", error);
  }
}

export async function getPaymentLinksByUserId(userId) {
  try {
    const paymentDocs = await db.collection("paymentLinks").where("userId", "==", userId);
    const data = await Promise.all(paymentDocs.map(async doc => await doc.get()));
    if(data.exists) return data
    else false;
  } catch (err) {
    console.error("Error reading payment document: ", error);
  }
}

export async function updatePaymentLinkById(paymentId, status) {
  try {
    const paymentDoc = await db.collection("paymentLinks").doc(paymentId);
    const data = paymentDoc.get();
    if(data.exists) {
      paymentDoc.set({
        status
      })
    }
  } catch (err) {
    console.error("Error reading payment document: ", error);
  }
}

