import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// import configureStore from './configureStore'
import axios from 'axios'
import { createStore } from 'redux'
import assetsReducer from './stateManagement/assetsReducer'

const initialState = []

const store = createStore(assetsReducer, initialState)

function parseData(data) {
  const assets = data.data.data

  store.dispatch({ type: 'RECEIVE_ASSETS', assets })
}

axios.get('http://api.getchute.com/v2/albums/aus6kwrg/assets')
.then(function (response) {
  parseData(response)
})
.catch(function (error) {
  console.log(error)
})

function render () {
  ReactDOM.render(
    <App assets={ store.getState() }
      dispatch={ store.dispatch }
    />,
    document.getElementById('root')
  );
}

store.subscribe(render)
render()
