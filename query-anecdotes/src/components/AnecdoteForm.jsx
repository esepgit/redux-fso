import { useQueryClient, useMutation } from "react-query"
import { createAnecdote } from "../request"
import { useContext } from "react"
import CounterContext from "../CounterContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [counter, dispatch] = useContext(CounterContext)

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdote = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdote.concat(newAnecdote))
      dispatch({ type: 'MSG', payload: `anecdote '${newAnecdote.content}' created`})
      setTimeout(() => {
        dispatch({ type: 'CLEAN'})
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
