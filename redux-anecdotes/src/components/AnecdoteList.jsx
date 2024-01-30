import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { voteAnecdoteMessage, removeMessage } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotesOrdered = useSelector(({ filter, anecdotes }) => {
    if (filter === 'ALL') {
      return anecdotes;
    }
    return filter === 'FAVORITE'
    ? anecdotes.filter(anecdote => anecdote.favorite)
    : anecdotes.filter(anecdote => !anecdote.favorite)
  });
  //anecdotesOrdered no se puede mutar, por eso se realiza un spread
  const anecdotes = [...anecdotesOrdered]
  anecdotes.sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    dispatch(addVote(id));
    dispatch(voteAnecdoteMessage())
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000);
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