import { Flex, HStack } from "@chakra-ui/react";
import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../redux/actions/UserAction";
import { CiUser } from "react-icons/ci";
import { AiOutlineUserAdd } from "react-icons/ai";
const DesktopHeader = (props) => {
  const { userInfo, keyword, setKeyword, cartItems, dispatch } = props;

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    window.open(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, "_self");
  };
  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/shop");
    }
  };
  return (
    <div className="row ">
      <div className="col-md-2 col-6 d-flex align-items-center">
        <Link className="navbar-brand" to="/">
          <img alt="logo" src="/images/logo.png" />
        </Link>
      </div>
      <div className="col-md-6 col-8 d-flex align-items-center">
        <div className="col-md-12 col-8 d-flex mx-auto">
          <form className="input-group" onSubmit={submitHandler}>
            <input
              className="form-control border-end-0 border"
              type="search"
              id="example-search-input"
              placeholder="Tìm kiếm..."
              onChange={(e) => setKeyword(e.target.value)}
            />
            <span className="input-group-append">
              <button
                className="btn bg-white border-start-0 border ms-n5"
                type="button"
              >
                <i className="fa fa-search" />
              </button>
            </span>
          </form>
        </div>
      </div>
      <Flex align="center" justify="end" className="col-md-4 Login-Register ">
        {userInfo ? (
          <div className="btn-group">
            <ul className="nav nav-pills">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle name-button text-dark"
                  data-bs-toggle="dropdown"
                >
                  Hi,{" "}
                  {userInfo.isAdmin
                    ? `Admin ${userInfo.name}`
                    : `${userInfo.name}`}
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="#"
                      onClick={logoutHandler}
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        ) : (
          <HStack marginRight={10} align="center">
            <Link to="/login" className="mx-3">
              <Flex fontSize="16px" align="center">
                <CiUser />
                Login
              </Flex>
            </Link>
            <Link to="/register" className="mx-3">
              <Flex fontSize="16px" align="center">
                <AiOutlineUserAdd />
                Sign up
              </Flex>
            </Link>
          </HStack>
        )}

        <Link to="/cart">
          <HiOutlineShoppingBag size="25px" />
          {/* <i className="fas fa-shopping-bag"></i> */}
          <span className="badge">{cartItems.length}</span>
        </Link>
      </Flex>
    </div>
  );
};

export default DesktopHeader;
