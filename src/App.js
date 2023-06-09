import React, { useRef, useState } from 'react';
//import component
import Modal_html from './components/modal';
import DeleteComp from './components/deleteCardEntryComponent'
import EditComp from './components/editButtonComp'
import Settings from './components/Settings'
import { Helmet } from 'react-helmet';
import './App.css';
//Import both firebase and firestore to comunicate and store information
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import authInfo from './fireBaseData.json';
//image imports
import settingsImage from './images/settings.png'
//Importing hooks for both firebase and firestore
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp(
  //Firebase config from firebase.com
  authInfo
)

//Global variables
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  //accessing the global Auth variable and setting it to user
  const [user] = useAuthState(auth);
  return (
    <div className='App'>
      <Helmet>
        <title>Buildr</title>
      </Helmet>
      <header>
        <Toolbar/>
        <SignOut/>
        <Settings/>
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    //This piece of code uses the Firebase Authentication SDK to authenticate a user with their Google account
    const provider = new firebase.auth.GoogleAuthProvider();
    //This code uses the same Firebase SDK to open up the login popup menu. Once the user has singed in the popup
    //will close and the user's authentication will be updated in the Firebase Authentication system.
    auth.signInWithPopup(provider);
  }
  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )
}

function SignOut() {
  //Check to see if there is a user or not, if there is a user, then it displays the sign out button
  //When a user clicks the button, the auth.signOut() method will be called and the user will be signed out of their current Firebase Authentication session.
  return auth.currentUser && (
    <div>
      <button className='signOutBTN' onClick={() => auth.signOut()}>Sign Out </button>
    </div>

  )
}

function Toolbar() {
  return (
    <div className='moveLeftToolBar'>
      {auth.currentUser && <Modal_html auth={auth} firebase={firebase} firestore={firestore} currentUser={auth.currentUser} />}
    </div>
  )
}

function ChatRoom() {
  const dummy = useRef();
  //Refrence to the firestore collection
  const messagesRef = firestore.collection('messages');
  //query the documents and order them bu their created at timestamps
  const query = messagesRef.orderBy('createdAt').limit(25);
  //Use the datacollection hook to lsiten a change in the data. Anytime react changes, it will
  // change with the latest data
  const [messages] = useCollectionData(query, { idField: 'id' })

  return (
    <main>
      <div className='container'>
        {messages && messages.map(msg => <ChatMessage key={msg.id} messages={msg} />)}
        <div ref={dummy}></div>
      </div>
    </main>
  )
}

function ChatMessage(props) {
  const { projectName, startDate, endDate, material, uid, photoURL, msgId, materialNum } = props.messages;

  //Compares the uid of the user and the message to determine if the current user sent the message or not
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (
    <div >
      <ul className={`message ${messageClass}`}>
        {auth.currentUser && <DeleteComp displayState={`${messageClass}`} auth={auth} firestore={firestore} firebase={firebase} msgId={msgId} uid={uid} currentUser={auth.currentUser.uid} />}
        <img src={photoURL} />
        <h3>[{projectName}]</h3>
        <li>Start : {startDate}</li>
        <li>End : {endDate}</li>
        <li>Materials needed:</li>
        <li>{material}: {materialNum}</li>
        {auth.currentUser && <EditComp displayState={`${messageClass}`} auth={auth} firestore={firestore} firebase={firebase} uid={uid} currentUser={auth.currentUser.uid} msgId={msgId} />}
      </ul>
    </div>
  )

}

export default App;
