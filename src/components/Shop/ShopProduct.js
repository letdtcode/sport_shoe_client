import { Badge, Flex, Image, Select, Text, useToast } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Rating from "../homeComponents/Rating";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/CartAction";
import { BsCartPlus } from "react-icons/bs";
const CartButton = styled.button`
  padding: 10px;
  background-color: #333;
  border-radius: 5px;
  font-size: 14px;
  text-transform: uppercase;
  color: white;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: white;
    border: 1px solid #333;
    color: black;
  }
`;
const ShopProduct = (props) => {
  const { loading, error, activeProducts } = props;
  const toast = useToast();
  const dispatch = useDispatch();
  return (
    <main className="col-md-9">
      <header className="border-bottom mb-4 pb-3 mt-4">
        <Flex align="center" textAlign="center" justify="end" gap={5}>
          <Text className="mr-md-auto ">
            {activeProducts.length} Items found
          </Text>
          <Select size="md" maxW={{ base: "sm", md: "md", lg: "3xs" }}>
            <option>Latest items</option>
            <option>Trending</option>
            <option>Most Popular</option>
            <option>Cheapest</option>
          </Select>
          <div className="btn-group">
            <a
              href="#1"
              className="btn btn-outline-secondary"
              data-toggle="tooltip"
              title="List view"
            >
              <i className="fa fa-bars" />
            </a>
            <a
              href="#1"
              className="btn  btn-outline-secondary active"
              data-toggle="tooltip"
              title="Grid view"
            >
              <i className="fa fa-th" />
            </a>
          </div>
        </Flex>
      </header>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          <div className="row">
            {activeProducts.map((item) => (
              <div className="col-sm-6 col-md-6 col-lg-4" key={item._id}>
                <figure className="card card-product-grid">
                  <Badge backgroundColor="red" color="white" className="badge">
                    NEW
                  </Badge>
                  <Link to={`/products/${item._id}`} className="img-wrap">
                    <Image src={item.image} objectFit="cover" alt={item.name} />
                  </Link>
                  <figcaption className="info-wrap">
                    <div className="fix-height">
                      <Link to={`/products/${item._id}`} className="title">
                        {item.name}
                      </Link>
                      <Text className="price">${item.price}</Text>
                      {/* <del className="price-old">$1980</del> */}
                      <Rating
                        value={item.rating}
                        text={`${item.numReviews} reviews`}
                      />
                    </div>
                    <CartButton
                      className="my-2"
                      onClick={() => {
                        dispatch(addToCart(item._id, 1)) &&
                          toast({
                            title: `You've added ${1} product successfully.`,
                            description: `You've added ${item.name} into cart`,
                            status: "success",
                            duration: 3000,
                            isClosable: true,
                          });
                      }}
                    >
                      <Flex align="center">
                        <BsCartPlus size="20px" className="mx-1" />
                        Add to cart
                      </Flex>
                    </CartButton>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default ShopProduct;
