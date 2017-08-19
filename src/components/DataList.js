import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from './Radio';
import Checkbox from './Checkbox';

const propTypes = {
  data: PropTypes.array.isRequired,
  showCount: PropTypes.bool,
  showRadio: PropTypes.bool,
  defaultSelected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  onChange: PropTypes.func,
}

const defaultProps = {
  showCount: true,
  showRadio: true,
  defaultSelectedIndex: -1,
  defaultSelected: '',
  selectedItems: '',
}

class DataList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataObj: {},
      selectedItems: props.defaultSelected,
    }

    this.renderList = this.renderList.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.toggleRadio = this.toggleRadio.bind(this);

  }

  componentWillReceiveProps({ data: dataArr, showRadio, defaultSelected }) {
    let dataObj = this.countOccurences(dataArr);

    this.setState({ dataObj });

    if (!showRadio) {
      this.setState({ selectedItems: new Set()})
    }

    if (!!defaultSelected) {
      console.log('defaultSelected:', defaultSelected);
      let selectedItems = typeof defaultSelected === 'string' ? defaultSelected : new Set(defaultSelected);
      this.setState({ selectedItems });
    }

  }

  // componentWillMount() {
  //   this.selectedItems = new Set();
  // }

  selectItem() {

  }

  toggleCheckbox(item) {
    let { onChange } = this.props;

    let { selectedItems } = this.state;

    let prevselectedItems = new Set(selectedItems);

    if (selectedItems.has(item)) {
      selectedItems.delete(item);
    } else {
      selectedItems.add(item);
    }

    this.setState({ selectedItems});

    onChange(prevselectedItems, selectedItems);
  }

  toggleRadio(item) {
    let { onChange } = this.props;

    let { selectedItems } = this.state;

    let prevselectedItems = typeof selectedItems !== 'string' ? null : selectedItems;

    selectedItems = item;

    this.setState({ selectedItems });

    onChange(prevselectedItems, selectedItems);
  }

  countOccurences(dataArr) {
    return dataArr.reduce((dataObj, item) => {
      dataObj[item] = dataObj[item] ? ++dataObj[item] : 1;
      return dataObj;
    }, {});
  }

  renderList() {
    let { showCount, showRadio, defaultSelectedIndex, defaultSelected } = this.props;
    let { dataObj, selectedItems } = this.state;
    let { toggleCheckbox, toggleRadio } = this;
    let dataFieldSet = Object.keys(dataObj);

    console.log('selectedItems: ', selectedItems);

    return dataFieldSet.map(item => (
      <div key={item}>
        {(() => {
          let label = item,
              isChecked = false;


          if (showCount) label += ` (${dataObj[label]})`;

          if (showRadio) {
            isChecked = selectedItems === item;
            return (
              <Radio
                name="eyeColor"
                item={item}
                label={label}
                isChecked={isChecked}
                onChange={toggleRadio}
              />
            )
          } else {
            isChecked = selectedItems.has(item);
            return (
              <Checkbox
                name="eyeColor"
                item={item}
                label={label}
                isChecked={isChecked}
                onChange={toggleCheckbox}
              />
            )
          }
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
