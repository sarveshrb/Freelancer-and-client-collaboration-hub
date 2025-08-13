import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div class="container my-5">
        <footer class="text-center text-lg-start text-color">
          <div class="container-fluid p-4 pb-0">
            <section class="">
              <div class="row d-flex justify-content-center">
                <div class="col-lg-6 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase custom-bg-text">
                    Freelancer's Hub
                  </h5>

                  <p>
                    Welcome to Your Freelance Hub, where top talent meets
                    unparalleled opportunities. Whether you're seeking expert
                    services or offering your unique skills, our platform is
                    designed to connect you with the best matches. Join us to
                    experience seamless collaboration and unlock your full
                    potential.
                  </p>
                </div>

                <div class="col-lg-3 col-md-6 mb-4 mb-md-0 ">
                  <h5 class="text-uppercase text-black">About us</h5>

                  <ul class="list-unstyled mb-0">
                    <li>Sarvesh Barapatre</li>
                    <li>Aditya Sunil Wandhekar</li>
                    <li>Venugopal Reddy</li>
                    <li>LokeshKumar sao</li>
                    <li>Durga Prasad</li>
                  </ul>
                </div>

                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase text-black">Contact us</h5>

                  <ul class="list-unstyled mb-0">
                    <li>
                      <a
                        href="https://www.linkedin.com/in/sarvesh-barapatre-510820214"
                        target="_blank"
                        class="text-color"
                      >
                        <i class="fab fa-linkedin">Sarvesh-barapatre</i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/in/aditya-wandhekar-7b7a78213/"
                        target="_blank"
                        class="text-color"
                      >
                        <i class="fab fa-linkedin">Aditya-wandhekar</i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/in/venugopal18"
                        target="_blank"
                        class="text-color"
                      >
                        <i class="fab fa-linkedin">Venugopal18</i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.linkedin.com/in/lokeshkumar-sao-58915324a"
                        class="text-color"
                      >
                        <i class="fab fa-linkedin">Lokeshkumar-sao</i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.linkedin.com/in/durgaprasad-inumula"
                        target="_blank"
                        class="text-color"
                      >
                        <i class="fab fa-linkedin">Durgaprasad-inumula</i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <hr class="mb-4" />

            <section class="">
              <p class="d-flex justify-content-center align-items-center">
                <span class="me-3 custom-bg-text">Login from here</span>
                <Link to="/user/login" class="active">
                  <button
                    type="button"
                    class="btn btn-outline-light btn-rounded bg-color custom-bg-text"
                  >
                    Log in
                  </button>
                </Link>
              </p>
            </section>

            <hr class="mb-4" />
          </div>

          <div class="text-center">
            © 2025 Copyright:
            <Link to="/"> freelancinghub.com</Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
