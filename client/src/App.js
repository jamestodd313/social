import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'semantic-ui-react';
import { Nav } from './components/common/Nav';
import { Home } from './components/home/Home';
import { LogIn } from './components/login/LogIn';
import { Register } from './components/register/Register';
function App() {
  return (
    <Router>
      <Container>
        <Nav/>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={LogIn}/>
        <Route exact path="/register" component={Register}/>
      </Container>
    </Router>
  );
}

export default App;
