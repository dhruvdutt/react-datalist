import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  item: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
}

const defaultProps = {
  isChecked: false,
}

class Checkbox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isChecked: props.isChecked ? props.isChecked : false,
    }

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }

  toggleCheckbox() {
    let { onChange, item } = this.props;

    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }));

    onChange(item);
  }

  render() {
    let { label, item } = this.props;
    let { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={item}
            checked={isChecked}
            onChange={this.toggleCheckbox}
          />

          {label}
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
