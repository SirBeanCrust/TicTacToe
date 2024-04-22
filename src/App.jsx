import { useState } from "react"
import { Link } from "react-router-dom";
import "./Routing.jsx";

export default function App() {
  const [newItem, setNewItem] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <>{
      //Submitting form
    }<form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input value={newItem} onChange={e => setNewItem(e.target.value)} type="text" id="item" />
    </div>
    <button className="btn">Add</button>
  </form>
  
  {
    //TodoList
  }<h1 className="header">Todo List</h1>
  <ul className="list">{
      //TodoList Item
    }<li>
      <label>
        <input type="checkbox"/>
        Item 1
      </label>
      <button className="btn btn-danger">Delete</button>
    </li>
  </ul>
  
  {
//Linking button
}<Link to="/second-page">
    <button className="btn">Go to Second Page</button>
  </Link>
  </>
  )
}
