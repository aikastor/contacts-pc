import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  Spinner
} from "reactstrap";

import {deleteContact, fetchContacts} from "../../store/actions/contactsActions";


class Contacts extends Component {
  state ={
    modal: false,
    currentContactInfo: {},
    currentContactId: null,
  };
  componentDidMount() {
    this.props.loadContacts();
  }
  // componentDidUpdate(prevProps) {
  //   if (this.props.match.params !== prevProps.match.params) {
  //     return this.props.loadContacts();
  //   }
  // }

  showContactModal = (contactData, contactId) => {
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
              <ListGroupItem
                  onClick={()=>this.showContactModal(this.props.contacts[item], item)}
                  key={item}
              >
                <img src={this.props.contacts[item].photo}
                     style={{width: '80px', height: '80px', objectFit: 'cover'}}
                     alt={'avatar'}
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
                   alt={'avatar'}
              />
              <p>{this.state.currentContactInfo.name}</p>
              <p>{this.state.currentContactInfo.phone}</p>
              <p>{this.state.currentContactInfo.email}</p>
            </ModalBody>
            <ModalFooter>
              <Button style={{marginRight: '5px'}}
                      tag={Link}
                      to={`/contacts/${this.state.currentContactId}/edit`}
                      color='primary'
              >
                Edit >>
              </Button>
              <Button color="danger" onClick={this.onDeleting}>Delete</Button>
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