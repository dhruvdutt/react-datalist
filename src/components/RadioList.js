import React, { Component } from 'react';
import PropTypes from 'prop-types';



function RadioList ({ data }) {
  console.log('RadioList: ', data);
  return (
    <div>{data[0]}</div>
  )
}

export default RadioList;
