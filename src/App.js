import React, { Component } from 'react';
import DataList from './components/DataList';

const API_URL = 'https://api.myjson.com/bins/17mcd1';
const FIELD = 'eyeColor';
const DEFAULT_SELECTED_RADIO = "green";
const DEFAULT_SELECTED_CHECKBOX = ["green", "blue"];
const SHOW_RADIO = false;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataArr: [],
      showRadio: SHOW_RADIO,
      defaultSelectedItems: SHOW_RADIO ? DEFAULT_SELECTED_RADIO : DEFAULT_SELECTED_CHECKBOX,
    };

    this.onChange = this.onChange.bind(this);

    // for testing
    this.toggleType = this.toggleType.bind(this);
  }

  /*
  * Toggle type of list [checkbox / radio]
  *
  * @type     Testing
  */
  toggleType() {
    this.setState(({ showRadio }) => {
      return {
        showRadio: !showRadio,
      }
    });
  }

  /*
  * componentWillUpdate
  * Select defaultSelectedItems based on list type (eval showRadio)
  *
  * @type     React lifecycle
  *
  * @param    {Object}   nextProps   Next props object
  * @param    {Object}   nextState   Next state object
  */
  componentWillUpdate(nextProps, { showRadio }) {
    if (showRadio !== this.state.showRadio) {
      let defaultSelectedItems = showRadio ? DEFAULT_SELECTED_RADIO : DEFAULT_SELECTED_CHECKBOX;
      this.setState({ defaultSelectedItems });
    }
  }

  /*
  * componentDidMount
  * Fetch data from API_URL, pluckFieldData
  *
  * @type     React lifecycle
  *
  * @param    {Object}   nextProps   Next props object
  * @param    {Object}   nextState   Next state object
  */
  componentDidMount() {

    fetch(API_URL)
    .then(response => response.json())
    .then(allData => {
      this.setState({ loading: false });

      let dataArr = this.pluckFieldData(allData, FIELD);

      this.setState({ dataArr });
    })
    .catch(err => {
      console.log('API error: ', err);
    });
  }

  /*
  * Pluck array of field from data
  *
  * @param    {Array}   allData     Array of data object
  * @param    {String}  field       Name of the field to be plucked
  *
  * @returns  {Array}   Array of field passed
  */
  pluckFieldData(allData, field) {
    return allData.map(item => item[field]);
  }

  /*
  * onChange handler that shows previous items, selected items
  *
  * @param    {Array|String}   prevItems     Array|String of previous item/s
  * @param    {Array|String}   items         Array|String of selected item/s
  */
  onChange(prevItems, items) {
    console.log('onChange - prevItems: ', prevItems, 'items: ', items);
  }

  /*
  * Render loading template
  */
  renderLoader() {
    return (
      <div>Loading...</div>
    )
  }

  render() {
    let { loading, dataArr, showRadio, defaultSelectedItems } = this.state;
    let { toggleType, onChange, renderLoader } = this;

    if (loading) {
      return renderLoader()
    }

    return (
      <div className="container">
        <span className="controls">Toggles: </span>
        <button
          onClick={toggleType}
          value="toggle"
          className="btn btn-primary">
          Type
        </button>
        <hr/>
        <DataList
          onChange={onChange}
          data={dataArr}
          showCount={true}
          showRadio={showRadio}
          defaultSelected={defaultSelectedItems}
        />
      </div>
    );
  }
}

export default App;
