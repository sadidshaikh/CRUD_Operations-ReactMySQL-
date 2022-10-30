import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

let initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const { id } = useParams();
  const [state, setState] = useState(initialState);
  const { name, email, contact } = state;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5562/api/get/${id}`).then((response) => {
      setState({ ...response.data[0] });
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please provide vlaue into each input field");
    } else if (id) {
      axios("http://localhost:5562/api/update", {
        method: "put",
        data: { id, name, email, contact },
      }).then(() => {
        toast.success("Contact Updated Successfully");
      });
      setTimeout(() => navigate("/"), 500);
    } else {
      axios("http://localhost:5562/api/post", {
        method: "post",
        data: { name, email, contact },
      })
        .then(() => {
          toast.success("Contact Added Successfully");
          setState(initialState);
        })
        .catch((err) => toast.error(err.response.data));
      setTimeout(() => navigate("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email..."
          value={email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="text"
          id="contact"
          name="contact"
          placeholder="Your Contact No..."
          value={contact || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to={"/"}>
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
