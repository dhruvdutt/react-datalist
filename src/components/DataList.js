import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

import './DataList.css';

const DEFAULT_DATA_LIST_TYPE = "radio";
const DEFAULT_DATA_LIST_NAME = "fieldName";

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

    let { defaultSelected, showRadio} = props, selectedItems;

    // init selectedItems based on list type (eval showRadio)
    if (showRadio) {
      selectedItems = '';
    } else {
      selectedItems = new Set();
    }

    // fill selectedItems based on defaultSelected items
    if (!!defaultSelected) selectedItems = defaultSelected;

    this.state = {
      dataArr: props.data,
      dataObj: {},
      selectedItems,
      searchQuery: '',
    }

    this.setDefaultSelectedItems = this.setDefaultSelectedItems.bind(this);
    this.onSelectItemChange = this.onSelectItemChange.bind(this);
    this.renderList = this.renderList.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.toggleRadio = this.toggleRadio.bind(this);
    this.searchData = this.searchData.bind(this);
  }

  /*
  * Count occurences of field keys
  *
  * @param    {Array}    dataArr     Array of field keys
  *
  * returns   {Object}   Object with field keys, occurences vals
  */
  countOccurences(dataArr) {
    return dataArr.reduce((dataObj, item) => {
      dataObj[item] = dataObj[item] ? ++dataObj[item] : 1;
      return dataObj;
    }, {});
  }

  /*
  * Init/fill selectedItems based on showRadio, defaultSelected
  *
  * @param    {Boolean}        showRadio          Boolean that evals list type
  * @param    {Array|String}   defaultSelected    Array|String of default item/s
  */
  setDefaultSelectedItems({ showRadio, defaultSelected }, state) {

    let selectedItems;

    if (state && state.selectedItems) {
      selectedItems = state.selectedItems;
    }

    if (defaultSelected) {
      selectedItems = typeof defaultSelected === 'string' ? defaultSelected : new Set(defaultSelected);
    } else {
      selectedItems = showRadio ? '' : new Set();
    }

    this.setState({ selectedItems });
  }

  /*
  * Count occurences, create a data object with key and counts
  *
  * @type     React lifecycle
  *
  * @param    {Object}   nextProps   Next props object
  */
  componentWillReceiveProps(nextProps) {

    let { data: dataArr } = nextProps;

    // object with key:item and value:occurence
    let dataObj = this.countOccurences(dataArr);
    this.setState({
      dataObj,
      dataArr,
    });

    this.setDefaultSelectedItems(nextProps);
  }

  /*
  * Toggle selectedItems for checkboxes
  *
  * @param    {String}    item   item name
  */
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

    this.setState({ selectedItems });

    this.onSelectItemChange(prevSelectedItems, selectedItems);
  }

  /*
  * Toggle selectedItems for radio
  *
  * @param    {String}    item   item name
  */
  toggleRadio(item) {
    let { selectedItems } = this.state;

    // store prevSelectedItems
    // NOTE: can be modified to preserve the checkboxes Set as prev instead of setting null
    let prevSelectedItems = typeof selectedItems !== 'string' ? null : selectedItems;

    // store selectedItems
    selectedItems = item;

    this.setState({ selectedItems });

    this.onSelectItemChange(prevSelectedItems, selectedItems);
  }

  /*
  * Set new state for selectedItems
  * Pass previous, new items to parent onChange
  *
  * @param    {Array|String}   prevItems     Array|String of previous item/s
  * @param    {Array|String}   items         Array|String of selected item/s
  */
  onSelectItemChange(prevSelectedItems, selectedItems) {
    let { onChange } = this.props;
    onChange(prevSelectedItems, selectedItems);
  }

  /*
  * Render checkbox/radio list
  */
  renderList() {
    let { showCount, showRadio } = this.props;
    let { dataObj, selectedItems } = this.state;
    let { toggleCheckbox, toggleRadio } = this;
    let dataFieldSet = Object.keys(dataObj);

    /*
    * Evaluate ListItem props
    */
    const propsEval = (item) => {
      let label = item,

      isChecked = false,

      type = DEFAULT_DATA_LIST_TYPE,

      onChangeHandler = DEFAULT_DATA_LIST_TYPE === 'radio' ? toggleRadio : toggleCheckbox;

      if (showCount) label += ` (${dataObj[label]})`;

      type = showRadio ? 'radio' : 'checkbox';

      if (!showRadio && typeof selectedItems === 'object') {
        type = 'checkbox';
        isChecked = selectedItems.has(item);
        onChangeHandler = toggleCheckbox;
      } else {
        isChecked = selectedItems === item;
      }

      return {
        type,
        label,
        isChecked,
        onChangeHandler,
      }
    }

    return dataFieldSet.map(item => (
      <div key={item} className="form-group">
        {(() => {

          let { type, label, isChecked, onChangeHandler } = propsEval(item);

          return (
            <ListItem
              type={type}
              name={DEFAULT_DATA_LIST_NAME}
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

  /*
  * Filter data based on searchQuery
  *
  * @param    {Object}   event     React SyntheticEvent object
  */
  searchData(event) {
    let { dataArr } = this.state;
    let { value: searchQuery } = event.target;
    this.setState({ searchQuery });

    let filteredDataArr = dataArr.filter(item => {
      return item.toLowerCase().search(searchQuery.toLowerCase()) !== -1;
    });

    let dataObj = this.countOccurences(filteredDataArr);
    this.setState({
      dataObj,
    });

  }

  render() {
    let { dataObj, searchQuery } = this.state;
    let { renderList, searchData } = this;

    return (
      <div>
        <h4 className="list-header">DataList</h4>
        <div className="input-search-container">
          <input
            className="form-control input-search"
            type="text"
            value={searchQuery}
            placeholder="Search items"
            onChange={searchData}/>
        </div>
        <ul className="list-container">
          { renderList(dataObj) }
        </ul>
      </div>
    )
  }
}

DataList.propTypes = propTypes;
DataList.defaultProps = defaultProps;

export default DataList;
