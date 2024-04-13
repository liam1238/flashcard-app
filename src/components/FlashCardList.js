import React from 'react';
import { FlashCard } from '../components/index';


export default function FlashCardList({flashcards}) {
  return (
    <div className='card-grid'>
      {flashcards.map(flashcard => {
        return <FlashCard flashcard={flashcard} key={flashcard.id}/>
      })}
    </div>
  )
}
