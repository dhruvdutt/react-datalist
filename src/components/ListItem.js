import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
}

const defaultProps = {
  isChecked: false,
}

class ListItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isChecked: props.isChecked,
    }

    this.toggleListItem = this.toggleListItem.bind(this);
  }

  /*
  * Toggle list item
  */
  toggleListItem() {
    let { onChange, item } = this.props;
    onChange(item);
  }

  render() {
    let { type, name, label, item, isChecked } = this.props;

    return (
      <div className="checkbox">
        <label>
          <input
            type={type}
            name={name}
            value={item}
            checked={isChecked}
            onChange={this.toggleListItem}
          />
          {label}
        </label>
      </div>
    );
  }
}

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;
