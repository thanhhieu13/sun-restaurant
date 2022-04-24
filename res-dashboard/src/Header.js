import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
function Header(){
    let user = JSON.parse(localStorage.getItem('user-info'))
    const history = useHistory();
    function logOut(){
        localStorage.clear();
        history.push('/register')
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                
                    <Navbar.Brand href="#home">Restaurant</Navbar.Brand>
                    <Nav className="me-auto navbar_warapper">
                          {      
                                localStorage.getItem('user-info') ?
                            
                            <>
                                <Link className="nav-item" to="/">Product List</Link>
                                <Link className="nav-item" to="/add">Add Products</Link>
                                <Link className="nav-item" to="/update">Update Products</Link>
                            </>
                            :
                            <>
                                <Link className="nav-item" to="/login">Login</Link>
                                <Link className="nav-item" to="/register">Register</Link> 
                            </>    
                        } 
                    </Nav>
                    {localStorage.getItem('user-info')?
                    <Nav>
                    <NavDropdown id="logout" title = "Logout">
                        <NavDropdown.Item id="dropdown" onClick={logOut}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    : null}
                 
            </Navbar>
        </div>
    )
}
export default Header