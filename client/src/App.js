import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'semantic-ui-react';
import { AuthRoute } from './components/common/AuthRoute';
import { Nav } from './components/common/Nav';
import { AuthProvider } from './components/context/auth.js';
import { Home } from './components/pages/Home';
import { LogIn } from './components/pages/LogIn';
import { Register } from './components/pages/Register';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Nav/>
          <Route exact path="/" component={Home}/>
          <AuthRoute exact path="/login" component={LogIn}/>
          <AuthRoute exact path="/register" component={Register}/>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
