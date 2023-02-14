import react, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    // console.log("apple");
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div>
      <img alt="loading..." className="logo"   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsK4695R7GkWMHY-4xLOz5FFHg7JPvF2Wyxg&usqp=CAU"/>
      {auth ?  <ul className="nav-ul">
          <li>
            {" "}
            <Link to="/">Products </Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/add">Add Product</Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/update">Update Product </Link>{" "}
          </li>

          <li>
            {" "}
            <Link to="/profile">Profile </Link>{" "}
          </li>
          <li className="nav-right">
            {" "}
            <Link onClick={logout} to="/signup">
              Logout ({JSON.parse(auth).name})
            </Link>{" "}
          </li>

          {/* { auth?
         <li> <Link onClick={logout} to="/signup">Logout</Link> </li>
       :
        <li> <Link to="/signup">Sign Up </Link> </li>
        } */}

          {/* { auth? <li> <Link onClick={logout} to="/signup">Logout</Link> </li>: <> <li> <Link to="/signup">Sign Up </Link> </li>
            <li> <Link to="/login">Login </Link> </li>
            </>
           } */}

          {/* <li>
       
            <Link to="/login">Login </Link>
          </li> */}
        </ul>
      : 
        <ul className="nav-ul nav-right">
          <li>
    
            <Link to="/signup">Sign Up </Link>
          </li>
          <li>
            
            <Link to="/login">Login </Link>
          </li>
        </ul>
      }
    </div>
  );
};

export default Nav;
