import React, {Component, Fragment} from 'react';
import {deleteContact, fetchContacts} from "../../store/actions/contactsActions";
import {connect} from "react-redux";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner
} from "reactstrap";

class Contacts extends Component {
  state ={
    modal: false,
    currentContactInfo: {},
    currentContactId: null,
  };
  componentDidMount() {
    this.props.loadContacts();
  }
  showContactModal = (contactData, contactId) => {
    let contactInfo = {...this.state.currentContactInfo};

    this.setState({
      currentContactInfo: contactData,
      currentContactId: contactId,
    });

    this.toggleModal();
  };
  onDeleting =() => {
    this.props.deleteContact(this.state.currentContactId);
    this.toggleModal();
  };
  toggleModal =()=> {
    this.setState({
      modal: !this.state.modal
    })
  };

  render() {
    let data = (
        <ListGroup>
          {Object.keys(this.props.contacts).map(item => (
              <ListGroupItem onClick={()=>this.showContactModal(this.props.contacts[item], item)}>
                <img src={this.props.contacts[item].photo}
                     style={{width: '80px', height: '80px', objectFit: 'cover'}}
                />
                <p>{this.props.contacts[item].name}</p>
              </ListGroupItem>
          ))}
        </ListGroup>
    );

    return (
        <Fragment>
          {! this.props.loading ?
              data: <Spinner/>
          }
          <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
            <ModalBody>
              <img src={this.state.currentContactInfo.photo}
                   style={{width: '80px', height: '80px', objectFit: 'cover'}}
              />
              <p>{this.state.currentContactInfo.name}</p>
              <p>{this.state.currentContactInfo.phone}</p>
              <p>{this.state.currentContactInfo.email}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.onDeleting}>Delete</Button>
            </ModalFooter>
          </Modal>
        </Fragment>

    );
  }
}
const mapStateToProps = state => ({
      contacts: state.contacts.contacts,
      loading: state.contacts.loading,
      error: state.contacts.loading
    }
);
const mapDispatchToProps = dispatch => ({
  loadContacts: () => dispatch(fetchContacts()),
  deleteContact: (contactID) => dispatch(deleteContact(contactID))
});
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);