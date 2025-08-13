import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ServiceCarousel from "./ServiceCarousel";
import { Button, Modal } from "react-bootstrap";

const ServiceDetailPage = () => {
  const { serviceId } = useParams();

  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const expert = JSON.parse(sessionStorage.getItem("active-expert"));
  const expert_jwtToken = sessionStorage.getItem("expert-jwtToken");

  const navigate = useNavigate();

  const [service, setService] = useState({
    id: "",
    name: "",
    description: "",
    subCategory: {
      id: "",
      name: "",
      description: "",
      status: "",
    },
    techExpert: {
      id: "",
      firstName: "",
      lastName: "",
      shopName: "",
      emailId: "",
      phoneNo: "",
      role: "",
      address: {
        id: "",
        street: "",
        city: "",
        pincode: "",
      },
      walletAmount: "",
      status: "",
    },
    addedTime: "",
    minPrice: "",
    deliveryTime: "",
    image1: "",
    image2: "",
    image3: "",
    status: "",
  });

  const [serviceRequest, setServiceRequest] = useState({
    serviceId: serviceId,
    customerId: customer ? customer.id : 0,
    requirement_description: "",
  });

  const handleInput = (e) => {
    setServiceRequest({ ...serviceRequest, [e.target.name]: e.target.value });
  };

  const [selectedImage, setSelectImage] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    const getService = async () => {
      const fetchServiceResponse = await retrieveService();
      if (fetchServiceResponse) {
        setService(fetchServiceResponse.services[0]);
      }
    };
    getService();
  }, []);

  const retrieveService = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/service/fetch/id-wise?serviceId=" + serviceId
    );
    console.log(response.data);
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  const bookServicePage = (e) => {
    e.preventDefault();
    if (customer === null) {
      alert("Please login as customer to book an service!!!");
    } else {
      handleShow();
    }
  };

  const [errors, setErrors] = useState({});
  const validateForm = (e) => {
    const errors = {};
    errors.requirement_description = validRequirementDescription(
      e.requirement_description
    );
    errors.image = validselectedImage(selectedImage);
    return errors;
  };

  const validRequirementDescription = (e) => {
    if (!e) {
      errors.requirement_description = "Requirement description is required";
    } else if (e.length < 10) {
      errors.requirement_description =
        "Requirement description must be at least 10 characters long";
    } else if (e.length > 500) {
      errors.requirement_description =
        "Requirement description must be less than 500 characters";
    } else {
      errors.requirement_description = "";
    }
    return errors.requirement_description;
  };

  const validselectedImage = (e) => {
    if (!e) {
      errors.image = "Image is required";
    } else if (
      !(
        e.name.endsWith(".jpg") ||
        e.name.endsWith(".png") ||
        e.name.endsWith(".jpeg")
      )
    ) {
      errors.image = "Image must be an image file";
    } else if (e.size > 2 * 1024 * 1024) {
      errors.image = "Image must be less than 2MB";
    } else {
      errors.image = "";
    }
    return errors.image;
  };

  const requestForService = (e) => {
    e.preventDefault();
    if (serviceRequest === null) {
      toast.error("invalid input!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }
    const validationErrors = validateForm(serviceRequest);
    setErrors(validationErrors);
    if (Object.values(validationErrors).every((x) => x === "")) {
      const formData = new FormData();
      formData.append("serviceId", serviceRequest.serviceId);
      formData.append("customerId", serviceRequest.customerId);
      formData.append(
        "requirement_description",
        serviceRequest.requirement_description
      );
      formData.append("requirement_filename", selectedImage);

      axios
        .post("http://localhost:8080/api/service/request/add", formData, {
          headers: {
            // Authorization: "Bearer " + guide_jwtToken, // Replace with your actual JWT token
          },
        })
        .then((resp) => {
          let response = resp.data;

          if (response.success) {
            toast.success(response.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              navigate("/home");
            }, 2000); // Redirect after 3 seconds
          } else if (!response.success) {
            toast.error(response.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // setTimeout(() => {
            //   window.location.reload(true);
            // }, 2000); // Redirect after 3 seconds
          } else {
            toast.error("It Seems Server is down!!!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // setTimeout(() => {
            //   window.location.reload(true);
            // }, 2000); // Redirect after 3 seconds
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("It seems server is down", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // setTimeout(() => {
          //   window.location.reload(true);
          // }, 2000); // Redirect after 3 seconds
        });
    }
  };

  return (
    <div className="mb-3">
      <div className="col ml-5 mt-3 ms-5 me-5">
        {/* Company and Employer Details Card */}
        <div className="card rounded-card h-100 shadow-lg ">
          <h2 className="card-title text-center text-color ms-4">
            Service Detail
          </h2>

          <div className="row g-0">
            {/* Left side - Company Details Card */}
            <div className="col-md-6">
              <div className="card-body">
                <div className="row g-0">
                  {/* Left side - Company Logo */}
                  <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <ServiceCarousel
                      item={{
                        image1: service.image1,
                        image2: service.image2,
                        image3: service.image3,
                      }}
                    />
                  </div>
                  {/* Right side - Job Details */}
                  <div className="col-md-8">
                    <div className="card-body text-color">
                      <h3 className="card-title d-flex justify-content-between text-color-second">
                        <div>
                          <b>{service.name}</b>
                        </div>
                      </h3>
                      <p className="card-text text-dark">
                        {service.description}
                      </p>

                      <b>
                        <span className="text-dark">Tech Expert:</span>
                        <span className="text-color ms-2">
                          {service.techExpert.firstName +
                            " " +
                            service.techExpert.lastName}
                        </span>
                      </b>
                      <br />
                      <br />
                      <b>
                        <span className="text-dark">Shop Name:</span>
                        <span className="text-color ms-2">
                          {service.techExpert.shopName}
                        </span>
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Employer Details Card */}
            <div className="col-md-6 text-dark">
              <div className="card-body">
                {/* Include the necessary details for the employer */}
                {/* Display First Name and Last Name in a row */}

                <div className="row mt-5">
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Category:</b>

                      <span className="text-color">
                        {" "}
                        {service.subCategory.name}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Added Time:</b>

                      <span className="text-color">
                        {" "}
                        {formatDateFromEpoch(service.addedTime)}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Delivery Time:</b>
                      <span className="text-color">
                        {" "}
                        {service.deliveryTime + " Days"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Minimum Price:</b>

                      <span className="text-color">
                        {" "}
                        &#8377; {service.minPrice}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Shop Address:</b>
                      <span className="text-color">
                        {service.techExpert.address.street +
                          " " +
                          service.techExpert.address.city +
                          " " +
                          service.techExpert.address.pincode}{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {(() => {
            if (service.status === "Active") {
              return (
                <div className="d-flex justify-content-center mt-4">
                  <button
                    type="button"
                    className="btn bg-color custom-bg-text mb-3"
                    onClick={(e) => bookServicePage(e)}
                  >
                    <b> Request Service</b>
                  </button>
                  <ToastContainer />
                </div>
              );
            }
          })()}
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            Service Request
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <form>
              <div class="mb-3">
                <label for="title" class="form-label">
                  <b>Requirement</b>
                </label>
                <textarea
                  type="text"
                  class="form-control"
                  name="requirement_description"
                  onChange={handleInput}
                  onInput={(e) => validRequirementDescription(e.target.value)}
                  value={serviceRequest.requirement_description}
                  placeholder="enter your requirement here...."
                />
                {errors.requirement_description && (
                  <small className="text-danger">
                    {errors.requirement_description}
                  </small>
                )}
              </div>

              <div className="mb-3">
                <label for="formFile" class="form-label">
                  <b> Select Requirement File</b>
                </label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  name="image"
                  onChange={(e) => setSelectImage(e.target.files[0])}
                  onInput={(e) => validselectedImage(e.target.files[0])}
                  accept=".jpg, .jpeg, .png"
                  required
                />
                {errors.image && (
                  <small className="text-danger">{errors.image}</small>
                )}
              </div>

              <div className="d-flex aligns-items-center justify-content-center mb-2">
                <button
                  type="submit"
                  onClick={requestForService}
                  class="btn bg-color custom-bg-text"
                >
                  Request
                </button>
                <ToastContainer />
              </div>

              <ToastContainer />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ServiceDetailPage;
