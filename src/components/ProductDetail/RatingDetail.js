import React from "react";
import moment from "moment";
import Message from "../LoadingError/Error";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Rating from "../homeComponents/Rating";
import { useDispatch } from "react-redux";
import { productCreateReviewAction } from "../../redux/actions/ProductAction";
import Loading from "../LoadingError/Loading";
<<<<<<< HEAD

const RatingDetail = (props) => {
=======
const RatingDetail = (props) => { 
>>>>>>> 0e0839167a8c28bc66f0cbbd2999ad0464802b99
  const {
    product,
    userInfo,
    loadingCreateReview,
    errorCreateReview,
    comment,
    rating,
    setRating,
    setComment,
    productId,
  } = props;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      productCreateReviewAction(productId, {
        rating,
        comment,
      })
    );
    console.log(product.reviews[0].reviewId.name);
  };

  console.log(product);
  console.log(userInfo);
  return (
    <div className="row my-5">
      {userInfo ? (
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>
              <Heading as="h3" size="md">
                Review Product
              </Heading>
            </Tab>
            <Tab>
              <Heading as="h3" size="md">
                Product description
              </Heading>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="row">
                <div className="col-md-6">
                  <Heading as="h6" size="md" className="mb-3">
                    REVIEW
                  </Heading>
                  {product?.reviews?.length === 0 && (
                    <Message variant={"alert-secondary mt-3"}>
                      No any reviews
                    </Message>
                  )}
                  {product?.reviews?.map((item) => (
                    <Box
                      className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded-0"
<<<<<<< HEAD
                      key={item.reviewId._id}
                    >
                      <Text fontSize="lg" fontWeight="bold">
                        {item.reviewId.name}
                      </Text>
                      <Rating value={item.reviewId.rating} />
=======
                      key={review.reviewId._id}
                    >
                      <Text fontSize="lg" fontWeight="bold">
                        {review.reviewId.name}
                      </Text>
                      <Rating value={review.reviewId.rating} />
>>>>>>> 0e0839167a8c28bc66f0cbbd2999ad0464802b99
                      <Text fontSize="14px" fontWeight="light">
                        {moment(item.reviewId.createdAt).calendar()}
                      </Text>
                      <Text fontSize="16px" className="alert alert-info mt-3">
<<<<<<< HEAD
                        {item.comment}
=======
                        {review.reviewId.comment}
>>>>>>> 0e0839167a8c28bc66f0cbbd2999ad0464802b99
                      </Text>
                    </Box>
                  ))}
                </div>
<<<<<<< HEAD
                {product?.allowReview === true && (
                  <form className="col-md-6" onSubmit={submitHandler}>
=======
                {
                  product?.allowReview ===true  && (<form className="col-md-6" onSubmit={submitHandler}>
>>>>>>> 0e0839167a8c28bc66f0cbbd2999ad0464802b99
                    <Heading as="h6" size="md" textTransform="uppercase">
                      Write rating & review product
                    </Heading>
                    <div className="my-4">
                      {loadingCreateReview && <Loading />}
                      {errorCreateReview && (
                        <Message variant="alert-danger">
                          {errorCreateReview}
                        </Message>
                      )}
                    </div>
                    <div className="my-4">
                      <strong>Rating</strong>
                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="col-12 bg-light p-3 mt-2 border-0 rounded-0"
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                    <div className="my  -4">
                      <strong>Comment</strong>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        row="3"
                        className="col-12 bg-light p-3 mt-2 border-0 rounded-0"
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <button
                        disabled={loadingCreateReview}
                        className="col-12 bg-dark border-0 p-3 rounded-0 text-white"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <Text fontSize="16px">{product?.description}</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>
                <Heading as="h3" size="md">
                  Review Product
                </Heading>
              </Tab>
              <Tab>
                <Heading as="h3" size="md">
                  Product description
                </Heading>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className="row">
                  <div className="col-md-6">
                    <Heading as="h6" size="md" className="mb-3">
                      REVIEW
                    </Heading>
                    {product?.reviews?.length === 0 && (
                      <Message variant={"alert-secondary mt-3"}>
                        No any reviews
                      </Message>
                    )}
<<<<<<< HEAD
                    {product?.reviews?.map((item) => (
                      <Box
                        className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded-0"
                        key={item.reviewId._id}
                      >
                        {/* <button onClick={() => console.log(item)}>Test</button> */}
                        <Text fontSize="lg" fontWeight="bold">
                          {item.reviewId.name}
                          {console.log(item.reviewId.name)}
                        </Text>
                        <Rating value={item.reviewId.rating} />
                        <Text fontSize="14px" fontWeight="light">
                          {moment(item.reviewId.createdAt).calendar()}
                        </Text>
                        <Text fontSize="16px" className="alert alert-info mt-3">
                          {item.reviewId.comment}
=======
                    {product?.reviews?.map((review) => (
                      <Box
                        className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded-0"
                        key={review.reviewId._id}
                      >
                        <Text fontSize="lg" fontWeight="bold">
                          {review.reviewId.name}
                        </Text>
                        <Rating value={review.reviewId.rating} />
                        <Text fontSize="14px" fontWeight="light">
                          {moment(review.reviewId.createdAt).calendar()}
                        </Text>
                        <Text fontSize="16px" className="alert alert-info mt-3">
                          {review.reviewId.comment}
>>>>>>> 0e0839167a8c28bc66f0cbbd2999ad0464802b99
                        </Text>
                      </Box>
                    ))}
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <Text fontSize="16px">{product?.description}</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <div className="my-3">
            <Message variant={"alert-warning"}>
              Please{" "}
              <Link to="/login">
                <strong>LOGIN </strong>
              </Link>
              to write feedback{" "}
            </Message>
          </div>
        </>
      )}
    </div>
  );
};

export default RatingDetail;
