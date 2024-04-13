import React, { useState, useEffect, useRef } from 'react';
import { FlashCardList, Form } from './components/index';
import './style/App.css';
import axios from 'axios';


function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amonutEl = useRef();

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories);
      })
  }, [])

  return (
    <>
      <Form categoryEl={categoryEl} categories={categories} amonutEl={amonutEl} setFlashcards={setFlashcards}/>
      <div className='container'>
        <FlashCardList flashcards={flashcards}/>
      </div>
    </>
  );
}

export default App;