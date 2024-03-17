import "./Settings.css";

// context.......................................
import { useUser } from "../../providers/user.context";
// actions ......................................
import { Logout, UpdateMe, UpdatePassword } from "../../actions/user.actions";
import { useState } from "react";
function Settings() {
  const { state, dispatch } = useUser();
  const { user, userAccessToken } = state;
  const [selectedFile, setSelectedFile] = useState(null);
  const [userformData, setUserFormData] = useState({
    name: `${user.name}`,
    age: user.age,
  });
  const [userPasswordsData, setUserPasswordsData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "age") value = Number(value);
    setUserFormData({ ...userformData, [name]: value });
  };
  const handleChange2 = (e) => {
    let { name, value } = e.target;

    setUserPasswordsData({ ...userPasswordsData, [name]: value });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpdateMe = (e) => {
    console.log(userAccessToken);
    e.preventDefault();
    const formData = new FormData();
    if (selectedFile) formData.append("image", selectedFile);
    formData.append("name", userformData.name);
    formData.append("age", userformData.age);
    console.log(formData);
    UpdateMe(formData, userAccessToken, dispatch);
  };
  const handleLogout = () => {
    Logout(dispatch);
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log(userPasswordsData);
    UpdatePassword(userPasswordsData, userAccessToken, dispatch);
  };
  return (
    <div className="setting-container">
      <form action="" onSubmit={handleUpdateMe}>
        <div className="photo">
          <input
            type="file"
            name=""
            id="fileType"
            onChange={handleFileChange}
          />
          <label htmlFor="fileType">
            <img
              src={user.image === "unknown" ? "./unknown.jpg" : `${user.image}`}
              alt={`${user.name} profile-photo`}
            />
          </label>
        </div>
        <div className="input">
          <input
            type="email"
            name="email"
            placeholder={user.email}
            value={user.email}
            id="email"
          />
        </div>
        <div className="input">
          <input
            type="text"
            name="name"
            placeholder={user.name}
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <input
            type="number"
            name="age"
            placeholder={user.age}
            id="age"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <input
            type="text"
            name="gender"
            placeholder={user.gender}
            value={user.gender}
            id="gender"
          />
        </div>
        <div className="btns">
          <button className="btn btn-red" onClick={handleLogout}>
            Logout
          </button>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
      <form action="" onSubmit={handleChangePassword}>
        <div className="input">
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            id="password"
            onChange={handleChange2}
          />
        </div>
        <div className="input">
          <input
            onChange={handleChange2}
            type="password"
            name="newPassword"
            placeholder="New Password"
            id="newPassword"
          />
        </div>
        <div className="input">
          <input
            onChange={handleChange2}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            id="confirmPassword"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default Settings;
