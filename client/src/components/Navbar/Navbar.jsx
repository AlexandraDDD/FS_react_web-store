import React, { useContext, useEffect, useState, } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Context } from "../..";
import styles from "./Navbar.module.css";
import { FaShoppingCart } from "react-icons/fa";

const NavBar = observer(() => {
  const { user, basket } = useContext(Context);
  const [Basketcount, setBasketCount] = useState(0)

  const navigate = useNavigate();


  useEffect(() => {
    if (basket.devices.length === 0)
      basket.fetchBasket();
  }, []);

  useEffect(() => {
    setBasketCount(basket.BScount)
    // Обновляем значок количества товаров в корзине при изменении basket.BScount
  }, [basket.BScount]);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    navigate(LOGIN_ROUTE);
  };


  return (
    <Navbar bg="dark" fixed="top" variant="dark" style={{ height: "8vh" }}>
      <Container>
        <NavLink className="fs-3" style={{ color: "white" }} to={SHOP_ROUTE}>
          ELstore
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <p className="text-center">{user.user.email} </p>
            
            {user.user.role == 'ADMIN' &&
              <Button
                className={styles.btn}
                onClick={() => navigate(ADMIN_ROUTE)}
              >
                Админ панель
              </Button>
            }
            <Button
              variant={"outline-light"}
              onClick={() => navigate(BASKET_ROUTE)}
              className={styles.btn}
            >
              корзина    <FaShoppingCart />
              {Basketcount > 0 && (
                <span
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "0 5px",
                    marginLeft: "5px",
                    fontSize: "12px",
                    position: "relative",
                    top: "-5px",
                  }}
                >
                  {Basketcount}
                </span>
              )}
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => logOut()}
              className={styles.btn}
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
