import React, { Component } from 'react';
import DataList from './components/DataList';

class App extends Component {

  constructor(props) {
  	super(props);
    this.state = {
      loading: true,
    	data: []
    };
  }

  componentDidMount() {

    fetch('https://api.myjson.com/bins/17mcd1')
    	.then(response => response.json())
      .then(allData => {
        this.setState({ loading: false });

        let eyeColorsData = this.pluckFieldData(allData, "eyeColor");

        this.setState({ data: eyeColorsData });
      })
      .catch(err => {
      	console.log('API error: ', err);
      });
  }


  pluckFieldData(allData, field) {
    return allData.map(item => item[field]);
  }

  render() {
    let { loading, data } = this.state;

    if (loading) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <div>
        <DataList
          data={data}
          showCount={true}
          showRadio={false}
          defaultSelected="brown"
          defaultSelectedIndex={0}
        />
      </div>
    );
  }
}

export default App;
