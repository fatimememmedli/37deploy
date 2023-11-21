import React from "react";
import style from "../../src/Wishlist.module.css";
import { StarIcon } from "@chakra-ui/icons";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Image,
  Heading,
  Text,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import ExitButton from "./ExitButton";
function Wishlist({ fav, setFav }) {
  let isLogin = localStorage.getItem("isLogin");

  return (
    <>
      <div className={style.containerBtn}>
        <ExitButton />
      </div>
      <div className={style.container}>
        {fav.map((elem, i) => {
          if (isLogin) {
            return (
              <Card
                key={i}
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src="https://cloudfront.slrlounge.com/wp-content/uploads/2016/04/SOOC-1.jpg?x15270"
                  alt="Caffe Latte"
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">{elem.name}</Heading>

                    <Text py="2">{elem.price}$</Text>
                  </CardBody>

                  <CardFooter>
                    <Button variant="solid" colorScheme="blue">
                      Buy Latte
                    </Button>
                    <StarIcon
                      className={style.icon}
                      name={elem.id}
                      onClick={(e) => {
                        let arr = [...fav];
                        arr = fav.filter(
                          (elem) =>
                            elem.id != e.currentTarget.getAttribute("name")
                        );
                        setFav(arr);
                        localStorage.setItem("fav", JSON.stringify(fav));
                      }}
                      color="yellow.500"
                      w={6}
                      h={6}
                    />
                  </CardFooter>
                </Stack>
              </Card>
            );
          }
        })}
      </div>
    </>
  );
}

export default Wishlist;
