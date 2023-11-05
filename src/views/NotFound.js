import { Container, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <React.Fragment>
      <Stack className="page_404">
        <Container maxW="container.xxl">
          <div className="row">
            <div className="col-md-12 ">
              <div className="col-md-12 text-center">
                <div className="four_zero_four_bg">
                  <Heading as="h2" fontSize="80px" className="text-center ">
                    404
                  </Heading>
                </div>
                <div className="contant_box_404">
                  <Heading as="h2" fontSize="30px">
                    Are you astray
                  </Heading>
                  <Text>
                    Looks like the page you're looking for doesn't exist!
                  </Text>
                  <Link to="/" className="link_404">
                    Comeback
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Stack>
    </React.Fragment>
  );
};

export default NotFound;
