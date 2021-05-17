import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAIh-1Y8FCa-9E6vEhsnIbVijvHtS499IY',
  authDomain: 'shopee-developers-case.firebaseapp.com',
  databaseURL: 'https://shopee-developers-case.firebaseio.com',
  projectId: 'shopee-developers-case',
  storageBucket: 'shopee-developers-case.appspot.com',
  messagingSenderId: '435889301460',
  appId: '1:435889301460:web:dfc427dccbf9e764c91841',
}

firebase.initializeApp(firebaseConfig)

export default firebase
