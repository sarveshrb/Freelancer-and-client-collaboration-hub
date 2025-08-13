import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserLoginForm = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const validateForm = (e) => {
    const errors = {};
    errors.emailId = validemailId(e.emailId);
    errors.password = validpassword(e.password);
    errors.role = validrole(e.role);

    return errors;
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
    if (!e.trim()) {
      errors.password = "Password is required";
    } else if (e.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else {
      errors.password = "";
    }
    return errors.password;
  };

  const validrole = (e) => {
    if (e === "" || e === "0") {
      errors.role = "Please select a role";
    } else {
      errors.role = "";
    }
    return errors.role;
  };

  const loginAction = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(loginRequest);
    setErrors(validationErrors);
    if (Object.values(validationErrors).every((x) => x === "")) {
      fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginRequest),
      })
        .then((result) => {
          console.log("result", result);
          result.json().then((res) => {
            if (res.success) {
              console.log("Got the success response");

              if (res.jwtToken !== null) {
                if (res.user.role === "Admin") {
                  sessionStorage.setItem(
                    "active-admin",
                    JSON.stringify(res.user)
                  );
                  sessionStorage.setItem("admin-jwtToken", res.jwtToken);
                } else if (res.user.role === "Customer") {
                  sessionStorage.setItem(
                    "active-customer",
                    JSON.stringify(res.user)
                  );
                  sessionStorage.setItem("customer-jwtToken", res.jwtToken);
                } else if (res.user.role === "Tech Expert") {
                  sessionStorage.setItem(
                    "active-expert",
                    JSON.stringify(res.user)
                  );
                  sessionStorage.setItem("expert-jwtToken", res.jwtToken);
                }
              }

              if (res.jwtToken !== null) {
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
                  window.location.href = "/home";
                }, 1000); // Redirect after 3 seconds
              } else {
                toast.error(res.responseMessage, {
                  position: "top-center",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            } else {
              toast.error(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
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
        });
      e.preventDefault();
    }
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div className="form-card border-color" style={{ width: "25rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "38px",
              }}
            >
              <h4 className="card-title">User Login</h4>
            </div>
            <div className="card-body mt-3">
              <form>
                <div class="mb-3 text-color">
                  <label for="role" class="form-label">
                    <b>User Role</b>
                  </label>
                  <select
                    onChange={handleUserInput}
                    onInput={(e) => validrole(e.target.value)}
                    className="form-control"
                    name="role"
                  >
                    <option value="0">Select Role</option>
                    <option value="Admin"> Admin </option>
                    <option value="Tech Expert"> Tech Expert </option>
                    <option value="Customer"> Customer </option>
                  </select>
                  {errors.role && (
                    <div className="text-danger">{errors.role}</div>
                  )}
                </div>

                <div className="mb-3 text-color">
                  <label for="emailId" class="form-label">
                    <b>Email Id</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    onChange={handleUserInput}
                    onInput={(e) => validemailId(e.target.value)}
                    value={loginRequest.emailId}
                  />
                  {errors.emailId && (
                    <div className="text-danger">{errors.emailId}</div>
                  )}
                </div>
                <div className="mb-3 text-color">
                  <label for="password" className="form-label">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={handleUserInput}
                    onInput={(e) => validpassword(e.target.value)}
                    value={loginRequest.password}
                    autoComplete="on"
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>
                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    onClick={loginAction}
                  >
                    Login
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginForm;
