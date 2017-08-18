import React from 'react';
import './App.css';

// DataList.js
class DataList extends React.Component {
	constructor(props) {
  	super(props);
    this.state = {
    	dataSet: []
    };
  }

  componentWillReceiveProps(nextProps) {
  	let { data } = nextProps;

    let dataSet = this.pluckFieldList(data);
    console.log('dataSet: ', dataSet);
  	this.setState({ dataSet });
  }

  pluckFieldList(list) {

    return list.reduce((obj, item) => {
    	if (item in obj) {
      	obj[item]++;
      } else {
      	obj[item] = 1;
      }
      return obj;
    }, {});

  }

  render() {
  	console.log("List render: ", this.state);
    let { dataSet } = this.state;
    let keyArr = Object.keys(dataSet);
  	return (
    	<div>
      	{keyArr.map(item => {
        	return (
          	<div key={item}>
            	<input key={item} type="radio" name="selectedColor" value={item} />
              <label style={{textTransform: 'capitalize'}}>{item} ({dataSet[item]})</label>
            </div>
          );
        })}
      </div>
    );
  }
}

class App extends React.Component {

  constructor(props) {
  	super(props);
    this.state = {
    	data: [],
      eyeColorsData: []
    };

  }

  componentDidMount() {
  	fetch('https://api.myjson.com/bins/17mcd1')
    	.then(response => {
      	return response.json()
      })
      .then(data => {
        console.log('Data fetched: ', data);
        let eyeColorsData = data.map(item => item.eyeColor);
        this.setState({ data, eyeColorsData });

      })
      .catch(err => {
      	console.log(err);
      });
  }

  render() {
  	let { eyeColorsData } = this.state;
    return (
    	<div>
      	<DataList
        	data={eyeColorsData} />
      </div>
    );
  }
}

export default App;
