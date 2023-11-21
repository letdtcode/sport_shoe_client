import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/actions/CartAction";

const CartItem = ({ cartItems, total, dispatch, history }) => {
  // Checkout handler
  const checkOutHandler = (e) => {
    e.preventDefault();
    history.push(`/login?redirect=shipping`);
  };

  // Remove product Handler
  const removeCartHandler = (id, typeSelect) => {
    // TODO
    dispatch(removeFromCart(id, typeSelect));
  };
  return (
    <>
      <section className="section-pagetop bg my-4 p-5">
        <div className="container">
          <Heading as="h2" size="lg" className="title-page">
            Shopping cart
          </Heading>
        </div>
      </section>
      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <main className="col-md-9">
              <Stack className="card">
                <Table
                  className="table table-borderless table-shopping-cart"
                  size="lg"
                  marginTop="15px"
                >
                  <Thead className="text-muted">
                    <Tr className="small text-uppercase">
                      <Th scope="col">Product</Th>
                      <Th scope="col" width={140}>
                        Type
                      </Th>
                      <Th scope="col" width={140}>
                        Quantity
                      </Th>
                      <Th scope="col" width={100} textAlign="center">
                        Price
                      </Th>
                      <Th scope="col" width={120} textAlign="center">
                        Action
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {cartItems.map((item, index) => (
                      <Tr key={index}>
                        <Td>
                          <Flex className="itemside">
                            <Link
                              className="aside mx-3"
                              to={`/products/${item.product.id}`}
                            >
                              <img
                                src={item.product.image}
                                alt={item.product.productName}
                                className="img-sm"
                              />
                            </Link>
                            <Box className="info">
                              <Link to={`/products/${item.product.product}`}>
                                <Text size="lg" className="title text-dark">
                                  {item.product.productName}
                                </Text>
                              </Link>
                              <Text size="sm" className="text-muted small">
                                Brand: {item.product.categoryName}
                              </Text>
                            </Box>
                          </Flex>
                        </Td>

                        <Td className="center">
                          <div className="type-control">
                            {item.typeSelect.color} - {item.typeSelect.size}
                          </div>
                        </Td>
                        <Td className="center">
                          <div className="quantity-control">
                            <Button
                              onClick={() => {
                                if (item.qty > 1) {
                                  dispatch(
                                    addToCart(
                                      item.product.id,
                                      item.qty - 1,
                                      item.typeSelect
                                    )
                                  );
                                }
                              }}
                            >
                              -
                            </Button>
                            <Input
                              width={50}
                              type="number"
                              value={item.qty}
                              min={0}
                              max={item.countInStock}
                              onChange={(e) => {
                                const newValue = Math.min(
                                  Math.max(0, e.target.value),
                                  item.typeSelect.countInStock
                                );
                                dispatch(
                                  addToCart(
                                    item.product.id,
                                    newValue,
                                    item.typeSelect
                                  )
                                );
                              }}
                            />
                            <Button
                              onClick={() => {
                                if (item.qty < item.typeSelect.countInStock) {
                                  dispatch(
                                    addToCart(
                                      item.product.id,
                                      item.qty + 1,
                                      item.typeSelect
                                    )
                                  );
                                }
                              }}
                            >
                              +
                            </Button>
                          </div>
                        </Td>
                        <Td textAlign="center">
                          <Box className="price-wrap">
                            <Text size="lg" className="price">
                              $ {item.product.price}
                            </Text>
                            {/* <small className="text-muted"> $315 each </small> */}
                          </Box>
                        </Td>
                        <Td textAlign="center">
                          <Button
                            colorScheme="red"
                            onClick={() =>
                              removeCartHandler(
                                item.product.id,
                                item.typeSelect
                              )
                            }
                          >
                            Remove
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
                <Flex className="card-body border-top">
                  <Link className="ml-2 btn btn-light" to="/shop">
                    <i className="fa fa-chevron-left p-2" />
                    Come back to shop
                  </Link>
                </Flex>
              </Stack>{" "}
              {/* card.// */}
              <div className="alert alert-success mt-3">
                <p className="icontext">
                  <i className="icon text-success fa fa-truck" /> Free shipping
                  from 1 - 3 days
                </p>
              </div>
            </main>
            <aside className="col-md-3">
              <Stack className="card">
                <VStack className="card-body" align="stretch" spacing={4}>
                  {/* <Flex className="dlist-align" justify="space-between">
                    <dt>Tiền hàng:</dt>
                    <dd className="text-right"></dd>
                  </Flex>
                   */}
                  <Flex className="dlist-align" justify="space-between">
                    <dt>Discount:</dt>
                    <dd className="text-right">$0</dd>
                  </Flex>
                  <Flex className="dlist-align" justify="space-between">
                    <dt>Total:</dt>
                    <dd className="text-right  h5">
                      <strong>${total}</strong>
                    </dd>
                  </Flex>
                  <hr />
                  <Flex align="center" justify="center" className="mb-3">
                    <Image
                      src="/images/misc/payment-paypal.png"
                      h={10}
                      className="my-2"
                    />
                  </Flex>
                  {total > 0 && (
                    <Link
                      to="#"
                      className="btn-checkout"
                      onClick={checkOutHandler}
                    >
                      Checkout now <i className="fa fa-chevron-right" />
                    </Link>
                  )}
                </VStack>
              </Stack>
            </aside>
          </div>
        </div>
      </section>
      <section className="section-name bg padding-y">
        <div className="container">
          <h6>Payment and refund policy</h6>
        </div>
      </section>
    </>
  );
};

export default CartItem;
