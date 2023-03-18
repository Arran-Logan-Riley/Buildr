import React, {useRef, useState} from 'react';
import './App.css';
//Import both firebase and firestore to comunicate and store information
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import authInfo from './fireBaseData.json';

//import 'firebase/analytics';
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
//const analytics = firebase.analytics();

function App() {
  //accessing the global Auth variable and setting it to user
  const [user] = useAuthState(auth);
  return (
    <div className='App'>
    <header>
    <SignOut/>
    </header>
    <section>
      {user ? <ChatRoom/>: <SignIn/>}
    </section>
  </div>
  );
}

function SignIn(){
  const signInWithGoogle = () =>{
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

function SignOut(){
  //Check to see if there is a user or not, if there is a user, then it displays the sign out button
  //When a user clicks the button, the auth.signOut() method will be called and the user will be signed out of their current Firebase Authentication session.
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom (){
  const dummy = useRef();
  //Refrence to the firestore collection
  const messagesRef = firestore.collection('messages');
  //query the documents and order them bu their created at timestamps
  const query = messagesRef.orderBy('createdAt').limit(25);
  //Use the datacollection hook to lsiten a change in the data. Anytime react changes, it will
  // change with the latest data
  const [messages] = useCollectionData(query, {idField: 'id'})
  //Will receive value from from and set the form value to the formValue variable
  const [formValue, setFormValue] = useState('');
  //set uid and photo URL to the current user so this can be accessed in the async method
  const {uid, photoURL} = auth.currentUser

  const sendMessage = async(e) =>{
    //when a form is submitted it will re-load the page, prevent default stops this from occuring
    e.preventDefault();
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })
    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <main>
    <div>
      {messages && messages.map(msg => <ChatMessage key={msg.id} messages={msg}/>)}
      <div ref={dummy}></div>
    </div>
    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
      <button type='submit'>Send message</button>
    </form>
    </main>
  )
}

function ChatMessage(props){
  const {text, uid, photoURL} = props.messages;
  //Compares the uid of the user and the message to determine if the current user sent the message or not
  const messageClass = uid === auth.currentUser.uid ? 'send' : 'received';
//console.log(auth.currentUser);
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL}/>
      <p>{text}</p>
    </div>
  )
  
}

export default App;
