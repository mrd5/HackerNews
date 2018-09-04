import React, { Component } from 'react';
import Button from '../Button';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import {
	smallCol,
	medCol,
	largeCol,
} from '../../constants';

const Table = ({list, sortKey, onSort, onDismiss}) =>
  <div className="table">
      {SORTS[sortKey](list).map(item =>
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
  onDismiss: PropTypes.func.isRequired,
};

export default Table;