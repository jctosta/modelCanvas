import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewCard from './NewCard';
import i18n from '../i18n/i18n';


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
      <div className="col-md">
        <div className={`${this.props.color} card my-1 h-95 py-1`} style={{ paddingBottom: '10px' }}>
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
            <button className="btn btn-link" onClick={this.showForm}>{i18n.t('canvas_addcard_button.label')}</button>
          </div>
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
