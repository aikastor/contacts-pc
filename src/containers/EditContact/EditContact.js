import React, {Component} from 'react';
import {editContact, fetchSingleContact} from "../../store/actions/editContactActions";
import {connect} from "react-redux";
import {Button, Form, FormGroup, Input, Label, Spinner} from "reactstrap";

class EditContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.contact.name,
      phone: this.props.contact.phone,
      email:this.props.contact.email,
      photo: this.props.contact.photo,
      id: this.props.match.params.id,
    };
  }


  async componentDidMount() {
    await this.props.loadContact(this.state.id);
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if(prevProps !== this.state) {
  //     return this.props.loadContact(this.state.id);
  //   }
  // }

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
            <img src={this.state.photo}
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