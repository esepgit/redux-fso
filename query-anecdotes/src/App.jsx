import AnecdoteForm from './components/AnecdoteForm'
import Notification, { counterReducer} from './components/Notification'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getAnecdotes, updateVote } from './request'
import CounterContext from './CounterContext'
import { useReducer } from 'react'

const App = () => {
  const queryClient = useQueryClient()
  const [counter, counterDispatch] = useReducer(counterReducer, "")

  const updateVoteMutation = useMutation(updateVote, {
    onSuccess: (updatedVote) => {
      const anecdote = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData(
        "anecdotes",
        anecdote.map((a) => (a.id === updatedVote.id ? updatedVote : a))
      );
    },
  });

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    counterDispatch({ type: 'MSG', payload: `you voted '${anecdote.content}'`})
    setTimeout(() => {
      counterDispatch({ type: 'CLEAN'})
    }, 5000);
  };

  const result = useQuery('anecdotes', getAnecdotes, {
    retry: 1
  })
  
  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
   return <div>anecdote service not available due to problems in server</div> 
  }

  const anecdotes = result.data

  return (
    <CounterContext.Provider value={[counter, counterDispatch]}>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </CounterContext.Provider>
  )
}

export default App
