import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/CartAction";
import CartItem from "../components/Cart/CartItem";
import { Container, Flex, Image, Link, Stack } from "@chakra-ui/react";
import { IoReturnDownBackOutline } from "react-icons/io5";

const CartScreen = ({ match, location, history }) => {
  // keep window screen always top
  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = location.qty;
  // Update Cart
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Calculate total product prices
  const total = cartItems
    .reduce((a, b) => a + b.qty * b.product.price, 0)
    .toFixed(2);

  // address side-effect when cart added
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <>
      {/* Cart */}
      <div className="container-fluid">
        {cartItems.length === 0 ? (
          <Stack className="py-lg-12" h={500}>
            <Container align="center" maxW="container.xxl">
              <div align="center">
                <div>
                  <Image
                    src="./images/empty-cart-yellow.png"
                    alt="not-found"
                    className="my-5"
                  />

                  <Link href="/shop" color="black">
                    <Flex align="center" gap={2} justify="center">
                      <IoReturnDownBackOutline size={20} />
                      Come back to shop
                    </Flex>
                  </Link>
                </div>
              </div>
            </Container>
          </Stack>
        ) : (
          <CartItem
            cartItems={cartItems}
            total={total}
            dispatch={dispatch}
            history={history}
          />
        )}
      </div>
    </>
  );
};

export default CartScreen;
