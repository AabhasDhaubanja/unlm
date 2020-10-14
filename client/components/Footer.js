import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";

import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { GrInstagram } from "react-icons/gr";
import { AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  const router = useRouter();

  return (
    <React.Fragment>
      <footer className="pt-md-5 pt-3">
        <div className="bg-light py-md-4 py-3">
          <Container>
            <Row>
              <Col xs={5}>
                <h3>
                  BECOME A<b> UNLM.</b>
                </h3>
                Subscribe for exclusive updates.
              </Col>
              <Col
                xs={7}
                className="d-flex justify-content-center align-items-center"
              >
                <div className="form-group d-inline-flex">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                  />
                  <button className="btn btn-dark">Subscribe</button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="bg-dark py-5">
          <Container className="text-white">
            <Row>
              <Col xs={9}>
                <Row>
                  <Col xs={4} className="d-flex justify-content-center">
                    <h3>
                      <b>UNLM.</b>
                    </h3>
                  </Col>
                  <Col xs={4}>
                    <ul>
                      <li>
                        <h5>
                          <b>UNLM.</b>
                        </h5>
                      </li>
                      <li>About</li>
                      <li>Careers</li>
                      <li>Privacy</li>
                      <li>Cookies</li>
                    </ul>
                  </Col>
                  <Col xs={4}>
                    <ul>
                      <li>
                        <h5>
                          <b>NEED HELP?</b>
                        </h5>
                      </li>
                      <li>Orders & Delivery</li>
                      <li>Returns</li>
                      <li>FAQ</li>
                      <li>Terms & Conditions</li>
                    </ul>
                  </Col>

                  <Col
                    xs={6}
                    className="pt-5 d-flex justify-content-center align-items-center"
                  >
                    ©UNLM. All rights reserved
                  </Col>
                  <Col xs={6} className="pt-5">
                    <div className="px-md-5 mx-5 px-2 d-flex justify-content-between">
                      <AiFillFacebook />
                      <AiOutlineTwitter />
                      <GrInstagram />
                      <AiFillYoutube />
                    </div>
                  </Col>
                </Row>
              </Col>

              <div className="bottomRightButton col-3">
                <Row>
                  <Col xs={12} className="d-flex justify-content-center">
                    <div className="pb-4">
                      <button className="btn text-white">CONTACT</button>
                    </div>
                  </Col>
                  <Col xs={12} className="d-flex justify-content-center">
                    <div>
                      <button className="btn text-white">STORE</button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Row>
          </Container>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
