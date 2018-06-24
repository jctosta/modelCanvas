import React from 'react';
import PropTypes from 'prop-types';
import { CirclePicker } from 'react-color';
import i18n from '../i18n/i18n';

class NewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#fff',
    };
    this.processForm = this.processForm.bind(this);
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }

  processForm(event) {
    event.preventDefault();
    this.props.addCard(this.props.parentId, event.target[0].value, this.state.color);
    this.props.cancelAction();
  }

  handleChangeComplete(color) {
    this.setState({ color: color.hex });
  }

  render() {
    return (
      <div className="card p-1">
        <div className="card-body p-1 m-1">
          <form className="form" onSubmit={this.processForm}>
            <div className="form-group">
              <label htmlFor="newCard">{i18n.t('canvas_new_card_content_label.label')}:</label><br />
              <textarea id="newCard" name="labelValue" rows="3" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="colorSelector">{i18n.t('canvas_new_card_color_label.label')}:</label><br />
              <CirclePicker
                color={this.state.color}
                colors={['#f1e9e7', '#e6fad7', '#fff7c9', '#f5cac3', '#c7deed', '#ffd1f2']}
                onChangeComplete={this.handleChangeComplete}
              />
            </div>
            <div className="text-right">
              <button className="btn btn-default" onClick={this.props.cancelAction}>{i18n.t('canvas_new_card_cancel.label')}</button>
              <button className="btn btn-primary" type="submit">{i18n.t('canvas_new_card_button.label')}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

NewCard.propTypes = {
  cancelAction: PropTypes.func.isRequired,
  parentId: PropTypes.number.isRequired,
  addCard: PropTypes.func.isRequired,
};

export default NewCard;
