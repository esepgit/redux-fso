import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient } from 'react-query'
import { getAnecdotes } from './request'

const App = () => {
  const queryClient = useQueryClient()

  const result = useQuery('anecdote', getAnecdotes, {
    retry: 1
  })
  
  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
   return <div>anecdote service not available due to problems in server</div> 
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log('vote')
  }


  return (
    <div>
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
    </div>
  )
}

export default App
