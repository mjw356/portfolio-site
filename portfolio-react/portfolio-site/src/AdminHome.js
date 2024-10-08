import Container from 'react-bootstrap/Container';
import LoginForm from './Components/LoginForm';
import AdminPanel from './Components/AdminPanel';
import { useState } from 'react';
import Header from './Components/Header';

function AdminHome() {
  const [authToken, setAuthToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function AdminGateway(){
    if(isAuthenticated){
      return(
        <AdminPanel authToken={authToken}/>
      )
    } else {
      return(
        <LoginForm setIsAuthenticated={setIsAuthenticated} setAuthToken={setAuthToken} />
      )
    }
  }

  return (
    <Container className="h-100">
      <Header />
      <AdminGateway />
    </Container>
  );
}

export default AdminHome;
