import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

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
}

class DataList extends Component {

  constructor(props) {
    super(props);

    let { defaultSelected, showRadio} = props,
        selectedItems;

    if (showRadio) {
      selectedItems = '';
    } else {
      selectedItems = new Set();
    }

    if (!!defaultSelected) selectedItems = defaultSelected;

    this.state = {
      loading: true,
      dataObj: {},
      selectedItems,
    }

    this.selectDefaultItems = this.selectDefaultItems.bind(this);
    this.onSelectItemChange = this.onSelectItemChange.bind(this);
    this.setDefaultSelectedItems = this.setDefaultSelectedItems.bind(this);
    this.renderList = this.renderList.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.toggleRadio = this.toggleRadio.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate nextProps', nextProps);
    console.log('componentWillUpdate nextState', nextState);
    // this.setDefaultSelectedItems(nextProps, nextState);
  }

  setDefaultSelectedItems({ showRadio, defaultSelected }, state) {
    let selectedItems;

    if (state && state.selectedItems) {
      selectedItems = state.selectedItems;
    }

    if (!showRadio) {
      selectedItems = new Set();
    }

    if (!!defaultSelected) {
      selectedItems = this.selectDefaultItems(defaultSelected);
    } else {
      if (showRadio) {
        selectedItems = '';
      } else {
        selectedItems = new Set();
      }
    }

    this.setState({
      selectedItems,
      loading: false,
    });
  }

  componentWillReceiveProps(nextProps) {

    // object with key:item and value:occurence
    let dataObj = this.countOccurences(nextProps.data);
    this.setState({ dataObj });

    this.setDefaultSelectedItems(nextProps);

  }

  selectDefaultItems(selectedItems) {
    return typeof selectedItems === 'string' ? selectedItems : new Set(selectedItems);
  }

  toggleCheckbox(item) {
    let { selectedItems } = this.state;

    // store prevSelectedItems
    let prevSelectedItems = new Set(selectedItems);

    // toggle and store selectedItems occurence
    if (selectedItems.has(item)) {
      selectedItems.delete(item);
    } else {
      selectedItems.add(item);
    }

    this.onSelectItemChange(prevSelectedItems, selectedItems);

  }

  toggleRadio(item) {
    let { selectedItems } = this.state;

    // store prevSelectedItems
    // NOTE: can be modified to preserve the checkboxes Set as prev instead of setting null
    let prevSelectedItems = typeof selectedItems !== 'string' ? null : selectedItems;

    // store selectedItems
    selectedItems = item;

    this.onSelectItemChange(prevSelectedItems, selectedItems);
  }

  onSelectItemChange(prevSelectedItems, selectedItems) {
    let { onChange } = this.props;

    this.setState({ selectedItems }, () => {
      // pass previous, current selected values
      onChange(prevSelectedItems, selectedItems);
    });

  }

  countOccurences(dataArr) {
    return dataArr.reduce((dataObj, item) => {
      dataObj[item] = dataObj[item] ? ++dataObj[item] : 1;
      return dataObj;
    }, {});
  }

  renderList() {
    let { showCount, showRadio } = this.props;
    let { dataObj, selectedItems } = this.state;
    let { toggleCheckbox, toggleRadio } = this;
    let dataFieldSet = Object.keys(dataObj);

    console.log('selectedItems: ', selectedItems);

    return dataFieldSet.map(item => (
      <div key={item}>
        {(() => {
          let label = item,
              isChecked = false,
              type = "radio",
              onChangeHandler = toggleRadio;

          if (showCount) label += ` (${dataObj[label]})`;

          type = showRadio ? "radio" : "checkbox";

          if (!showRadio && typeof selectedItems === 'object') {
            type = "checkbox";
            isChecked = selectedItems.has(item);
            onChangeHandler = toggleCheckbox;
          } else {
            isChecked = selectedItems === item;
          }

          return (
            <ListItem
              type={type}
              name="eyeColor"
              item={item}
              label={label}
              isChecked={isChecked}
              onChange={onChangeHandler}
            />
          )
        })()}
      </div>
    ));
  }

  render() {
    let { dataObj, loading } = this.state;
    let { renderList } = this;

    if (loading) {
      return (
        <div>Computing...</div>
      )
    }

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
