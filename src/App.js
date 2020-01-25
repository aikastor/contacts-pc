import React, {Fragment} from 'react';
import Navigation from "./components/UI/Navigation/Navigation";
import {Container} from "reactstrap";
import {Route, Switch} from "react-router";
import Contacts from "./containers/Contacts/Contacts";
import EditContact from "./containers/EditContact/EditContact";
import AddContact from "./containers/AddContact/AddContact";

const App = () => {
  return (
      <Fragment>
        <Navigation/>
        <Container>
          <Switch>
            <Route path='/'  exact component={Contacts}/>
            <Route path='/add/' exact component={AddContact}/>
            <Route path='contacts/:id/edit/' component={EditContact}/>
            <Route render={()=> <h2>Page not found</h2>}/>
          </Switch>
        </Container>
      </Fragment>
  );
};

export default App;