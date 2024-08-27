import Container from 'react-bootstrap/Container';
import LoginForm from './Components/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

function AdminHome() {
  return (
    <Container className="h-100">
      <LoginForm />
    </Container>
  );
}

export default AdminHome;
