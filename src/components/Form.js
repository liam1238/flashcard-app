import React from 'react';
import axios from 'axios';


function Form( {categoryEl, categories, amonutEl, setFlashcards} ) {

  function decodeString(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: amonutEl.current.value,
          categories: categoryEl.current.value
        }
      }).then(res => {
        setFlashcards(res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map(a => decodeString(a)), 
            answer]
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - .5)
          }
        }))
      })
  }

  return (
    <form className='header' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='category'>Category</label>
        <select id='category' ref={categoryEl}>
          {categories.map(category => {
            return <option key={category.id} value={category.id}>{category.name}</option>
          })}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='amount'>Number of Questions</label>
        <input type='number' id='amobut' min='1' step='1' defaultValue='10' ref={amonutEl}/>
      </div>
      <div className='form-group'> 
        <button className='btn'>Generate</button>
      </div>
    </form>
  )
}

export default Form;
