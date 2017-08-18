import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RadioList from './RadioList';
import Checkbox from './Checkbox';

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
    this.toggleCheckbox = this.toggleCheckbox.bind(this);

  }

  componentWillReceiveProps({ data: dataArr }) {
    let dataObj = this.countOccurences(dataArr);
    console.log('countOccurences: ', dataObj);
    this.setState({ dataObj });
  }

  componentWillMount() {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox(label) {
    let { selectedCheckboxes} = this;
    if (selectedCheckboxes.has(label)) {
      selectedCheckboxes.delete(label);
    } else {
      selectedCheckboxes.add(label);
    }

    console.log('toggleCheckbox: ', selectedCheckboxes);
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
    let { toggleCheckbox } = this;
    let dataFieldSet = Object.keys(dataObj);

    return dataFieldSet.map(item => (
      <div key={item}>
        {(() => {
          let label = item;

          if (showCount) label += ` (${dataObj[label]})`;

          if (showRadio) return (
            <input
              type="radio"
              name="field1"
            />
          );
          return (
            <Checkbox
              item={item}
              label={label}
              onChange={toggleCheckbox}
            />
          );
        })()}
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
