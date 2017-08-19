import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
}

const defaultProps = {
  isChecked: false,
}

class Radio extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isChecked: props.isChecked ? props.isChecked : false,
    }

    this.toggleRadio = this.toggleRadio.bind(this);
  }

  toggleRadio() {
    let { onChange, item } = this.props;

    console.log('toggleRadio', this.state);

    // this.setState(({ isChecked }) => ({
    //   isChecked: !isChecked
    // }), () => {
    //   console.log('toggleRadio post setState', this.state);
      onChange(item);
    // });


  }

  render() {
    let { name, label, item, isChecked } = this.props;

    return (
      <div className="checkbox">
        <label>
          <input
            type="radio"
            value={item}
            name={name}
            checked={isChecked}
            onChange={this.toggleRadio}
          />

          {label}
        </label>
      </div>
    );
  }
}

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;

export default Radio;
