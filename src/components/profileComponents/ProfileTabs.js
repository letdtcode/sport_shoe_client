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
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
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
    }
  }, [dispatch, userInfo]);

  const submitUpdateHandler = (e) => {
    e.preventDefault();

    // ? Password match
    if (password !== confirmPass) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Password does not match", ToastObjects);
      }
    } else {
      // ? UPDATE PROFILE
      console.log("Updated Profile Successfully");
      dispatch(updateProfile({ id: userInfo._id, name, email, password }));
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success(
          "Profile updated successful",
          ToastObjects
        );
      }
    }
  };

  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form className="row  form-container" onSubmit={submitUpdateHandler}>
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
            <label for="email">Email address</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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

export default ProfileTabs;
