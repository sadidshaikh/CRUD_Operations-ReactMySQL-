import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Views = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const { name, email, contact } = user;

  useEffect(() => {
    axios.get(`http://localhost:5562/api/get/${id}`).then((response) => {
      setUser({ ...response.data[0] });
    });
  }, []);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Contact Detail</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br /> <br />
          <strong>Name: </strong>
          <span>{name}</span>
          <br /> <br />
          <strong>Email: </strong>
          <span>{email}</span>
          <br /> <br />
          <strong>Contact: </strong>
          <span>{contact}</span>
          <br /> <br />
        </div>
        <Link to={"/"}>
          <input
            className="btn btn-edit"
            style={{ width: "30%" }}
            value="Go Back"
          />
        </Link>
      </div>
    </div>
  );
};

export default Views;
