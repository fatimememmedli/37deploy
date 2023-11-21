import React, { Profiler } from "react";
import Header from "./Header";
import axios from "axios";
import { useState, useEffect } from "react";
import style from "../../src/Products.module.css";
import { StarIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";
import { getUser, putUser } from "../middleware/api/users";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import ExitButton from "./ExitButton";
function Products({ basket, setBasket, fav, setFav, basketFav, setBasketFav }) {
  const [products, setProducts] = useState([]);
  const [fakeProducts, setfakeProducts] = useState([]);
  const [check, setCheck] = useState(false);
  const [sort, setSort] = useState(false);
  const [exit, setExit] = useState(false);
  let isLogin = JSON.parse(localStorage.getItem("isLogin"));
  console.log(basketFav);
  let loginInfo = JSON.parse(localStorage.getItem("login"));
  useEffect(() => {
    axios(
      "https://6556137684b36e3a431ef611.mockapi.io/usernameProducts/products"
    ).then((res) => {
      setProducts(res.data);
      setfakeProducts(res.data);
    });
  }, [sort]);
  let arrProduct = products;

  let BasketArr = [];

  let localBasket = JSON.parse(localStorage.getItem("basket")) || [];
  if (localBasket) {
    BasketArr = localBasket;
  }

  return (
    <>
      <div className={style.containerBtn}>
        <ExitButton exit={exit} setExit={setExit} />
      </div>
      <div className={style.containerInputSort}>
        <Input
          onChange={(e) => {
            let arr = products;

            arr = fakeProducts.filter((elem) =>
              elem.name.toUpperCase().includes(e.target.value.toUpperCase())
            );
            setProducts(arr);
          }}
          placeholder="search product"
          size="md"
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            setSort((sort) => !sort);
            arrProduct.sort((a, b) => a.price - b.price);
            setProducts(arrProduct);
          }}
          colorScheme="yellow"
        >
          Sort(Price)
        </Button>
      </div>
      <div className={style.container}>
        {products.map((elem, i) => {
          if (isLogin == true) {
            return (
              <Card className={style.card} key={i} maxW="sm">
                <CardBody>
                  <Image
                    src="https://cloudfront.slrlounge.com/wp-content/uploads/2016/04/SOOC-1.jpg?x15270"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{elem.name}</Heading>
                    <Text>
                      This sofa is perfect for modern tropical spaces, baroque
                      inspired spaces, earthy toned spaces and for people who
                      love a chic design with a sprinkle of vintage design.
                    </Text>
                    <Text color="blue.600" fontSize="2xl">
                      {elem.price}$
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button
                      data-id={elem.id}
                      variant="solid"
                      colorScheme="blue"
                      onClick={(e) => {
                        e.preventDefault();

                        let result = products.find(
                          (elem) => elem.id == e.target.getAttribute("data-id")
                        );

                        BasketArr.push(result);
                        localStorage.setItem(
                          "basket",
                          JSON.stringify(BasketArr)
                        );

                        {
                          getUser(loginInfo.id).then((res) => {
                            // console.log(res);
                            let obj = res;
                            obj.basket = BasketArr;
                            console.log(obj);
                            putUser(loginInfo.id, obj);
                          });
                        }
                      }}
                    >
                      Add to cart
                    </Button>

                    <>
                      {fav && fav.find((product) => product.id == elem.id) ? (
                        <StarIcon
                          className={style.iconss}
                          color="yellow.500"
                          name={elem.id}
                          w={6}
                          h={6}
                          onClick={(e) => {
                            if (
                              fav.find(
                                (elem) =>
                                  elem.id ==
                                  e.currentTarget.getAttribute("name")
                              )
                            ) {
                              let arr = [...fav];
                              arr = fav.filter(
                                (elem) =>
                                  elem.id !=
                                  e.currentTarget.getAttribute("name")
                              );
                              setFav(arr);
                              localStorage.setItem("fav", JSON.stringify(fav));
                            } else {
                              let findFav = products.find(
                                (elem) =>
                                  elem.id ==
                                  e.currentTarget.getAttribute("name")
                              );
                              setFav([...fav, findFav]);
                              localStorage.setItem("fav", JSON.stringify(fav));
                            }

                            getUser(loginInfo.id).then((res) => {
                              // console.log(res);
                              let obj = res;
                              obj.favourite = [...fav];
                              console.log(obj);
                              putUser(loginInfo.id, obj);
                            });
                          }}
                        />
                      ) : (
                        <StarIcon
                          className={style.iconss}
                          name={elem.id}
                          w={6}
                          h={6}
                          onClick={(e) => {
                            if (
                              fav.find(
                                (elem) =>
                                  elem.id ==
                                  e.currentTarget.getAttribute("name")
                              )
                            ) {
                              let arr = [...fav];
                              arr = fav.filter(
                                (elem) =>
                                  elem.id !=
                                  e.currentTarget.getAttribute("name")
                              );
                              setFav(arr);
                              localStorage.setItem("fav", JSON.stringify(fav));
                            } else {
                              let findFav = products.find(
                                (elem) =>
                                  elem.id ==
                                  e.currentTarget.getAttribute("name")
                              );
                              setFav([...fav, findFav]);
                              localStorage.setItem("fav", JSON.stringify(fav));
                            }
                            getUser(loginInfo.id).then((res) => {
                              // console.log(res);
                              let obj = res;
                              console.log(obj);
                              obj.favourite = [...fav];
                              console.log(obj);
                              putUser(loginInfo.id, obj);
                            });
                          }}
                        />
                      )}
                    </>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            );
          }
        })}
      </div>
    </>
  );
}

export default Products;
