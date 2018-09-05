import React, { Component } from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import classNames from 'classnames';
import {
	smallCol,
	medCol,
	largeCol,
} from '../../constants';

//Used to sort the entries
const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

//Stateless component Sort
const Sort = ({sortKey, activeSortKey, onSort, children}) => {
  const sortClass = classNames(//classNames library: https://github.com/JedWatson/classnames
    'button-inline',
    { 'button-active': sortKey === activeSortKey}
  );

  return (
    <Button
      onClick={() => onSort(sortKey)}
      className={sortClass}
    >
      {children}
    </Button>
  );
}

class Table extends Component{
  constructor(props){
    super(props);

    this.state = {
      sortKey: 'NONE',
      isSortedReverse: false,
    };

    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey){
    const isSortedReverse = (this.state.sortKey === sortKey && !this.state.isSortedReverse);
    this.setState({ sortKey, isSortedReverse });
  }

  render() {
    const {
      list,
      onDismiss,
    } = this.props;

    const {
      sortKey,
      isSortedReverse,
    } = this.state;

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortedReverse
      ? sortedList.reverse()
      : sortedList;
    return(
      <div className="table">
        <div className="table-header">
          <span style={{ width: '40%' }}>
            <Sort
              sortKey={'TITLE'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Sort By Title
            </Sort>
          </span>
          <span style={{ width: '30%' }}>
            <Sort
              sortKey={'AUTHOR'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Author
            </Sort>
          </span>
          <span style={{ width: '10%' }}>
            <Sort
              sortKey={'COMMENTS'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Comments
            </Sort>
          </span>
          <span style={{ width: '10%' }}>
            <Sort
              sortKey={'POINTS'}
              onSort={this.onSort}
              activeSortKey={sortKey}
            >
              Points
            </Sort>
          </span>
          <span style={{ width: '10%' }}>
            Archive
          </span>
        </div>
          {reverseSortedList.map(item =>
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
    );
  }
}

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  ).isRequired,
  onDismiss: PropTypes.func,
};

export default Table;