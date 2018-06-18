import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewCard from './NewCard';


class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
    this.hideForm = this.hideForm.bind(this);
    this.showForm = this.showForm.bind(this);
  }
  showForm() {
    if (this.state.isVisible === false) {
      this.setState({
        isVisible: true,
      });
    }
  }
  hideForm() {
    if (this.state.isVisible === true) {
      this.setState({
        isVisible: false,
      });
    }
  }

  renderChildrenOrPlaceholder() {
    if (this.props.children.length > 0) {
      return this.props.children;
    }
    return (<p className="small text-muted">{this.props.description}</p>);
  }

  render() {
    return (
      <div className={`${this.props.color} card mt-1`}>
        {/* <div className="card-header">
          <h5 className="card-title mb-0">{this.props.title}</h5>
        </div> */}
        <div className="card-body px-3 py-3" style={{ overflow: 'auto' }}>
          <h4 className="card-title">{this.props.title}</h4>
          <h6 className="card-subtitle mb-2 text-muted">{this.props.description}</h6>
          {/* <p className="small text-muted">{this.props.description}</p> */}
          {this.props.children}
          {
            this.state.isVisible ?
              <NewCard
                parentId={this.props.parentId}
                cancelAction={this.hideForm}
                addCard={this.props.addCard}
              /> : <br />
          }
        </div>
        <div className="text-right">
          <button className="btn btn-link" onClick={this.showForm}>Add Card...</button>
        </div>
      </div>
    );
  }
}

Content.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string.isRequired,
  parentId: PropTypes.number.isRequired,
  addCard: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  size: PropTypes.string,
};

Content.defaultProps = {
  size: '',
};

export default Content;
