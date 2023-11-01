import { useState, useEffect, useMemo } from 'react'
import React from 'react'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import './App.css'
import ReactMarkdown from "react-markdown";

const defMark = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... **_both!_**

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

- And of course there are lists.
  - Some are bulleted.
      - With different indentation levels.
        - That look like this.
`

function App(){
    const [mark,setMark]=useState(defMark)
    const [isTextareaVisible, setTextareaVisible] = useState(true);
    const toggleTextareaStyles = () => {
      setTextareaVisible(!isTextareaVisible);
    };
    const textareaClassName = isTextareaVisible ? 'block' : 'none';
    console.log(isTextareaVisible)
    return(
      <>
      <div className="d-block m-4 p-1 div1">
        <div className="d-flex justify-content-between ">
          <span>Should be font awesome</span>
          <button className="btn btn-sm" onClick={toggleTextareaStyles}>#</button>
        </div>
        <textarea id="editor" style={{display:textareaClassName}} name="editor" value={mark} onChange={(e)=>setMark(e.target.value)}>
        </textarea>
      </div>
      <div id="preview" className="text-start ps-3">
        <ReactMarkdown>{mark}</ReactMarkdown>
      </div>
      </>
    )
}


function Global(){
    return(
    //<Provider store={store}>
        <div id="" className="d-flex flex-column justify-content-center">
          <App/>
        </div>
    //</Provider>
    )
}

export default Global; 
//--------------------------------------------------
/*
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
};*/