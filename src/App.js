import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import SearchForm from './components/SearchForm';
import Suggestion from './components/Suggestion';
import {useState} from 'react'

import OpenReplay from '@openreplay/tracker';
import trackerFetch from '@openreplay/tracker-fetch/cjs';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/loginButton';
import LogoutButton from './components/logoutButton';


const users = ["fernando.doglio@gmail.com", "adam.sandler@fakeeamil.com", "thisisatest@gmail.com", "tomholland@imspiderman.com"]

//...
const tracker = new OpenReplay({
  projectKey: "ALGr6OX4AciTnIyeJZnY"
});
let userId  = users[Math.ceil(Math.random() * 3)]
tracker.setUserID(userId);
const fetch = tracker.use(trackerFetch({
  sanitiser: (data) => {
    data.url = data.url.replace(/phonenumber=([0-9]+)/, "phonenumber=XXXXXX")
    return data
  }
}))
tracker.start();

function App() {

  let [activity, setActivity]  = useState(null)
  let {isAuthenticated} = useAuth0()

  if(isAuthenticated) {
    tracker.event('user_logged_in', userId)
    return (
      <div className="App">
        <header className="App-header">
          <h1>I'm bored!</h1>
          <h3>Find me something to do...</h3> 
        </header>
        <SearchForm setResult={setActivity} fetcher={fetch}></SearchForm>
        {activity && <Suggestion activity={activity} ></Suggestion>}
        <img src="incorrect-path.jpg" alt="this is broken" />
        <LogoutButton />
      </div>
      )
  } else {
    return <LoginButton />
  }
  
}

export default App;
