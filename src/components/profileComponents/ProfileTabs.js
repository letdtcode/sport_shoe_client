import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../LoadingError/Toast";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { updateProfile } from "../../redux/actions/UserAction";

const ProfileTabs = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [gender, setGender] = useState("");
  const toastId = React.useRef(null);
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000, // means 2s
  };

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, userInfo } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: updateLoading } = userUpdate;

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setGender(userInfo.gender)
      setPhone(userInfo.phoneNumber)
      setAddress(userInfo.address)
    }
  }, [dispatch, userInfo]);

  const submitUpdateHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Password does not match", ToastObjects);
      }
    } else {

      dispatch(updateProfile({ id: userInfo._id, name, email, gender, address, phoneNumber: phone, password }));
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success(
          "Profile updated successful",
          ToastObjects
        );
      }
    }
  }

  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form className="row  form-container" onSubmit={submitUpdateHandler} noValidate>
        <div className="col-md-6">
          <div className="form">
            <label for="name">Name account</label>
            <input
              className="form-control"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="name">Address</label>
            <input
              className="form-control"
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="name">Phone</label>
            <input
              className="form-control"
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="gender">Gender</label>
            <select
              className="form-control"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="password">New password</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="confirmPass">Confirm password</label>
            <input
              className="form-control"
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Update profile</button>
      </form>
    </>
  );
};

export default ProfileTabs
