import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Categories = () => {
  let [category, setCategory] = useState([]);

  let history=useHistory()

  let [id, setId] = useState("");

  let [update, setUpdate] = useState({
    image: "",
    title: "",
  });

  let categoriesHendler = () => {
    axios
      .get("http://localhost:5000/category/all", {
        headers: {
          token: localStorage.getItem("adminToken"),
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setCategory(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    categoriesHendler();
  }, []);

  let editHendler = (index) => {
    setUpdate(category[index]);
    setId(category[index]._id);
  };

  let deleteHendler = (id) => {
    axios
      .delete(`http://localhost:5000/category/delete/?id=${id}`,{
        headers:{token:localStorage.getItem("adminToken")}
      })
      .then((res) => {
        categoriesHendler();
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
        onSubmit={async (values) => {
          let categoriesData = new FormData();
          categoriesData.append("image", values.image);
          categoriesData.append("title", values.title);
          if (id) {
            axios
              .put(
                `http://localhost:5000/category/update?id=${id}`,
                categoriesData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    token: localStorage.getItem("adminToken"),
                  },
                }
              )
              .then((res) => {
                categoriesHendler();
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            axios
              .post("http://localhost:5000/category/add", categoriesData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  token: localStorage.getItem("adminToken"),
                },
              })
              .then((res) => {
                categoriesHendler();
                history.push("/admin/deshboard")
              })
              .catch((error) => {
                console.log(error);
              });
          }
          setUpdate({
            image: "",
            title: "",
          });
          setId("");
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
            <Field id="title" name="title" />
            <br></br>
            <br></br>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>

      <table border={1} width={500}>
        <tr>
          <th>image</th>
          <th>title</th>
        </tr>
        {category.map((el, index) => {
          return (
            <tr>
              <td>
                <img
                  src={"http://localhost:5000/images/" + el.image}
                  width={50}
                  height={50}
                />
              </td>
              <td>{el.title}</td>
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

export default Categories;
