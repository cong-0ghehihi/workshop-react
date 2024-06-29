import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
export default function Header() {

  const { authState, dispatch } = useContext(AuthContext)
  console.log(authState);

  const handleLogout=()=>{
    dispatch({type:'LOGOUT'})
  }
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/products">Shop</Link>
        </li>
        {authState.isAuthenticated ? (
          <>
            <li>
              <span>Welcome, {authState?.user.email}</span>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            <li>
              <Link to="/admin">Bạn là admin?</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link> {" / "}
              <Link to="/register">Register</Link>
            </li>

          </>
        )}
      </ul>
    </header>
  );
}
