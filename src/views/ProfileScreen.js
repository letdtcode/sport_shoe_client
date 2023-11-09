import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import Orders from "./../components/profileComponents/Orders";
import { getUserDetails } from "../redux/actions/UserAction";
import moment from "moment";
import { listMyOrderAction } from "../redux/actions/OrderAction";
import UpdateAvatar from "../components/profileComponents/UpdateAvatar";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  Menu,
  MenuItem,
  MenuButton,
  MenuList
} from "@chakra-ui/react";
const ProfileScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const myListOrder = useSelector((state) => state.myListOrder);
  const { userInfo } = userLogin;
  const { loading, orders, error } = myListOrder;
  const timeFormat = moment(userInfo?.createdAt).format("LL");

  useEffect(() => {
    dispatch(listMyOrderAction());
    dispatch(getUserDetails("profile"));
  }, [dispatch]);


  const handleViewAvatar = () => {


    // Thực hiện hành động xem avatar
  };

  const handleChangeAvatar = (e) => {
    e.preventDefault();
    inputRef.current.click();
  }

  const [imageFile, setImageFile] = useState(null);

  // preview


  // modal state
  const [modalOpen, setModalOpen] = useState(false);

  // ref to control input element
  const inputRef = useRef(null);

  // handle Change
  const handleImgChange = (e) => {
    setImageFile(e.target.files[0])
    setModalOpen(true);
    inputRef.current.value = '';
  };

  return (
    <>  <UpdateAvatar
          modalOpen={modalOpen}
          imageFile={imageFile}
          setModalOpen={setModalOpen}
          setImageFile={setImageFile}

        />
      <Container className="container mt-lg-5 mt-3" maxW="container.2xl">
      
        <div className="row align-items-start">
          <Box className="col-lg-3 p-0 shadow" borderRadius="lg">
            <div className="pb-0 pb-md-3">
              <div className="author-card-cover user-info-wrapper "></div>
              <div className="author-card-profile row">
              <input
                    hidden
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleImgChange}
                  />
                <div className="author-card-avatar col-md-5">
                 
                  <Menu isLazy>
                    <MenuButton className="card-avatar">
                      <Image src={userInfo?.avatarUrl? userInfo.avatarUrl : "./images/user.png" }alt="userprofileimage"  />
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={handleViewAvatar}>View Avatar</MenuItem>
                      <MenuItem onClick={handleChangeAvatar}>Change Avatar</MenuItem>
                    </MenuList>
                  </Menu>
                </div>
                <div className="author-card-details col-md-7">
                  <Heading as="h5" size="md" className="author-card-name mb-2">
                    <Text fontSize="16px">{userInfo?.name}</Text>
                  </Heading>
                  <span className="author-card-position">
                    <Text>Đã tham gia {timeFormat}</Text>
                  </span>
                </div>
              </div>
            </div>
            <div className="wizard pt-3 ">
              <Flex align="center">
                <div
                  className="nav align-items-start flex-column col-12 nav-pills me-3 list-group"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <Button
                    className="nav-link active justify-content-between"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    Profile Setting
                  </Button>
                  <Button
                    className="nav-link d-flex justify-content-between"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Orders List
                    <span className="badge2">{orders ? orders.length : 0}</span>
                  </Button>
                  {!!userInfo?.isAdmin && (
                    <Button className="nav-link d-flex justify-content-between">
                      <Link
                        href="https://admin-ecommerce-mern.vercel.app"
                        isExternal
                      >
                        Go to admin dashboard
                      </Link>
                    </Button>
                  )}
                </div>
              </Flex>
            </div>

          </Box>

          {/* panels */}
          <div
            className="tab-content col-lg-9 pb-5 pt-lg-0 pt-3"
            id="v-pills-tabContent"
          >
            <div
              className="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <ProfileTabs />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <Orders orders={orders} loading={loading} error={error} />
            </div>
          </div>
        </div>
      </Container>

    </>
  );
};

export default ProfileScreen;
