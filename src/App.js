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

  const onChange = e => {
    const files = Array.from(e.target.files)
    setUploading(true);

    //TODO: transform file to image

    console.log(files)
    
    const values = Object.values(files)

    console.log(values)
    values.forEach(image =>{
      console.log(image.path)
      setUploading(false)
      setImage(image)
      recognizeImage()
    })
  }

  const removeImage = () => {
    setImage(null)
  }

  useEffect(()=>{loadModel()}, []);

  // 3. Listen for Actions
  const recognizeImage = async () => {
    if(image!=null){
      console.log("Listenning for image");
      const prediction = await model.classify(image);
      setPrediction(prediction)
    }
  }

  const content = () => {
    if (uploading) {
      return <Spinner />
    }
    else if (image === null){
      return <Buttons onChange={onChange} />
    }
    else{
      return <Images image={image} removeImage={removeImage}/>
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
   
        {content()}
        <div id='predlabel'>
          <label >
            Prediction is : {prediction}
          </label>
        </div>
        <button onClick={recognizeImage}>Guess!</button>
      </header>
    </div>
  );
}

export default App;
