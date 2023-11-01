import { useState, useEffect, useMemo } from 'react'
import React from 'react'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import './App.css'

//Redux
const SET_BUTTON_CLICK = 'SET_BUTTON_CLICK';
const setQuote = (quote,auth) => {
  return {
    type: 'SET_QUOTE',
    quote,
    auth,
  };
};
const initialState = {
  quote: '',
  auth:'',
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUOTE':
      return {
        ...state,
        quote: action.quote,
        auth: action.auth
      };
    default:
      return state;
  }
};
const store = createStore(reducer);

//---------------------------------------------------------------------------------
//React-Redux
const mapStateToProps = (state) => ({
  quote: state.quote,
  auth: state.auth
});

const mapDispatchToProps = {
  setQuote,
};
const TxtApp=connect(mapStateToProps, mapDispatchToProps)(Text);

//---------------------------------------------------------------------------------
//React
function Text({ quote, auth, setQuote }) {
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    const newQt =()=>{
      fetch("https://type.fit/api/quotes")
        .then(resp => resp.json())
        .then(data =>{
          const idx=Math.floor(Math.random()*data.length)
          const fltr=[data[idx].text,data[idx].author.split(",")[0].trim()]
          setQuote(fltr[0],fltr[1])
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
        document.body.style.backgroundColor = getRandomColor();
        //document.getElementsByClassName("card").style.backgroundColor = getRandomColor()
    };
    useEffect(()=>{
      newQt()
    },[])
    return (
        <div className="card d-flex flex-column justify-content-center" style={{margin:"0 auto",width:'450px', height:'250px'}}>
          {quote && <span id="text" className="d-block m-3">{quote}</span>}
          <span id="author" className="d-flex justify-content-end m-3 pe-5">{auth}</span>
          <div className="d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-between">
              <div style={{margin:"auto 0",paddingTop:"18px",paddingLeft:"15px"}}><a id="tweet-quote" href="https://twitter.com/intent/tweet" className="twitter-share-button" data-show-count="false">Tweet</a></div>
              <button id="new-quote" className="" onClick={newQt}>New Quote</button>
            </div>
          </div>
        </div>
    );
};

function Global() {
    return (
      <Provider store={store}>
        <div id="quote-box" className="d-flex justify-content-center">
          <TxtApp/>
        </div>
      </Provider>
    );
};

export default Global; 




//---------------------------------------------------------------------------------------------------------------
/*
// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

const store = createStore(
  messageReducer,
  applyMiddleware(thunk)
);

// React:

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    this.setState((state) => ({
      input: '',
      messages: state.messages.concat(state.input)
    }));
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button className ="btn btn-primary mt-2" onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {messages: state}
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message))
    }
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container/>
      </Provider>
    );
  }
};
*/