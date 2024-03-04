import { Link } from "react-router-dom";
import "./Signup.css";
function Signup() {
  return (
    <div className="signup">
      <div className="card">
        <div className="left">
          <h2>Social-App</h2>
          <p>
            You need to be social? Increase your Social Life by using{" "}
            <b>Social-App </b>
            Create new acount and start now!
          </p>
          <span>Already have account?</span>
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>
        <br></br>
        <form action="" className="right">
          <input type="text" name="username" placeholder="username" required />
          <input type="email" name="email" placeholder="email" required />

          <input
            type="password"
            name="password"
            placeholder="password"
            required
          />
          <button type="submit" className="btn">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
