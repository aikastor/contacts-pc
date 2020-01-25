import React, {Fragment} from 'react';
import Navigation from "./components/UI/Navigation/Navigation";
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";
import Contacts from "./containers/Contacts/Contacts";
import EditContact from "./containers/EditContact/EditContact";
import AddContact from "./containers/AddContact/AddContact";

const App = () => {
  return (
      <Fragment>
        <Navigation/>
        <Container>
          <Switch>
            <Route path='contacts/edit/' exact component={EditContact}/>
            <Route path='/' exact component={Contacts}/>
            <Route path='/add/' exact component={AddContact}/>
          </Switch>
        </Container>
      </Fragment>
  );
};

export default App;