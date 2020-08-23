import React, { useState } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';
import Word from './components/Word'
import Summary from './components/Summary'

function App() {

  let [vocab, setVocab] = useState([])
  let [summary, setSummary] = useState([])

  let get_data = () => {
    axios.get("http://localhost:5000/vocab")
      .then(res => {
        setVocab(res.data['store'])
      })
    axios.get('http://localhost:5000/summary')
      .then(res => {
        setSummary(res.data['store'])
      })
      console.log(summary)
  }

  return (
    <div className="App container">
        <button onClick={get_data} className='w-75'>Create Flashcards!</button>
        {vocab.map(word => <Word word={word['word']} defin={word['definition']} note={word['note']}></Word>)}
        <Summary points={summary}></Summary>
    </div>
  );
}

export default App;
