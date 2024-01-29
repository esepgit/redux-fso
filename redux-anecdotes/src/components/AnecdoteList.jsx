import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === 'ALL') {
      return anecdotes;
    }
    return filter === 'FAVORITE'
    ? anecdotes.filter(anecdote => anecdote.favorite)
    : anecdotes.filter(anecdote => !anecdote.favorite)
  });
  
  anecdotes.sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    dispatch(addVote(id));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content} <strong>{anecdote.favorite ? 'favorite' : ''}</strong></div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default AnecdoteList