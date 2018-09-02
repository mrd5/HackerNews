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




const isSearched = searchTerm => item => 
  item.title.toLowerCase().includes(searchTerm.toLowerCase());
//filter function takes a funtion as input

class App extends Component {//functionalities from Component passed over to App
  _isMounted = false;

  constructor(props){//initializes internal component state. called only once
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
    };

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return (!this.state.results[searchTerm]);
  }

  fetchSearchTopStories(searchTerm, page = 0){
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HITSPERPAGE}${DEFAULT_HITSPERPAGE}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  } //Axios uses an HTTP GET request

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
 
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
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
          <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            Next page
          </Button> 
        </div>
      </div>
    );
  }
}





export default App;