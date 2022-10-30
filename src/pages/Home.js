import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const loadData = async () => {
    const result = await axios.get("http://localhost:5562/api/get");
    setData(result.data);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure that you want to delete that contact ?")) {
      axios.delete(`http://localhost:5562/api/delete/${id}`);
      toast.success("Contact Deleted Successfully");
      setTimeout(() => loadData(), 500);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ marginTop: "100px" }}>
      <Link to={`/addContact`}>
        <button className="btn btn-contact">Add Contact</button>
      </Link>

      {data.length == 0 ? (
        <h2>You Have No Contacts Yet</h2>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Contact</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const { id, name, email, contact } = item;
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td style={{ textTransform: "capitalize" }}>{name}</td>
                  <td>{email}</td>
                  <td>{contact}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
