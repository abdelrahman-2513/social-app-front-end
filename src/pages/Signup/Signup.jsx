import { Link } from "react-router-dom";
import "./Signup.css";
import { useState } from "react";
import { SignUp } from "../../actions/user.actions";
import { useUser } from "../../providers/user.context";
import Loading from "../../assets/Loading/Loading";

function Signup() {
  const { dispatch, state } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    gender: "",
    role: "user",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "age") value = Number(value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    SignUp(formData, dispatch);
  };

  return (
    <>
      {state.loading ? (
        <Loading />
      ) : (
        <div className="signup">
          <div className="card">
            <div className="left">
              <h2>Social-App</h2>
              <p>
                You need to be social? Increase your Social Life by using{" "}
                <b>Social-App </b>
                Create new account and start now!
              </p>
              <span>Already have an account?</span>
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
            </div>
            <br></br>
            <form onSubmit={handleSubmit} className="right">
              <input
                type="text"
                name="name"
                placeholder="Username"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
              />
              <div className="row">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                  />{" "}
                  Female
                </label>
              </div>

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className="btn">
                Signup
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;
