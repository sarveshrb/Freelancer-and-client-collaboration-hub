import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddServiceForm = () => {
  const expert = JSON.parse(sessionStorage.getItem("active-expert"));
  const expert_jwtToken = sessionStorage.getItem("expert-jwtToken");

  const [categories, setCategories] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const getAllCategories = async () => {
      const res = await retrieveAllCategories();
      if (res) {
        setCategories(res.categories);
      }
    };

    getAllCategories();
  }, []);

  const retrieveAllCategories = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/category/fetch/all"
    );
    return response.data;
  };

  const [selectedImage1, setSelectImage1] = useState(null);
  const [selectedImage2, setSelectImage2] = useState(null);
  const [selectedImage3, setSelectImage3] = useState(null);

  const [service, setService] = useState({
    name: "",
    description: "",
    subCategoryId: 0,
    techExpertId: expert.id,
    minPrice: "",
    deliveryTime: "",
  });

  const handleInput = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState({});

  const validateForm = (e) => {
    const errors = {};
    console.log("validating form", e);
    console.log("selectedImage1", selectedImage1);
    console.log("selectedImage2", selectedImage2);
    console.log("selectedImage3", selectedImage3);
    errors.name = validName(e.name);
    errors.description = validDescription(e.description);
    errors.subCategoryId = validSubCategoryId(e.subCategoryId);
    errors.minPrice = validMinPrice(e.minPrice);
    errors.image1 = validImage1(selectedImage1);
    errors.image2 = validImage2(selectedImage2);
    errors.image3 = validImage3(selectedImage3);
    return errors;
  };

  const validName = (e) => {
    if (!e.trim()) {
      errors.name = "Service name is required";
    } else if (e.length < 3) {
      errors.name = "Service name must be at least 3 characters long";
    } else {
      errors.name = "";
    }
    return errors.name;
  };
  const validDescription = (e) => {
    if (!e.trim()) {
      errors.description = "Service description is required";
    } else if (e.length < 7) {
      errors.description =
        "Service description must be at least 7 characters long";
    } else {
      errors.description = "";
    }
    return errors.description;
  };
  const validSubCategoryId = (e) => {
    if (e === "" || e === 0) {
      errors.subCategoryId = "Please select a service category";
    } else {
      errors.subCategoryId = "";
    }
    return errors.subCategoryId;
  };
  const validMinPrice = (e) => {
    if (!e.trim() || e <= 0) {
      errors.minPrice = "Minimum price is required";
    } else {
      errors.minPrice = "";
    }
    return errors.minPrice;
  };

  const validImage1 = (e) => {
    if (!e) {
      errors.image1 = "Image 1 is required";
    } else if (
      !(
        e.name.endsWith(".jpg") ||
        e.name.endsWith(".png") ||
        e.name.endsWith(".jpeg")
      )
    ) {
      errors.image1 = "Image 1 must be an image file";
    } else if (e.size > 2 * 1024 * 1024) {
      // 2MB limit
      errors.image1 = "Image 1 must be less than 2MB";
    } else {
      errors.image1 = "";
    }
    return errors.image1;
  };
  const validImage2 = (e) => {
    if (!e) {
      errors.image2 = "Image 2 is required";
    } else if (
      !(
        e.name.endsWith(".jpg") ||
        e.name.endsWith(".png") ||
        e.name.endsWith(".jpeg")
      )
    ) {
      errors.image2 = "Image 2 must be an image file";
    } else if (e.size > 2 * 1024 * 1024) {
      // 2MB limit
      errors.image2 = "Image 2 must be less than 2MB";
    } else {
      errors.image2 = "";
    }
    return errors.image2;
  };
  const validImage3 = (e) => {
    if (!e) {
      errors.image3 = "Image 3 is required";
    } else if (
      !(
        e.name.endsWith(".jpg") ||
        e.name.endsWith(".png") ||
        e.name.endsWith(".jpeg")
      )
    ) {
      errors.image3 = "Image 3 must be an image file";
    } else if (e.size > 2 * 1024 * 1024) {
      // 2MB limit
      errors.image3 = "Image 3 must be less than 2MB";
    } else {
      errors.image3 = "";
    }
    return errors.image3;
  };

  const saveService = (e) => {
    e.preventDefault();
    if (service === null) {
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
    const validationErrors = validateForm(service);
    setErrors(validationErrors);
    if (Object.values(validationErrors).every((x) => x === "")) {
      const formData = new FormData();
      formData.append("name", service.name);
      formData.append("description", service.description);
      formData.append("subCategoryId", service.subCategoryId);
      formData.append("techExpertId", service.techExpertId);
      formData.append("minPrice", service.minPrice);
      formData.append("deliveryTime", service.deliveryTime);
      formData.append("image1", selectedImage1);
      formData.append("image2", selectedImage2);
      formData.append("image3", selectedImage3);

      axios
        .post("http://localhost:8080/api/service/add", formData, {
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

  const convertToEpochTime = (dateString) => {
    const selectedDate = new Date(dateString);
    const epochTime = selectedDate.getTime();
    return epochTime;
  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center mb-4 ms-3 me-3">
        <div class="card form-card shadow-lg">
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 text-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 class="card-title">Add Service</h5>
            </div>
            <div class="card-body text-color">
              <form className="row g-3">
                <div className="col-md-3 mb-3">
                  <label htmlFor="title" className="form-label">
                    <b>Service Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={handleInput}
                    onInput={(e) => validName(e.target.value)}
                    value={service.name}
                  />
                  {errors.name && (
                    <small className="text-danger">{errors.name}</small>
                  )}
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">
                    <b>Service Description</b>
                  </label>
                  <textarea
                    class="form-control"
                    id="description"
                    name="description"
                    rows="2"
                    placeholder="enter description.."
                    onChange={handleInput}
                    onInput={(e) => validDescription(e.target.value)}
                    value={service.description}
                  />
                  {errors.description && (
                    <small className="text-danger">{errors.description}</small>
                  )}
                </div>

                <div className="col-md-3 mb-3">
                  <label className="form-label">
                    <b>Service Category</b>
                  </label>

                  <select
                    name="subCategoryId"
                    onChange={handleInput}
                    onInput={(e) => validSubCategoryId(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Select Category</option>

                    {categories.map((category) => {
                      return (
                        <option value={category.id}> {category.name} </option>
                      );
                    })}
                  </select>
                  {errors.subCategoryId && (
                    <small className="text-danger">
                      {errors.subCategoryId}
                    </small>
                  )}
                </div>

                <div className="col-md-3 mb-3">
                  <label htmlFor="title" className="form-label">
                    <b>Delivery Time (in days)</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="deliveryTime"
                    name="deliveryTime"
                    onChange={handleInput}
                    value={service.deliveryTime}
                  />
                </div>

                <div className="col-md-3 mb-3">
                  <label htmlFor="pincode" className="form-label">
                    <b>Minimum Price</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="minPrice"
                    name="minPrice"
                    onChange={handleInput}
                    onInput={(e) => validMinPrice(e.target.value)}
                    value={service.minPrice}
                  />
                  {errors.minPrice && (
                    <small className="text-danger">{errors.minPrice}</small>
                  )}
                </div>

                <div className="col-md-3 mb-3">
                  <label for="formFile" class="form-label">
                    <b> Select Resume Image </b>
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    name="image1"
                    onChange={(e) => setSelectImage1(e.target.files[0])}
                    onInput={(e) => validImage1(e.target.files[0])}
                    accept=".jpg, .jpeg, .png"
                    required
                  />
                  {errors.image1 && (
                    <small className="text-danger">{errors.image1}</small>
                  )}
                </div>
                <div className="col-md-3 mb-3">
                  <label for="formFile" class="form-label">
                    <b> Select Profile Picture</b>
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    name="image2"
                    onChange={(e) => setSelectImage2(e.target.files[0])}
                    onInput={(e) => validImage2(e.target.files[0])}
                    accept=".jpg, .jpeg, .png"
                    required
                  />
                  {errors.image2 && (
                    <small className="text-danger">{errors.image2}</small>
                  )}
                </div>
                <div className="col-md-3 mb-3">
                  <label for="formFile" class="form-label">
                    <b> Select Signature image</b>
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    name="image3"
                    onChange={(e) => setSelectImage3(e.target.files[0])}
                    onInput={(e) => validImage3(e.target.files[0])}
                    accept=".jpg, .jpeg, .png"
                    required
                  />
                  {errors.image3 && (
                    <small className="text-danger">{errors.image3}</small>
                  )}
                </div>

                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    class="btn bg-color custom-bg-text"
                    onClick={saveService}
                  >
                    Add Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddServiceForm;
