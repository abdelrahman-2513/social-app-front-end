import { useEffect, useState } from "react";
import { useUser } from "../../providers/user.context";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../assets/Loading/Loading";
import { SignIn } from "../../actions/user.actions";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, state } = useUser();
  const nav = useNavigate();
  const handleForm = (e) => {
    e.preventDefault();
    console.log(email, password);
    SignIn({ email, password }, dispatch);
  };
  useEffect(() => {
    if (state.isAuthenticated) nav("/");
  }, [state]);
  return (
    <>
      {state["loading"] ? (
        <Loading />
      ) : (
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
            <form className="right" onSubmit={handleForm}>
              <input
                type="text"
                name="username"
                placeholder="username"
                required
                onChange={(e) => {
                  setEmail(e.target.value.toLowerCase());
                }}
              />

              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value.toLowerCase());
                }}
                required
              />
              <button className="btn" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
