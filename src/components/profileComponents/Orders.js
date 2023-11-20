/* eslint-disable jsx-a11y/alt-text */
import {
  Badge,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  IconButton
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { FaChevronDown, FaChevronUp, FaPhoneAlt, FaAmazonPay } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
const Orders = (props) => {
  const { orders, loading, error } = props;
  const [openOrder, setOpenOrder] = React.useState(null);


  const toggleOrderDetails = (order) => {
    if (openOrder === order) {
      setOpenOrder(null);
    } else {
      setOpenOrder(order);
    }
  };
  return (
    <div className="d-flex justify-content-center align-item-center flex-column">
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {orders.length === 0 ? (
            <div className="col-12 alert alert-info text-center mt-3">
              No Orders
              <Link
                className="btn-success"
                to="/"
                style={{ fontSize: "12px" }}
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <TableContainer className="table-responsive">
              <Table className="table" overflowX="auto" >
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>STATUS</Th>
                    <Th>DATE</Th>
                    <Th>TOTAL</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orders.map((order) => (
                    <>
                      <Tr key={order._id}>
                        <Td>
                          <a href={`/order/${order._id}`} className="button-orderid">
                            Order detail
                          </a>
                        </Td>
                        <Td>
                          {order.isPaid ? (
                            <Badge variant="solid" colorScheme="green">
                              Paid
                            </Badge>
                          ) : (
                            <Badge variant="solid" colorScheme="red">
                              Not Paid
                            </Badge>
                          )}
                        </Td>
                        <Td>
                          {order.isPaid
                            ? moment(order.paidAt).calendar()
                            : moment(order.createdAt).calendar()}
                        </Td>
                        <Td>${order.totalPrice}</Td>
                        <Td>
                          <IconButton
                            onClick={() => toggleOrderDetails(order)} background={'none'}
                            icon={openOrder && openOrder._id === order._id ? <FaChevronUp /> : <FaChevronDown />}
                          />
                        </Td>

                      </Tr>

                      <Td colSpan="5">
                        {openOrder && openOrder._id === order._id && (
                          <><div className="openOrder">
                            <Td className="element-order">
                              <FaLocationDot />  {openOrder.shippingAddress.address}, {openOrder.shippingAddress.country}
                            </Td>
                            <Td className="element-order">
                              <FaPhoneAlt /> +84{openOrder.shippingAddress.phoneNumber}
                            </Td>
                            <Td className="element-order">
                              <FaAmazonPay /> {openOrder.paymentMethod}
                            </Td>
                            <Td>
                              Quantity: {openOrder.orderItems.length}
                            </Td>
                          </div>
                            {
                              openOrder.orderItems.map((orderItem) => (
                                <div className="openOrder">
                                  <img className="item-order-img" src={orderItem.image} />
                                  <Td className="openOrder-element" style={{ width: "300px", textWrap: "wrap" }}>
                                    {orderItem.name}

                                  </Td>
                                  <Td className="openOrder-element" style={{ width: "200px" }}>
                                    <div style={{ whiteSpace: "pre-wrap" }}>
                                      {"Color: "}{orderItem.typeProduct.color} {"\nSize: "}{orderItem.typeProduct.size}
                                    </div>
                                  </Td>
                                  <Td className="openOrder-element" >
                                    Quantity: {orderItem.typeProduct.quantity}
                                  </Td>
                                  <Td className="openOrder-element" >
                                    price: ${orderItem.price}
                                  </Td>
                                  <Link className='item-order-button' to={`/products/${orderItem.product}`}>
                                    View Product
                                  </Link>
                                </div>
                              ))
                            }
                          </>
                        )}
                      </Td>
                    </>

                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
