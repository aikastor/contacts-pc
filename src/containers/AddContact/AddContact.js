import React, {Component} from 'react';
import {Alert, Button, Form, FormGroup, Input, Label, Spinner} from "reactstrap";
import {addContact} from "../../store/actions/addContactActions";
import {connect} from "react-redux";

class AddContact extends Component {
  state = {
    name: '',
    phone: '',
    email: '',
    photo: '',
    alert: false,
  };

  handleInputChange = e => this.setState({[e.target.name]: e.target.value});

  handleFormSubmit = async e => {
    e.preventDefault();

    const contactData = {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      photo: this.state.photo,
    };

    await this.props.submitContact(contactData);

    this.setState({
      name: '',
      phone: '',
      email: '',
      photo: '',
    });
    this.toggleAlert();
  };
  toggleAlert =()=>{
    this.setState({alert:true},()=>{
      window.setTimeout(()=>{
        this.setState({alert:false})
      },4000)
    });
  };
  render() {
    let form =  (<Form onSubmit={this.handleFormSubmit}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name"
               value={this.state.name}
               onChange={this.handleInputChange}
               id="name" required/>
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone</Label>
        <Input type="phone" name="phone"
               value={this.state.phone}
               onChange={this.handleInputChange}
               id="phone" required/>
      </FormGroup>
      <FormGroup>
        <Label for="email">E-mail</Label>
        <Input type="email" name="email"
               value={this.state.email}
               onChange={this.handleInputChange}
               id="email" required/>
      </FormGroup>
      <FormGroup>
        <Label for="photo">Photo</Label>
        <Input type="text" name="photo"
               value={this.state.photo}
               onChange={this.handleInputChange}
               id="photo" required/>
      </FormGroup>
      {
        this.state.photo.length > 0 ?
            <img src={this.state.photo}
                 style={{width: '80px', height: '80px', objectFit: 'cover'}}/> :
            <span>preview will be here</span>
      }
      <FormGroup> <Button color='primary'>Submit</Button></FormGroup>
    </Form>);

    return (
        <div>
          {this.props.loading ?
              <Spinner color="primary" /> :
              form
          }
          <Alert color={this.props.error ? 'danger' : 'success'} isOpen={this.state.alert}>
            {this.props.error ? this.props.error : 'Contact added!'}
          </Alert>
        </div>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.addContact.loading,
  error: state.addContact.errors,
});
const mapDispatchToProps = dispatch => ({
  submitContact: (contact)=> dispatch(addContact(contact))
});
export default connect(mapStateToProps, mapDispatchToProps)(AddContact);