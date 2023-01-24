import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import SearchForm from './components/SearchForm';
import Suggestion from './components/Suggestion';
import {useState} from 'react'

import OpenReplay from '@openreplay/tracker';
//import OpenReplay from './lib/openreplay-assist.js'

console.log(OpenReplay)

const users = ["fernando.doglio@gmail.com", "adam.sandler@fakeeamil.com", "thisisatest@gmail.com", "tomholland@imspiderman.com"]

//...
const tracker = new OpenReplay({
  projectKey: "VxaDL82EFmzUsOFeUvSt",
  __DISABLE_SECURE_MODE: true,
  ingestPoint: "https://foss.openreplay.com/ingest",
  network: {
    capturePayload: true,
    sanitizer: (data) => {
      data.url = data.url.replace(/phonenumber=([0-9]+)/, "phonenumber=XXXXXX")
      return data
    }
    }
});
let userId  = users[Math.ceil(Math.random() * 3)]
tracker.setUserID(userId);
tracker.start();

function App() {

  let [activity, setActivity]  = useState(null)
    
  return (
    <div className="App">
      <header className="App-header">
        <h1>I'm bored!</h1>
        <h3>Find me something to do...</h3> 
      </header>
      <SearchForm setResult={setActivity} fetcher={fetch}></SearchForm>
      {activity && <Suggestion activity={activity} ></Suggestion>}
    </div>
    )
  }
  

export default App;
