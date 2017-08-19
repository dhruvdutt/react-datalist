import React, { Component } from 'react';
import DataList from './components/DataList';

class App extends Component {

  constructor(props) {
  	super(props);
    this.state = {
      loading: true,
    	data: [],
      showRadio: false,
      defaultSelectedItems: [],
    };

    this.onChange = this.onChange.bind(this);

    // for testing
    this.toggleType = this.toggleType.bind(this);
  }

  componentDidMount() {

    fetch('https://api.myjson.com/bins/17mcd1')
    	.then(response => response.json())
      .then(allData => {
        this.setState({ loading: false });

        let eyeColorsData = this.pluckFieldData(allData, "eyeColor");

        let defaultSelectedItems = [
          "brown",
          "green",
        ];

        this.setState({
          data: eyeColorsData,
          defaultSelectedItems,
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

    console.log('defaultSelectedItems: ', defaultSelectedItems);

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
