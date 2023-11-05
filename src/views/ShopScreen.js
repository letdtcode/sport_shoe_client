import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoryListAllAction } from "../redux/actions/CategoryAction";
import ShopProduct from "../components/Shop/ShopProduct";
import Pagination from "react-js-pagination";
import { getFilteredProducts } from ".././redux/actions/ProductAction";
import CheckboxCategoryFilter from "../components/Shop/Checkbox";
import { prices } from "../components/Shop/PriceChart";
import { Box, Heading, Select, Stack } from "@chakra-ui/react";
import RadioBox from "../components/Shop/RadioBox";

const ShopScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productFilter);
  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const { loading, error, products } = productList;
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  // eslint-disable-next-line
  const [limit, setLimit] = useState(100);
  // eslint-disable-next-line
  const [skip, setSkip] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [activePage, setActivePage] = useState(1);
  // eslint-disable-next-line
  const init = () => {
    dispatch(categoryListAllAction());
  };

  const loadFilteredResults = (newFilters) => {
    dispatch(getFilteredProducts(skip, limit, newFilters));
    setActivePage(1);
  };

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  const totalItems = products.length;
  const activeProducts = products.slice(
    itemsPerPage * activePage - itemsPerPage,
    itemsPerPage * activePage
  );

  const onChange = (e) => {
    setItemsPerPage(e.target.value);
  };
  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <section className="section-pagetop bg mt-5 container-fluid">
        <div className="container">
          <Heading as="h2" size="lg" className="title-page">
            Category products
          </Heading>
          <Stack>
            <ol className="breadcrumb text-dark mt-3">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link to="/shop">Shopping</Link>
              </li>
            </ol>
          </Stack>
        </div>
      </section>
      <section
        className="section-content padding-y accordion"
        id="accordionExample"
      >
        <div className="container">
          <div className="row">
            {/* Filter */}
            <aside className="col-md-3">
              <Box className="card border-0">
                <article className="filter-group accordion-item">
                  <header className="accordion-header" id="headingFour">
                    <Heading
                      as="h5"
                      size="sm"
                      className="accordion-button title"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="true"
                      aria-controls="collapseFour"
                    >
                      Product per page
                    </Heading>
                  </header>
                  <div
                    className="filter-content collapse show"
                    id="collapseFour"
                  >
                    <div className="card-body">
                      <Select onChange={onChange}>
                        <option value={6}>6</option>
                        <option value={9}>9</option>
                        <option value={12}>12</option>
                      </Select>
                    </div>
                  </div>
                </article>

                <article className="filter-group accordion-item">
                  <header className=" accordion-header" id="headingOne">
                    <Heading
                      as="h5"
                      size="sm"
                      className="accordion-button title"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Kind of product
                    </Heading>
                  </header>
                  <div
                    className="filter-content collapse show"
                    id="collapseOne"
                  >
                    <div className="card-body">
                      <form className="pb-3">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                          />
                          <div className="input-group-append">
                            <button className="btn btn-light" type="button">
                              <i className="fa fa-search" />
                            </button>
                          </div>
                        </div>
                      </form>
                      <ul className="list-menu">
                        {products.slice(0, 6).map((product) => (
                          <li key={product._id}>
                            <Link to={`/products/${product._id}`}>
                              {product.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
                <article className="filter-group accordion-item">
                  <header className=" accordion-header" id="headingTwo">
                    <Heading
                      as="h5"
                      size="sm"
                      className="accordion-button title"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      Brands
                    </Heading>
                  </header>
                  <div
                    className="filter-content collapse show"
                    id="collapseTwo"
                  >
                    <ul className="list-group p-1">
                      <CheckboxCategoryFilter
                        categories={categories}
                        handleFilters={(filters) =>
                          handleFilters(filters, "category")
                        }
                      />
                    </ul>
                  </div>
                </article>
                <article className="filter-group accordion-item">
                  <header className="accordion-header" id="headingThree">
                    <Heading
                      as="h5"
                      size="sm"
                      className="accordion-button title"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="true"
                      aria-controls="collapseThree"
                    >
                      Range of price
                    </Heading>
                  </header>
                  <div
                    className="filter-content collapse show"
                    id="collapseThree"
                  >
                    <div className="card-body">
                      <RadioBox
                        prices={prices}
                        handleFilters={(filters) =>
                          handleFilters(filters, "price")
                        }
                      />
                    </div>
                  </div>
                </article>
              </Box>
            </aside>
            {/* Product */}
            <ShopProduct
              loading={loading}
              activeProducts={activeProducts}
              error={error}
            />
            <Pagination
              activePage={activePage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={totalItems}
              pageRangeDisplayed={5}
              innerClass="pagination justify-content-center"
              itemClass="page-item"
              linkClass="page-link"
              onChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopScreen;
