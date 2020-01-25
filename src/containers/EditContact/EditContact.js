import React, {Component} from 'react';
import {editContact, fetchSingleContact} from "../../store/actions/editContactActions";
import {connect} from "react-redux";
import {Button, Form, FormGroup, Input, Label, Spinner} from "reactstrap";

class EditContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email:'',
      photo: '',
      id: ''
    };
  }


  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.loadContact(id);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.match.params.id !== prevProps.match.params.id) {
      console.log(prevProps.match.params.id);
      let id = this.props.match.params.id;
      this.props.loadContact(id);
    }
  }

  handleFormSubmit = async e => {
    e.preventDefault();

    const contactData = {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      photo: this.state.photo,
    };

    this.props.patchContact(this.props.match.params.id, contactData);
  };

  handleInputChange = e => this.setState({[e.target.name]: e.target.value});

  render() {
    let form =  (<Form onSubmit={this.handleFormSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name"
               value={this.props.contact.name}
               onChange={this.handleInputChange}
               id="name" required/>
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone</Label>
        <Input type="phone" name="phone"
               value={this.props.contact.phone}
               onChange={this.handleInputChange}
               id="phone" required/>
      </FormGroup>
      <FormGroup>
        <Label for="email">E-mail</Label>
        <Input type="email" name="email"
               value={this.props.contact.email}
               onChange={this.handleInputChange}
               id="email" required/>
      </FormGroup>
      <FormGroup>
        <Label for="photo">Photo</Label>
        <Input type="text" name="photo"
               value={this.props.contact.photo}
               onChange={this.handleInputChange}
               id="photo" required/>
      </FormGroup>
            <img src={this.props.contact.photo}
                 style={{width: '80px', height: '80px', objectFit: 'cover'}}
                  alt={'avatar'}/>
      <FormGroup>
        <Button color='primary'>Submit</Button></FormGroup>
    </Form>);

    return (
        <div>
          {! this.props.loading ?
              form: <Spinner/>
          }
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
  patchContact: (id, object) => dispatch(editContact(id, object))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);