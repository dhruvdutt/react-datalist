import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RadioList from './RadioList';

const propTypes = {
  data: PropTypes.array.isRequired,
  showCount: PropTypes.bool,
  showRadio: PropTypes.bool,
  defaultSelectedIndex: PropTypes.number,
  defaultSelected: PropTypes.string,
}

const defaultProps = {
  showCount: true,
  showRadio: true,
  defaultSelectedIndex: -1,
  defaultSelected: '',
}

class DataList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataObj: {},
    }

    this.renderList = this.renderList.bind(this);

  }

  componentWillReceiveProps({ data: dataArr }) {
    let dataObj = this.countOccurences(dataArr);
    console.log('countOccurences: ', dataObj);
    this.setState({ dataObj });
  }

  countOccurences(dataArr) {
    return dataArr.reduce((dataObj, item) => {
      dataObj[item] = dataObj[item] ? ++dataObj[item] : 1;
      return dataObj;
    }, {});
  }

  renderList() {
    let { showCount, showRadio, defaultSelectedIndex, defaultSelected } = this.props;
    let { dataObj } = this.state;
    let dataFieldSet = Object.keys(dataObj);

    return dataFieldSet.map(item => (
      <div key={item}>
        {(() => {
          if (showRadio) return (
            <input
              type="radio"
              name="field1"
            />
          );
          return (
            <input
              type="checkbox"
              name="field1"
            />
          );
        })()}
        <label>{item} ({dataObj[item]})</label>
      </div>
    ));
  }

  render() {
    let { showCount, showRadio, defaultSelectedIndex, defaultSelected } = this.props;
    let { dataObj } = this.state;
    let { renderList } = this;

    return (
      <div>
        <h3>DataList</h3>
        { renderList(dataObj) }
      </div>
    )
  }
}

DataList.propTypes = propTypes;
DataList.defaultProps = defaultProps;

export default DataList;
