import React, {Component} from 'react';
import {fetchSingleContact} from "../../store/actions/editContactActions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class EditContact extends Component {

  state = {
    name: this.props.contact.name,
    phone: '',
    email: '',
    photo: '',
  };

 componentDidMount() {

  }
  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  render() {
    return (
        <div>
          <p>asdasdadsadasdasd</p>
        </div>
    );
  }
}
const mapStateToProps = state => ({
  contact: state.editContact.contact,
  loading: state.editContact.loading,
  errors: state.editContact.errors,
});

const mapDispatchToProps = dispatch => ({
  loadContact: (contactID)=> dispatch(fetchSingleContact(contactID)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditContact);