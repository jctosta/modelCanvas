import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import marked from 'marked';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';

import { CirclePicker } from 'react-color';

import i18n from '../i18n/i18n';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleEditForm: false,
      color: this.props.color,
    };
    this.processRemove = this.processRemove.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);

    this.processForm = this.processForm.bind(this);
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }

  processRemove(event) {
    event.preventDefault();
    this.props.removeCard(this.props.id);
  }

  processForm(event) {
    event.preventDefault();
    this.props.updateCardValue(this.props.id, event.target[0].value, this.state.color, event.target[1].value);
    this.toggleEditForm();
  }

  handleChangeComplete(color) {
    this.setState({ color: color.hex });
  }

  toggleEditForm() {
    this.setState({
      toggleEditForm: !this.state.toggleEditForm,
    });
  }

  renderEditForm() {
    if (this.state.toggleEditForm) {
      return (
        <form className="form" onSubmit={this.processForm}>
          <div className="form-group">
            <label htmlFor="newCard">{i18n.t('canvas_new_card_content_label.label')}:</label><br />
            <textarea id="newCard" name="labelValue" rows="3" className="form-control" defaultValue={this.props.text} />
          </div>
          <div className="form-group">
            <label htmlFor="colorSelector">{i18n.t('canvas_new_card_color_label.label')}:</label><br />
            <CirclePicker
              color={this.state.color}
              colors={['#f1e9e7', '#e6fad7', '#fff7c9', '#f5cac3', '#c7deed', '#ffd1f2']}
              onChangeComplete={this.handleChangeComplete}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newParentSelect">{i18n.t('canvas_edit_card_move_card_label.label')}:</label><br />
            <select className="form-control" name="select" id="newParentSelect" defaultValue={this.props.parentId}>
              {this.props.containers.map(c => <option value={c.id}>{c.title}</option>)}
            </select>
          </div>
          <div className="text-right">
            <button className="btn btn-default" onClick={this.toggleEditForm}>{i18n.t('canvas_new_card_cancel.label')}</button>
            <button className="btn btn-primary" type="submit">{i18n.t('canvas_new_card_button.label')}</button>
          </div>
        </form>
      );
    }
    return <div className="float-left py-1 pl-1">{this.props.text}</div>;
  }

  render() {
    return (
      <div className="card p-0 m-0 my-1" style={{ backgroundColor: this.props.color }}>
        <div className="card-body p-1">
          {this.renderEditForm()}
          <div className="float-right py-1">
            <button type="button" className="btn btn-sm btn-link text-secondary" aria-label="Edit" onClick={this.toggleEditForm}><FontAwesomeIcon icon={faEdit} /></button>
            <button type="button" className="btn btn-sm btn-link text-secondary" aria-label="Remove" onClick={this.processRemove}><FontAwesomeIcon icon={faTrash} /></button>
          </div>

        </div>
      </div>
    );
  }
}

Card.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  id: PropTypes.string.isRequired,
  removeCard: PropTypes.func.isRequired,
  updateCardValue: PropTypes.func.isRequired,
};

Card.defaultProps = {
  color: '#fff',
};

export default Card;
