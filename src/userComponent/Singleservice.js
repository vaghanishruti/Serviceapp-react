import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";

const Singleservice = () => {
  let params = useParams();

  let [single, setSingle] = useState([]);

  let [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/service/${params.id}`)
      .then((res) => {
        setSingle(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
  }, []);
  return (
    <div>
      <div>
        <a
          href="#"
          class="block max-w-7xl m-5 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
            <span className="flex justify-center">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link>Service</Link>
            </span>
        </a>
      </div>
      <div className="flex mt-10 mb-10">
        <div className="w-2/5">
          <div>
            <a
              href="#"
              class="block max-w-sm m-5 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <ul>
                {category.map((el) => {
                  return <li>| {el.title}</li>;
                })}
              </ul>
            </a>
          </div>
          <div>
            <h1 className="m-5 font-extrabold">
              Enim qui eos rerum in delectus
            </h1>
            <p className="m-5">
              Nam voluptatem quasi numquam quas fugiat ex temporibus quo est.
              Quia aut quam quod facere ut non occaecati ut aut. Nesciunt
              mollitia illum tempore corrupti sed eum reiciendis. Maxime modi
              rerum.
            </p>
          </div>
        </div>
        <div className="w-3/5">
          <img
            src={"http://localhost:5000/images/" + single.image}
            width={700}
            height={450}
          />
          <h1>
            Temporibus et in vero dicta aut eius lidero plastis trand lined
            voluptas dolorem ut voluptas
          </h1>
          <p>
            Blanditiis voluptate odit ex error ea sed officiis deserunt.
            Cupiditate non consequatur et doloremque consequuntur. Accusantium
            labore reprehenderit error temporibus saepe perferendis fuga
            doloribus vero. Qui omnis quo sit. Dolorem architecto eum et quos
            deleniti officia qui.
          </p>
          <ul>
            <li>1. Aut eum totam accusantium voluptatem.</li>
            <li>2. Assumenda et porro nisi nihil nesciunt voluptatibus.</li>
            <li>3. Ullamco laboris nisi ut aliquip ex ea</li>
          </ul>
          <p>
            Est reprehenderit voluptatem necessitatibus asperiores neque sed ea
            illo. Deleniti quam sequi optio iste veniam repellat odit. Aut
            pariatur itaque nesciunt fuga.
          </p>
          <p>
            Sunt rem odit accusantium omnis perspiciatis officia. Laboriosam aut
            consequuntur recusandae mollitia doloremque est architecto
            cupiditate ullam. Quia est ut occaecati fuga. Distinctio ex
            repellendus eveniet velit sint quia sapiente cumque. Et ipsa
            perferendis ut nihil. Laboriosam vel voluptates tenetur nostrum.
            Eaque iusto cupiditate et totam et quia dolorum in. Sunt molestiae
            ipsum at consequatur vero. Architecto ut pariatur autem ad non
            cumque nesciunt qui maxime. Sunt eum quia impedit dolore alias
            explicabo ea.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Singleservice;
