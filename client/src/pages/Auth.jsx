import React, { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row, Toast, ToastContainer } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../API/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { FaArrowRight } from "react-icons/fa";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");


  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
        setToastMessage("Вы успешно авторизовались");
      } else {
        data = await registration(email, password);
        setToastMessage("Вы успешно зарегистрировались");
      }
      user.setUser(data);
      user.setIsAuth(true);
      setShowToast(true);
      /* setTimeout(() => {
        navigate(SHOP_ROUTE);
      }, 800); */
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide style={{ backgroundColor: ' #90c581' }}>
          <Toast.Header>
            <strong className="me-auto">Успешно</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Card style={{ width: 700, height: 500 }} className="p-5  text-center">
        {user.isAuth ? (
          <Col className="d-flex flex-column align-items-center justify-content-center">
            <h2 className="pb-3">Успешно!</h2>
            <Button
              className="p-2"
              variant="outline-success"
              style={{ width: "50%" }}
              onClick={() => navigate(SHOP_ROUTE)}
            >
              За покупками <FaArrowRight className="ml-2" />
            </Button>

          </Col>
        ) :
          (
            <>
              <h2>{isLogin ? "Авторизация" : "Регистрация"}</h2>
              <Form className="d-flex flex-column">
                <Form.Control
                  className="mt-2"
                  placeholder="Введите email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control
                  className="mt-2"
                  placeholder="Введите пароль..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Row className="pl-3 pr-3 mt-4 d-flex align-items-center  justify-content-between flex-wrap ">
                  {isLogin ? (
                    <div
                      className="  pl-3 text-start"
                      variant="outline-success"
                      style={{ width: "60%" }}
                    >
                      нет аккаунта?{" "}
                      <NavLink className="text-success" to={REGISTRATION_ROUTE}>
                        зарегистрируйтесь
                      </NavLink>
                    </div>
                  ) : (
                    <div
                      className="  pl-3 text-start"
                      variant="outline-success"
                      style={{ width: "60%" }}
                    >
                      {" "}
                      Уже есть аккаунт?{" "}
                      <NavLink className="text-success" to={LOGIN_ROUTE}>
                        Войти
                      </NavLink>
                    </div>
                  )}
                  <div className=" aling-self-end pr-3 " style={{ width: 150 }}>
                    <Button
                      className="  pr-3 "
                      variant="outline-success"
                      style={{ width: "100%" }}
                      onClick={() => click()}
                    >
                      {isLogin ? "войти" : "регистрация"}
                    </Button>
                  </div>
                </Row>
              </Form>
            </>
          )
        }

      </Card>
    </Container>
  );
});

export default Auth;
