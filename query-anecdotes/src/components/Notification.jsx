import { useContext } from "react"
import CounterContext from "../CounterContext";

export const counterReducer = (state, action) => {
  switch (action.type) {
    case "MSG":
      return action.payload;
    case "CLEAN":
      return ''
    default:
      return state;
  }
};

const Notification = () => {
  const [counter, dispatch] = useContext(CounterContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      {counter}
    </div>
  )
}

export default Notification
