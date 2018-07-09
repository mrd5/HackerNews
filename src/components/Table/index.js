import React, { Component } from 'react';
import Button from '../Button';
import {
	smallCol,
	medCol,
	largeCol,
} from '../../constants';

const Table = ({list, onDismiss}) =>
  <div className="table">
      {list.map(item =>
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

export default Table;