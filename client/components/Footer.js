import { useRouter } from "next/router";

import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { GrInstagram } from "react-icons/gr";
import { AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  const router = useRouter();

  return (
    <>
      <footer className="pt-md-5 pt-3">
        <div className="bg-light py-md-4 py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-12" md={5} xs={12}>
                <div className="row">
                  <div className="col-12 d-flex justify-content-center">
                    <h3>
                      BECOME A<b> UNLM.</b>
                    </h3>
                  </div>
                  <div className="col-12 d-flex justify-content-center">
                    Subscribe for exclusive updates.
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-12 d-flex justify-content-center align-items-center">
                <div className="form-group d-inline-flex">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                  />
                  <button className="btn btn-dark">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-dark py-5">
          <div className="container text-white">
            <div className="row">
              <div className="col-md-9 col-12">
                <div className="row">
                  <div className="col-md-4 col-12 d-md-flex d-none justify-content-center">
                    <h3>
                      <b>UNLM.</b>
                    </h3>
                  </div>
                  <div className="col-md-4 col-12">
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
                  </div>
                  <div className="col-md-4 col-12">
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
                  </div>

                  <div className="col-md-6 col-12 py-5 d-flex justify-content-center">
                    ©UNLM. All rights reserved
                  </div>
                  <div className="col-md-6 col-12 py-5">
                    <div className="d-flex justify-content-around">
                      <AiFillFacebook />
                      <AiOutlineTwitter />
                      <GrInstagram />
                      <AiFillYoutube />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bottomRightButton col-md-3 col-12">
                <div>
                  <div className="col-12 d-flex justify-content-center">
                    <div className="pb-4">
                      <button className="btn text-white">CONTACT</button>
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-center">
                    <div>
                      <button className="btn text-white">STORE</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
