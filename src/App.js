import logo from './logo.svg';
import './App.css';
import Spinner from './Spinner'
import Images from './Images'
import Buttons from './Buttons'


// 0. Import dependencies
import * as tf from "@tensorflow/tfjs"
import * as imageRec from "@tensorflow-models/mobilenet"


import React, {useEffect, useState} from "react"

const API_URL = "localhost"
const App = () => {

  // 1. Create model and action states
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(null);


  // 2. Create Recognizer
  const loadModel = async () =>{
    const recognizer = await imageRec.load();
    console.log("Model Loaded");
    setModel(recognizer)
  }

  function previewFile() {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      preview.src = reader.result;
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }

    setPrediction("")
  }

  const removeImage = () => {
    setImage(null)
  }

  useEffect(()=>{loadModel()}, []);

  // 3. Listen for Actions
  const recognizeImage = async () => {
    const image = document.querySelector('img');
    if(image!=null){
      console.log("Listenning for image");
      const prediction = await model.classify(image);
      console.log(prediction)
      setPrediction("This is a "+ prediction[0].className +" and I am "+ prediction[0].probability*100 + "% sure.")
    }
  }

  const content = () => {
    if (uploading) {
      return <Spinner />
    }
    else if (image === null){
      return <Buttons onChange={previewFile} />
    }
    else{
      return <Images image={image} removeImage={removeImage}/>
    }
  }

  const renderPrediction = () => {
    return <div>{prediction}</div>
  }

  return (
    <div className="App">
      <header className="App-header">
        {content()}
        <div id='predlabel'>
          <label >
            Prediction is : {renderPrediction()}
          </label>
        </div>
        <button onClick={recognizeImage}>Guess!</button>
      </header>
    </div>
  );
}

export default App;
