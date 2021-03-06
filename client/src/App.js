import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'semantic-ui-react';
import { AuthRoute } from './components/common/AuthRoute';
import { Nav } from './components/common/Nav';
import { AuthProvider } from './components/context/auth.js';
import { Home } from './components/pages/home/Home';
import { LogIn } from './components/pages/login/LogIn';
import { Post } from './components/pages/post/Post';
import { Register } from './components/pages/register/Register';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Nav/>
          <Route exact path="/" component={Home}/>
          <AuthRoute exact path="/login" component={LogIn}/>
          <AuthRoute exact path="/register" component={Register}/>
          <Route exact path="/posts/:postId" component={Post}/>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
