import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const list = [
  {
    title: 'react',
    url: 'https://facebook.github.io/react/',
    author: 'mathew dorish',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'redux',
    url: 'https://github.com/reactjs/redux',
    author: 'stan richards, mark macdon',
    num_comments: 2,
    points: 4,
    objectID: 1,
  },
];



class Developer{
  constructor(firstname, lastname){
    this.firstname = firstname;
    this.lastname = lastname;
  }

  getName(){
    return this.firstname + " " + this.lastname;
  }
}

const userService = {
  getUserName(user){
    return user.firstname + " " + user.lastname;
  },
}

const key = "name";
const user = {
  [key]: "mathew",//name: mathew
  key: "mathew",  //key: mathew
}

const largeCol = {
  width: '40%',
};

const medCol = {
  width: '30%',
};

const smallCol = {
  width: '10%',
};



const isSearched = searchTerm => item => 
  item.title.toLowerCase().includes(searchTerm.toLowerCase());
//filter function takes a funtion as input

class App extends Component {//functionalities from Component passed over to App
  constructor(props){//initializes internal component state. called only once
    super(props);

    this.state = {
      list,
      searchTerm: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }


  onSearchChange(event){
    this.setState({searchTerm: event.target.value});
  }

  onDismiss(id){
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);

    this.setState({list: updatedList});
  }

 //Component is a class
  render() {

    const { searchTerm, list } = this.state;

    return(
      <div className="page">
        <div className="interactions"> 
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search:
          </Search>
        </div>
        <Table 
          list={list} //stored in props to pass to other components
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}


//finctional state components
const Search = ({value, onChange, children}) =>
  <form>
      {children}
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
    </form>

const Table = ({list, pattern, onDismiss}) =>
  <div className="table">
      {list.filter(isSearched(pattern)).map(item =>
        <div key={item.objectID} className="table-row">

          <span style={ largeCol }>
            <a href={item.url}>{item.title}</a>
          </span>

          <span style={ medCol }> {item.author} </span>
          <span style={ smallCol }> {item.num_comments} </span>
          <span style={ smallCol }> {item.points} </span>

          <span style={ smallCol }>
            <Button
              onClick = {() => onDismiss(item.objectID)}
              className= "button-inline"
            >
              Dismiss
            </Button>
          </span>
        </div>
      )}
    </div>

const Button = ({onClick, className = '', children}) =>
  <button
    onClick = {onClick}
    className = {className}
    type="button"
  >
    {children}
  </button>



export default App;
