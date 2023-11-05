import {
  Badge,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const Orders = (props) => {
  const { orders, loading, error } = props;
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
                className="btn btn-success mx-2 px-3 py-2"
                to="/"
                style={{ fontSize: "12px" }}
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <TableContainer className="table-responsive">
              <Table className="table" overflowX="auto">
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
                    <Tr key={order._id}>
                      <Td>
                        <a href={`/order/${order._id}`} className="link">
                          {order._id}
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
                    </Tr>
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
