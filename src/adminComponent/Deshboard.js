import axios from "axios";
import React, { useState } from "react";

const Deshboard = () => {
  let [user, setUser] = useState([]);
  let [category, setcategory] = useState([]);
  let userHendler = () => {
    axios
      .get("http://localhost:5000/user/all")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let userdeleteHendler = (id) => {
    axios
      .delete(`http://localhost:5000/admin/userdelete/?id=${id}`)
      .then((res) => {
        userHendler();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let categoryHendler = () => {
    axios
      .get("http://localhost:5000/category/all", {
        headers: { token: localStorage.getItem("adminToken") },
      })
      .then((res) => {
        setcategory(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={userHendler}
      >
        user
      </button>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={categoryHendler}
      >
        categories
      </button>

      <table border={1} width={50}>
        <tr>
          <th>email</th>
          <th>password</th>
        </tr>
        {user.map((el) => {
          return (
            <tr>
              <td>{el.email}</td>
              <td>{el.password}</td>
              <td>
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => userdeleteHendler(el._id)}
                >
                  DELETE
                </button>
              </td>
            </tr>
          );
        })}
      </table>

      <table border={1} width={50}>
        <tr>
          <th>image</th>
          <th>title</th>
        </tr>
        {category.map((el) => {
          return (
            <tr>
              <td>
                <img src={"http://localhost:5000/images/" + el.image} />
              </td>
              <td>{el.title}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Deshboard;
