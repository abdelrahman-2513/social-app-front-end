import { Link } from "react-router-dom";
import "./Login.css";
function Login() {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h2>Social-App</h2>
          <p>
            You need to be social? Increase your Social Life by using{" "}
            <b>Social-App </b>
            Create new acount and start now!
          </p>
          <span>Don`t have account?</span>
          <Link to="/signup">
            <button className="btn btn-primary">Signup</button>
          </Link>
        </div>
        <br></br>
        <form action="" className="right">
          <input type="text" name="username" placeholder="username" required />

          <input
            type="password"
            name="password"
            placeholder="password"
            required
          />
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
