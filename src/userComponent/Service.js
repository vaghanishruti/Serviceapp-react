import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";

const Service = () => {
  let [sevice, setService] = useState([]);

  let [categories, setCategories] = useState([]);

  let [update, setUpdate] = useState({
    image: "",
    title: "",
    description: "",
    category: "",
  });

  let [id, setId] = useState("");

  let serviceHendler = () => {
    axios
      .get("http://localhost:5000/service/userall", {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((res) => {
        console.log("service===", res);
        setService(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/category/all", {
        headers: { token: localStorage.getItem("adminToken") },
      })
      .then((res) => {
        console.log(res);
        setCategories(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    serviceHendler();
  }, []);

  let editHendler = (index) => {
    setUpdate(sevice[index]);
    setId(sevice[index]._id);
  };

  let deleteHendler = (id) => {
    axios
      .delete(`http://localhost:5000/service/${id}`, {
        headers: { token: localStorage.getItem("userToken") },
      })
      .then((res) => {
        serviceHendler();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Formik
        initialValues={update}
        enableReinitialize={true}
        onSubmit={async (values, action) => {
          let serviceData = new FormData();
          serviceData.append("image", values.image);
          serviceData.append("title", values.title);
          serviceData.append("description", values.description);
          serviceData.append("category", values.category);

          if (id) {
            axios
              .put(
                `http://localhost:5000/service/update?id=${id}`,
                serviceData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    token: localStorage.getItem("userToken"),
                  },
                }
              )
              .then((res) => {
                serviceHendler();
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            axios
              .post("http://localhost:5000/service/add", serviceData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  token: localStorage.getItem("userToken"),
                },
              })
              .then((res) => {
                serviceHendler();
              })
              .catch((error) => {
                console.log(error);
              });
          }

          setUpdate({
            image: "",
            title: "",
            description: "",
            category: "",
          });
          setId("");
          action.resetForm();
        }}
      >
        {(props) => (
          <Form>
            <label htmlFor="image">Image</label>
            <input
              type="file"
              onChange={(e) => props.setFieldValue("image", e.target.files[0])}
            />
            <br></br>
            <br></br>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" placeholder="title" />
            <br></br>
            <br></br>

            <label htmlFor="description">Description</label>
            <Field
              id="description"
              name="description"
              placeholder="description"
            />
            <br></br>
            <br></br>

            <label htmlFor="category">Category</label>
            <Field name="category" as="select">
              <option value="">Please select</option>
              {categories.map((el) => {
                return <option value={el._id}>{el.title}</option>;
              })}
            </Field>
            <br></br>
            <br></br>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>

      <table border="1px" width="50%">
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>category Name</th>
          <th>Image</th>
        </tr>
        {sevice.map((el, index) => {
          return (
            <tr>
              <td>
                <img
                  src={"http://localhost:5000/images/" + el.image}
                  height={50}
                  width={50}
                />
              </td>
              <td>{el.title}</td>
              <td>{el.description}</td>
              <td>{el.category.title}</td>
              <td>
                <button onClick={() => editHendler(index)}>Edit</button>
              </td>
              <td>
                <button onClick={() => deleteHendler(el._id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Service;
