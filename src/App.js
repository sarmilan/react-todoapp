import React, { Component } from 'react';
import './App.css';

class App extends React.Component{
	constructor(){
		super();
		this.state = {
			todos:[
	            {text: 'write my first todo', done: false, id: 1}
	        ],
			filter: "all"
		}
		this.toggleComplete = this.toggleComplete.bind(this)
		this.addTodo = this.addTodo.bind(this)
		this.filter = this.filter.bind(this)
		this.clearComplete = this.clearComplete.bind(this)
	}

	toggleComplete(index){
		console.log(index);
		let newToDos = this.state.todos;
		newToDos[index].done = !newToDos[index].done;
		this.setState({todos: newToDos});
	}

	addTodo(text,e) {
		e.preventDefault();
		this.setState({
			todos: this.state.todos.concat({
				text: text, 
				done: false, 
				id: this.state.todos.length+1
			}),
		})
	}

	filter(e) {
		this.setState({
			filter: e.target.value
		})
	}

	clearComplete(){
		let tempArr = [];
		for (let i=0; i < this.state.todos.length; i++){
			if (!this.state.todos[i].done) {
				tempArr.push(this.state.todos[i])
			}
		}
		this.setState({
			todos: tempArr
		})
	}

	render(){

		let tempArr=[];

		for (let i=0; i < this.state.todos.length; i++){
			if (this.state.filter==="all"){
				tempArr.push(<ToDo todo={this.state.todos[i]} toggleComplete={this.toggleComplete} index={i} />)
			} else if (this.state.filter==="active" && !this.state.todos[i].done){
				tempArr.push(<ToDo todo={this.state.todos[i]} toggleComplete={this.toggleComplete} index={i} />)
			} else if (this.state.filter==="complete" && this.state.todos[i].done) {
				tempArr.push(<ToDo todo={this.state.todos[i]} toggleComplete={this.toggleComplete} index={i} />)
			}
		}

		let disable = "disabled";

		for (let i=0; i < this.state.todos.length; i++){
			if (this.state.todos[i].done === true) {
				disable = "";
				break
			}
		}

		return(
			<div >
        <h1 className="center">REACT TODO LIST</h1>
				<AddTodo addTodo={this.addTodo} />
				<ul className="list-group">
					{tempArr}
				</ul>
				<Selector filter={this.filter} />
				<button onClick={this.clearComplete} className="clear-button" disabled={disable}>Clear Complete</button>
			</div>
		)
	}
}

class AddTodo extends React.Component {
	render(){
		return(
      <div className="input-group">
        <form onSubmit={(event)=>{this.props.addTodo(this.refs.newEntry.value,event)}}>
          <div>
            <input className="input-bar" placeholder="add a todo" ref="newEntry" />
            <button className="submit-button" type="submit">+</button>
          </div>
        </form>
      </div>
		)
	}
}

class ToDo extends React.Component {
	render(){
		return(
      <div className="todo-list">
        <li className={"list-group-item " + (this.props.todo.done ? "done" : "") }>
          <input type="checkbox" className="checkbox" onChange={()=>{this.props.toggleComplete(this.props.index)}} checked={this.props.todo.done ? true : false} />
          {this.props.todo.text}
        </li>
      </div>
		)
	}
}

class Selector extends React.Component {
	render(){
		return(
      <div className="todo-selector">
        <select onChange={this.props.filter}>
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="complete">complete</option>
        </select>
      </div>
		)
	}
}

export default App;
