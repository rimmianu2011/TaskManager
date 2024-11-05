import './App.css';
import React, {Component} from "react";
import Modal from "./components/Modal"
import axios from "axios";

// const todo_items = [
//   {
//     "id": 1,
//     "title_model": "Develop Django+React project",
//     "description_model": "develop a todo list model using Django for backend and react for frontend.",
//     "completed_task": true
//   },
//   {
//     "id": 2,
//     "title_model": "Lunch on Wednesday",
//     "description_model": "set up a lunch on Wednesday, 12pm with Neeta.",
//     "completed_task": false
//   },
// ]

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      viewCompleted: false,
      /* todoList: todo_items, */
      modal: false,
      activeItem: {
        title_model: "",
        description_model: "",
        completed_task: false,
        date:"",
        priority: "Low",
      },
      descriptionVisible: {},
      error: "",
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios.get("/api/todos/").then((res) => this.setState({ todoList: res.data})).catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({modal: !this.state.modal, error: ""});
  };

  toggleDescription = (id) => {
    this.setState((prevState) => ({
      descriptionVisible: {
        ...prevState.descriptionVisible,
        [id]: !prevState.descriptionVisible[id], // Toggle the visibility for the item with this ID
      },
    }));
  };

  handleSubmit = (item) => {
    if(!item.title_model || !item.description_model){
      this.setState({error:"Please fill out the required fields."});
      return;
    }

    this.toggle();
    if(item.id){
      axios.put(`/api/todos/${item.id}/`, item).then((res) => this.refreshList());
      return;
    }
    axios.post("/api/todos/", item).then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios.delete(`/api/todos/${item.id}/`).then((res) => this.refreshList());
  };

  createItem = () => {
    const item = {title_model:"", description_model:"", completed_task:false, date:"", priority:"Low"};
    this.setState({activeItem: item, modal: !this.state.modal});
  };

  editItem= (item) => {
    this.setState({activeItem: item, modal: !this.state.modal});
  }

  displayCompleted = (status) => {
    if(status) {
      return this.setState({viewCompleted: true});
    }

    return this.setState({viewCompleted: false});
  };

  renderTabList = () => {
    return(
      <div className='nav nav-tabs'>
        <span onClick={() => this.displayCompleted(true)} 
        className={this.state.viewCompleted ? "nav-link active" : "nav-link"}>
          Completed
         </span>
         <span onClick={() => this.displayCompleted(false)} 
         className={this.state.viewCompleted ? "nav-link" : "nav-link active"}>
          Incomplete
         </span>
      </div>
    );
  };

  renderItems = () => {
    const {viewCompleted, descriptionVisible} = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed_task === viewCompleted
    );
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <div className='todo-item-details'>
          <h5 className='todo-title mb-1'>{item.title_model}</h5>
          <small className='text-muted'>
            <div><span className='todo-date'><b><i className="fa-solid fa-calendar-days"></i>Due Date: </b>{item.date}</span></div>
            <div><span className={`todo-priority priority-${item.priority.toLowerCase()}`}>
              Priority: {item.priority}
            </span></div>
          </small>
          {/*button to display the description*/}
        <button className='btn btn-link' onClick={() => this.toggleDescription(item.id)} title='Description'>
          {descriptionVisible[item.id] ? <i class="fa-solid fa-eye-slash" style={{color:'black'}}></i>:<i className="fa-solid fa-eye" style={{color:'black'}}></i>}
        </button>
          {/*Toggle description visibility*/}
          {descriptionVisible[item.id] && (
            <p className='todo-description mb-0'>{item.description_model}</p>
          )}
        </div>

        <div className='todo-item-actions'>
          <button className='btn btn-sm btn-outline-secondary mr-2'onClick={() => this.editItem(item)}>
            <i className='fas fa-edit'></i> EDIT
          </button>
          <button className='btn btn-sm btn-outline-danger' onClick={() => this.handleDelete(item)}>
            <i className='fas fa-trash-alt'></i> DELETE
          </button>
        </div>
      </li>
    ));
  };


  render() {
    return (
      <div className='App'>
        {/* New Header */}
        <header className='App-header'>
          <h1 className='App-title'>TASK MANAGER</h1>
        </header>
      <main className="container">
        <h2 className="text-white text-uppercase text-center my-4">
          Todo List
        </h2>
        <div className="row">
          <div className="col-md-7 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4" style={{backgroundColor: '#8ac7ea', padding:'20px'}}>
                <button className="btn btn-primary" style={{backgroundColor: '#4b6cb7', borderColor:'transparent', padding:'15px'}} onClick={this.createItem}>
                  <b>Add task</b>
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
          activeItem = {this.state.activeItem}
          toggle = {this.toggle}
          onSave = {this.handleSubmit}>
          </Modal>
        ): null}
        {/* Display error message if there is an error */}
        {this.state.error && (
            <div className="alert alert-danger mt-3" role="alert">
              {this.state.error}
            </div>
          )}
      </main>
      <footer>
        <div className='row'></div>
      </footer>
      </div>
    );
  }
}


export default App;