// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyCdREJpxj-9z-zJ9BzshspPGg08p3oKk80",
  authDomain: "my-app-db-a944d.firebaseapp.com",
  projectId: "my-app-db-a944d",
  storageBucket: "my-app-db-a944d.firebasestorage.app",
  messagingSenderId: "300509012119",
  appId: "1:300509012119:web:8146b2a159fd7fe6f3c9d2",
  measurementId: "G-MQVCY94GJK"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)