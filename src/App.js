import React, { Component } from 'react';
import DataList from './components/DataList';

const defaultSelectedRadio = "green";
const defaultSelectedCheckboxes = ["green", "blue"];
const SHOW_RADIO = true;

class App extends Component {

  constructor(props) {
  	super(props);
    this.state = {
      loading: true,
    	data: [],
      showRadio: SHOW_RADIO,
      defaultSelectedItems: SHOW_RADIO ? defaultSelectedRadio : defaultSelectedCheckboxes,
    };

    this.onChange = this.onChange.bind(this);

    // for testing
    this.toggleType = this.toggleType.bind(this);
  }

  componentWillUpdate(nextProps, { showRadio }) {
    if (showRadio !== this.state.showRadio) {
      let defaultSelectedItems = showRadio ? defaultSelectedRadio : defaultSelectedCheckboxes;
      this.setState({ defaultSelectedItems });
    }
  }

  componentDidMount() {

    fetch('https://api.myjson.com/bins/17mcd1')
    	.then(response => response.json())
      .then(allData => {
        this.setState({ loading: false });

        let eyeColorsData = this.pluckFieldData(allData, "eyeColor");

        this.setState({
          data: eyeColorsData
        });
      })
      .catch(err => {
      	console.log('API error: ', err);
      });
  }


  pluckFieldData(allData, field) {
    return allData.map(item => item[field]);
  }

  toggleType() {
    this.setState(({ showRadio }) => {
      return {
        showRadio: !showRadio,
      }
    });
  }

  onChange(prevItems, items) {
    console.log('onChange - prevItems: ', prevItems, 'items: ', items);
  }

  render() {
    let { loading, data, showRadio, defaultSelectedItems } = this.state;
    let { toggleType, onChange } = this;

    if (loading) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <div>
        <button onClick={toggleType}>Toggle Type</button>
        <DataList
          onChange={onChange}
          data={data}
          showCount={true}
          showRadio={showRadio}
          defaultSelected={defaultSelectedItems}
        />
      </div>
    );
  }
}

export default App;
