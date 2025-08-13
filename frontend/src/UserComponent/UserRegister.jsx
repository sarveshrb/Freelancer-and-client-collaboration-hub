import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    shopName: "",
    emailId: "",
    password: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (document.URL.indexOf("customer") != -1) {
      user.role = "Customer";
    } else if (document.URL.indexOf("tech-expert") != -1) {
      user.role = "Tech Expert";
    }
  }, [document.URL]);

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = (e) => {
    const errors = {};

    errors.firstName = validfirstName(e.firstName);
    errors.lastName = validlastName(e.lastName);

    errors.emailId = validemailId(e.emailId);
    errors.password = validpassword(e.password);
    errors.phoneNo = validphoneNo(e.phoneNo);
    errors.street = validstreet(e.street);
    errors.city = validcity(e.city);
    errors.pincode = validpincode(e.pincode);

    return errors;
  };

  const validfirstName = (e) => {
    if (!e.trim()) {
      errors.firstName = "FirstName is required";
    } else if (e.length < 4) {
      errors.firstName = "FirstName must be at least 4 characters long";
    } else {
      errors.firstName = "";
    }

    return errors.firstName;
  };
  const validlastName = (e) => {
    if (!e.trim()) {
      errors.lastName = "LastName is required";
    } else if (e.length < 4) {
      errors.lastName = "LastName must be at least 4 characters long";
    } else {
      errors.lastName = "";
    }
    return errors.lastName;
  };
  const validemailId = (e) => {
    if (!e.trim()) {
      errors.emailId = "Email is required";
    } else if (!e.includes("@")) {
      errors.emailId = "Email is invalid";
    } else {
      errors.emailId = "";
    }
    return errors.emailId;
  };
  const validpassword = (e) => {
    if (!e) {
      errors.password = "Password is required";
    } else if (e.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else {
      errors.password = "";
    }
    return errors.password;
  };
  const validphoneNo = (e) => {
    if (!e) {
      errors.phoneNo = "Phone number is required";
    } else if (e.length != 10 ) {
      errors.phoneNo = "Phone number must be 10 digits long";
    } else {
      errors.phoneNo = "";
    }
    return errors.phoneNo;
  };
  const validstreet = (e) => {
    if (!e.trim()) {
      errors.street = "Street is required";
    } else if (e.length < 4) {
      errors.street = "Street must be at least 4 characters long";
    } else {
      errors.street = "";
    }
    return errors.street;
  };
  const validcity = (e) => {
    if (!e.trim()) {
      errors.city = "City is required";
    } else if (e.length < 2) {
      errors.city = "City must be at least 2 characters long";
    } else {
      errors.city = "";
    }
    return errors.city;
  };
  const validpincode = (e) => {
    if (!e) {
      errors.pincode = "Pincode is required";
    } else if (e.length < 6) {
      errors.pincode = "Pincode must be at least 6 digits long";
    } else {
      errors.pincode = "";
    }
    return errors.pincode;
  };

  const saveUser = (e) => {
    e.preventDefault();
    const newErrors = validateForm(user);
    setErrors(newErrors);

    if (Object.values(newErrors).every((x) => x === "")) {
      let jwtToken;

      fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //    Authorization: "Bearer " + jwtToken,
        },
        body: JSON.stringify(user),
      })
        .then((result) => {
          console.log("result", result);
          result.json().then((res) => {
            if (res.success) {
              toast.success(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              setTimeout(() => {
                navigate("/user/login");
              }, 1000);
            } else if (!res.success) {
              toast.error(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              setTimeout(() => {
                window.location.reload(true);
              }, 1000); // Redirect after 3 seconds
            } else {
              toast.error("It seems server is down", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              setTimeout(() => {
                window.location.reload(true);
              }, 1000); // Redirect after 3 seconds
            }
          });
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
          setTimeout(() => {
            window.location.reload(true);
          }, 1000); // Redirect after 3 seconds
        });
    }
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="form-card border-color text-color"
          style={{ width: "50rem" }}
        >
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 className="card-title">
                Register{" "}
                {document.URL.indexOf("tech-expert") != -1
                  ? "Tech Expert"
                  : "Customer"}{" "}
                Here!!!
              </h5>
            </div>
            <div className="card-body mt-3">
              <form className="row g-3" onSubmit={saveUser}>
                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="title" className="form-label">
                    <b>First Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    onChange={handleUserInput}
                    onInput={(e) => validfirstName(e.target.value)}
                    value={user.firstName}
                  />
                  {errors.firstName && (
                    <small className="error-message text-danger">
                      {errors.firstName}
                    </small>
                  )}
                </div>

                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="title" className="form-label">
                    <b>Last Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    onChange={handleUserInput}
                    onInput={(e) => validlastName(e.target.value)}
                    value={user.lastName}
                  />
                  {errors.lastName && (
                    <small className="error-message text-danger">
                      {errors.lastName}
                    </small>
                  )}
                </div>

                <div className="col-md-6 mb-3 text-color">
                  <b>
                    <label className="form-label">Email Id</label>
                  </b>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    onChange={handleUserInput}
                    onInput={(e) => validemailId(e.target.value)}
                    value={user.emailId}
                  />
                  {errors.emailId && (
                    <small className="error-message text-danger">
                      {errors.emailId}
                    </small>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="quantity" className="form-label">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={handleUserInput}
                    onInput={(e) => validpassword(e.target.value)}
                    value={user.password}
                  />
                  {errors.password && (
                    <small className="error-message text-danger">
                      {errors.password}
                    </small>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="contact" className="form-label">
                    <b>Contact No</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phoneNo"
                    name="phoneNo"
                    onChange={handleUserInput}
                    onInput={(e) => validphoneNo(e.target.value)}
                    value={user.phoneNo}
                  />
                  {errors.phoneNo && (
                    <small className="error-message text-danger">
                      {errors.phoneNo}
                    </small>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="description" className="form-label">
                    <b> Street</b>
                  </label>
                  <textarea
                    className="form-control"
                    id="street"
                    name="street"
                    rows="3"
                    onChange={handleUserInput}
                    onInput={(e) => validstreet(e.target.value)}
                    value={user.street}
                  />
                  {errors.street && (
                    <small className="error-message text-danger">
                      {errors.street}
                    </small>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="price" className="form-label">
                    <b>City</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    onChange={handleUserInput}
                    onInput={(e) => validcity(e.target.value)}
                    value={user.city}
                  />
                  {errors.city && (
                    <small className="error-message text-danger">
                      {errors.city}
                    </small>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="pincode" className="form-label">
                    <b>Pincode</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="pincode"
                    name="pincode"
                    onChange={handleUserInput}
                    onInput={(e) => validpincode(e.target.value)}
                    value={user.pincode}
                  />
                  {errors.pincode && (
                    <small className="error-message text-danger">
                      {errors.pincode}
                    </small>
                  )}
                </div>

                <div className="d-flex aligns-items-center justify-content-center">
                  <input
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    value="Register User"
                  />
                </div>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
