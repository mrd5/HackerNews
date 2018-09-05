import React, { Component } from 'react';
import axios from 'axios'; //used to make asynchronous requests to remote apis
import './index.css';
import {
  DEFAULT_QUERY,
  DEFAULT_HITSPERPAGE,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HITSPERPAGE,
} from '../../constants';
import Button from '../Button';
import Search from '../Search';
import Table from '../Table';


//Higher order function (function that returns a function) which updates the state depending on the previous state
const updateSearchTopStoriesState = (hits, page) => (prevState) => {
  const { searchKey, results } = prevState;

  const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : [];

  //... is the spread operator, where every value from array/object gets used/copied
  const updatedHits = [
  ...oldHits, //eg. every value from within oldHits
  ...hits,
  ];

  return {
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
      },
      isLoading: false
  };
}

//Checks if the page is currently loading the results
//If it is loading, returns a Loading... message for the user
//Else returns the input component
const withLoading = (Component) => ({ isLoading, ...rest }) =>
  isLoading
    ? <Loading />
    : <Component { ...rest } />

const ButtonWithLoading = withLoading(Button);

//Message that is displayed to the user while results are loading
const Loading = () =>
  <div>Loading...</div>


class App extends Component {//functionalities from Component passed over to App
 
   _isMounted = false;//Used to keep track of component's state

  constructor(props){//initializes internal component state. called only once
    super(props);

    this.state = {//State of the current object, can access within the whole component
      results: null,            //Zero results before a request is made to the API
      searchKey: '',            //Stores each result
      searchTerm: DEFAULT_QUERY,//Search query to be passed to the API
      error: null,              //Used for error handling. Will display an error message if something has gone wrong
      isLoading: false,         //If the app is loading the results from the API
    };

    //Prevents app from sending an API request on each search submit for the SAME query
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);

  }

  needsToSearchTopStories(searchTerm) {//Only one API request per query at a time
      return (!this.state.results[searchTerm]);
  }

  

  fetchSearchTopStories(searchTerm, page = 0){
    this.setState({ isLoading: true});

    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HITSPERPAGE}${DEFAULT_HITSPERPAGE}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  } //Axios uses an HTTP GET request

  setSearchTopStories(result) {
    const { hits, page } = result;
    this.setState(updateSearchTopStoriesState(hits, page));
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)){
      this.fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }



  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    //If user navigates away from page while there is still a pending request
    //But this will prevent that 
    this._isMounted = false;
  }

  //Component is a class
  render() {
    const {
        searchTerm,
        results,
        searchKey,
        error,
        isLoading,
      } = this.state;

    const page = (
      results && results[searchKey] && results[searchKey].page
    ) || 0;

    const list = (
      results && results[searchKey] && results[searchKey].hits
    ) || [];


    return(
      <div className="page">
        <div className="interactions">
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search:
          </Search>
        </div>
        { error 
          ? <div classname="interactions">
              <p>Something went wrong! Please try again.</p> 
            </div>
          : <Table
            list={ list }
            onDismiss={ this.onDismiss }
          />
        }
        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
              onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
              More
            </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;

export {
  Button,
  Search,
  Table,
};