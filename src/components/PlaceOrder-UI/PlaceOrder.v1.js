import React, { useEffect } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import { ORDER_CREATE_RESET } from "../../redux/constants/OrderConstants";
import { createOrder } from "../../redux/actions/OrderAction";
const PlaceOrder = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // Product Price
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((a, b) => a + b.qty * b.price, 0)
  );
  // Shipping Price
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  // Tax Price
  cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice).toFixed(2));
  // Total Price
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);

  const { order, success, error } = orderCreate;

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, order, dispatch, success]);

  return (
    <section className="order-id-wrapper">
      <Container maxW="container.xxl">
        <Box
          className="row justify-content-center align-items-center"
          h={100}
          bg="gray.50"
        >
          <div className="col-md-10">
            <div className="order-id-content">
              <Heading as="h4" size="lg" className="order-id">
                Place Order
              </Heading>
              {/* <ul className="order-meta">
                <li>
                  <Text className="product" color="blackAlpha.500">
                    4 Product
                  </Text>
                </li>
                <li>
                  <Text fontSize="14px" className="track-order">
                    Track Order
                  </Text>
                </li>
              </ul> */}
            </div>
          </div>
        </Box>
        <Box className="row justify-content-center">
          <div className="col-md-10">
            <div className="row">
              {cart.cartItems.length === 0 ? (
                <Message variant="alert-info mt-5">Your cart is empty</Message>
              ) : (
                <>
                  <div className="col-md-7">
                    <div className="order-product mt-3">
                      <div className="order-title">
                        <Heading as="h5" size="md" className="title">
                          Product Information
                        </Heading>
                      </div>
                      <div className="order-product-table table-responsive">
                        <Table className="table">
                          <Tbody>
                            {cart.cartItems.map((item, index) => (
                              <Tr key={index}>
                                <Td className="product">
                                  <div className="order-product-item d-flex">
                                    <div className="product-thumb">
                                      <img
                                        src={`${item.image}`}
                                        alt={`${item.name}`}
                                      />
                                    </div>
                                    <div className="product-content media-body">
                                      <Heading
                                        as="h5"
                                        size="md"
                                        className="title"
                                      >
                                        <a href="#0">{item.name}</a>
                                      </Heading>
                                      <ul>
                                        <li>
                                          <Text fontSize="14px">
                                            Brand: {item.category.name}
                                          </Text>
                                        </li>
                                        <li>
                                          <Text fontSize="14px">
                                            {item.qty} X {item.price}
                                          </Text>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </Td>
                                <Td className="price">
                                  <Text
                                    fontSize="14px"
                                    className="product-price"
                                  >
                                    ${item.price}
                                  </Text>
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </div>
                      <div className="order-product-total">
                        <div className="sub-total">
                          <Text className="value">Subtotal:</Text>
                          <Text className="price">${cart.itemsPrice}</Text>
                        </div>
                        <div className="sub-total">
                          <Text className="value">Shipping (+):</Text>
                          <Text className="price">${cart.shippingPrice}</Text>
                        </div>
                        <div className="sub-total">
                          <Text className="value">Tax (+):</Text>
                          <Text className="price">${cart.taxPrice}</Text>
                        </div>
                      </div>
                      <div className="payable-total">
                        <Text className="value">Total:</Text>
                        <Text className="price">${cart.totalPrice}</Text>
                      </div>
                      <Flex className="card-body border-top" justify="end">
                        {cart.cartItems.length === 0 ? null : (
                          <button type="submit" onClick={placeOrderHandler}>
                            <Link className="text-light btn btn-dark">
                              Confirm order
                            </Link>
                          </button>
                        )}
                      </Flex>
                      {error && (
                        <div className="my-3 col-12">
                          <Message variant="alert-danger">{error}</Message>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-5">
                    {/* <div className="single-order-details mt-3">
                      <div className="order-title ">
                        <Heading as="h5" size="md" className="title">
                          Thông tin đơn hàng
                        </Heading>
                      </div>
                      <Stack className="order-details-content">
                        <Flex
                          className="single-details-item d-flex flex-wrap"
                          align="center"
                        >
                          <div className="details-title">
                            <Heading as="h6" size="xs" className="title">
                              Order ID:
                            </Heading>
                          </div>
                          <div className="details-content">
                            <Text fontSize="md">2352962A</Text>
                          </div>
                        </Flex>
                        <Flex
                          className="single-details-item flex-wrap"
                          align="center"
                        >
                          <div className="details-title">
                            <Heading as="h6" size="xs" className="title">
                              Date &amp; Time:
                            </Heading>
                          </div>
                          <div className="details-content">
                            <Text fontSize="md">
                              {moment(cart.createdAt).format("LLL")}
                            </Text>
                          </div>
                        </Flex>
                      </Stack>
                    </div> */}
                    <Stack className="single-order-details mt-2">
                      <div className="order-title mt-4">
                        <Heading as="h5" size="md" className="title">
                          Personal Information
                        </Heading>
                      </div>
                      <Stack className="order-details-content">
                        <Flex
                          className="single-details-item flex-wrap"
                          align="center"
                        >
                          <div className="details-title">
                            <Heading as="h6" size="xs">
                              Name:
                            </Heading>
                          </div>
                          <div className="details-content">
                            <Text fontSize="md">{userInfo.name}</Text>
                          </div>
                        </Flex>
                        <Flex
                          className="single-details-item flex-wrap"
                          align="center"
                        >
                          <div className="details-title">
                            <Heading as="h6" size="xs">
                              Email:
                            </Heading>
                          </div>
                          <div className="details-content">
                            <Text fontSize="md">{userInfo.email}</Text>
                          </div>
                        </Flex>
                        {/* <Flex
                      className="single-details-item flex-wrap"
                      align="center"
                    >
                      <div className="details-title">
                        <Heading as="h6" size="xs">
                          Điện thoại:
                        </Heading>
                      </div>
                      <div className="details-content">
                        <Text fontSize="md">+123 456 789 0234</Text>
                      </div>
                    </Flex> */}
                        <Flex
                          className="single-details-item flex-wrap"
                          align="center"
                        >
                          <div className="details-title">
                            <Heading as="h6" size="xs">
                              Address:
                            </Heading>
                          </div>
                          <div className="details-content">
                            <Text fontSize="md">
                              {cart.shippingAddress.address} st,{" "}
                              {cart.shippingAddress.city}, POX:{" "}
                              {cart.shippingAddress.postalCode}
                            </Text>
                          </div>
                        </Flex>
                      </Stack>
                    </Stack>
                    <Stack className="single-order-details mt-4">
                      <Box className="order-title">
                        <Heading as="h5" size="md" className="title">
                          Recipient Address
                        </Heading>
                      </Box>
                      <Stack className="order-details-content">
                        <Flex
                          className="single-details-item flex-wrap"
                          align="center"
                        >
                          <Box className="details-title">
                            <Heading as="h6" size="xs" className="title">
                              Recipient name:
                            </Heading>
                          </Box>
                          <Box className="details-content">
                            <Text fontSize="md">{userInfo.name}</Text>
                          </Box>
                        </Flex>
                        <Flex
                          className="single-details-item flex-wrap"
                          align="center"
                        >
                          <Box className="details-title">
                            <Heading as="h5" size="xs" className="title">
                              Email:
                            </Heading>
                          </Box>
                          <Box className="details-content">
                            <Text fontSize="md">{userInfo.email}</Text>
                          </Box>
                        </Flex>
                        {/* <Flex
                      className="single-details-item flex-wrap"
                      align="center"
                    >
                      <div className="details-title">
                        <Heading as="h6" size="xs" className="title">
                          Điện thoại:
                        </Heading>
                      </div>
                      <div className="details-content">
                        <Text fontSize="md">+123 456 789 0234</Text>
                      </div>
                    </Flex> */}
                        <Flex
                          className="single-details-item flex-wrap"
                          align="center"
                        >
                          <div className="details-title">
                            <Heading as="h6" size="xs" className="title">
                              Address:
                            </Heading>
                          </div>
                          <div className="details-content">
                            <Text fontSize="md">
                              {cart.shippingAddress.address} st,{" "}
                              {cart.shippingAddress.city}, POX:{" "}
                              {cart.shippingAddress.postalCode}
                            </Text>
                          </div>
                        </Flex>
                      </Stack>
                    </Stack>
                  </div>
                </>
              )}
            </div>
          </div>
        </Box>
      </Container>
    </section>
  );
};

export default PlaceOrder;
