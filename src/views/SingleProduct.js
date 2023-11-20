import React, { useEffect, useState } from "react";
import Rating from "../components/homeComponents/Rating";
import Message from "./../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  listProduct,
  listProductDetails,
} from "../redux/actions/ProductAction";
import Loading from "./../components/LoadingError/Loading";
import { PRODUCT_CREATE_REVIEW_RESET } from "../redux/constants/ProductConstants";
import {
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useToast,
  Button,
  Input,
} from "@chakra-ui/react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { addToCart } from "../redux/actions/CartAction";
import Description from "../components/ProductDetail/Description";
import RatingDetail from "../components/ProductDetail/RatingDetail";
import PreferProduct from "../components/ProductDetail/PreferProduct";
import { Link } from "react-router-dom";
const SingleProduct = ({ match }) => {
  // Set up Hooks State
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const toast = useToast();
  // GET PRODUCT ID
  const productId = match.params.id;
  const dispatch = useDispatch();

  // CALL REDUCER
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const userLogin = useSelector((state) => state.userLogin);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = useSelector((state) => state.productCreateReview);
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const { userInfo } = userLogin;

  // ComponentDidMount, async/await
  useEffect(() => {
    if (successCreateReview) {
      toast({
        title: `Successfully Submit Review !`,
        description: `You have successful reviewed for product ${product?.productName}`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProduct());
    dispatch(listProductDetails(productId));
    // eslint-disable-next-line
  }, [dispatch, productId, successCreateReview]);
  // Handle Add Cart Button
  const AddToCartHandle = (e) => {
    e.preventDefault();
    dispatch(addToCart(productId, qty, typeSelect));
    toast({
      title: `Added ${qty} product successfully.`,
      description: `You've added ${product?.productName} into cart`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  const [typeSelect, setTypeSelect] = useState([]);

  return (
    <>
      <div className="container single-product">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <Link to="/shop">
                  <Flex align="center" justify="start" mb={10}>
                    <Icon as={IoIosArrowRoundBack} w={10} h={15} />
                    <Text fontSize="18px">Go to the shop</Text>
                  </Flex>
                </Link>
                <div className="single-image">
                  <Image src={product?.image} alt={product?.productName} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <Heading
                      as="h2"
                      size="20px"
                      className="product-name"
                      style={{ lineHeight: "2.5rem" }}
                    >
                      {product?.productName}
                    </Heading>
                  </div>
                  <Text fontSize="16px">{product?.description}</Text>

                  <Stack className="product-count col-lg-10">
                    <Flex className="flex-box d-flex justify-content-between align-items-center">
                      <Heading as="h6">Price</Heading>
                      <Text fontSize="18px">${product?.price}</Text>
                    </Flex>
                    <Flex className="flex-box d-flex justify-content-between align-items-center">
                      <Heading as="h6">Status</Heading>
                      {product?.countInStock > 0 ? (
                        <Text color="green.600">In stock</Text>
                      ) : (
                        <Text color="tomato" textTransform="uppercase">
                          Out of stock
                        </Text>
                      )}
                    </Flex>
                    <Flex className="flex-box d-flex justify-content-between align-items-center">
                      <Heading as="h6">Review</Heading>
                      <Rating
                        value={product?.rating}
                        text={`${product?.numReviews} reviews`}
                      />
                    </Flex>
                    <Flex
                      className="flex-box"
                      justify="space-between"
                      align="center"
                    >
                      <Heading as="h6">Color</Heading>
                      <Flex display={"block"} ml={"30px"}>
                        {product.typeProduct.map((type, index) => (
                          <button
                            className={
                              typeSelect.color === type.color
                                ? "box-selected"
                                : "box-select"
                            }
                            key={index}
                            onClick={() => {
                              setQty(1);
                              setTypeSelect({ color: type.color });
                            }}
                          >
                            {type.color}
                          </button>
                        ))}
                      </Flex>
                    </Flex>

                    <Flex
                      className="flex-box"
                      justify="space-between"
                      align="center"
                    >
                      <Heading as="h6">Size</Heading>
                      <Flex display={"block"} ml={"30px"}>
                        {product.typeProduct
                          .filter((type) => type.color === typeSelect.color)
                          .map((filteredType) =>
                            filteredType.sizes.map((sizes, index) => (
                              <button
                                className={
                                  typeSelect.size === sizes.size
                                    ? "box-selected"
                                    : "box-select"
                                }
                                key={index}
                                onClick={() => {
                                  setTypeSelect({
                                    ...typeSelect,
                                    size: sizes.size,
                                    countInStock: sizes.quantity,
                                  });
                                  setQty(1);
                                }}
                              >
                                {sizes.size}
                              </button>
                            ))
                          )}
                      </Flex>
                    </Flex>

                    <Flex className="flex-box d-flex justify-content-between align-items-center">
                      <Heading as="h6">Quantity</Heading>
                      <Box>
                        <div className="quantity-control">
                          <Button
                            onClick={() => {
                              if (qty > 1) {
                                setQty(qty - 1);
                              }
                            }}
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            value={qty}
                            min={1}
                            max={
                              typeSelect?.countInStock
                                ? typeSelect.countInStock
                                : 1
                            }
                            onChange={(e) => {
                              const newValue = Math.min(
                                Math.max(1, e.target.value),
                                typeSelect.countInStock
                              );
                              setQty(newValue);
                            }}
                          />
                          <Button
                            onClick={() => {
                              if (qty < typeSelect.countInStock) {
                                setQty(qty + 1);
                              }
                            }}
                          >
                            +
                          </Button>
                        </div>
                      </Box>
                    </Flex>

                    <button
                      disabled={typeSelect?.countInStock > 0 ? false : true}
                      onClick={AddToCartHandle}
                      className="add-to-card-btn"
                    >
                      Add to cart
                    </button>

                    {/* Description */}
                    <Description product={product} />
                  </Stack>
                </div>
              </div>
            </div>

            {/* RATING */}
            <RatingDetail
              product={product}
              userInfo={userInfo}
              comment={comment}
              rating={rating}
              setRating={setRating}
              setComment={setComment}
              loadingCreateReview={loadingCreateReview}
              errorCreateReview={errorCreateReview}
              productId={productId}
            />
          </>
        )}
        <div className="maylike-products-wrapper">
          <Center>
            <Heading as="h4" size="md" textTransform="uppercase">
              Maybe you like
            </Heading>
          </Center>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.slice(0, 6).map((item) => (
                <PreferProduct key={item._id} productPrefer={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
