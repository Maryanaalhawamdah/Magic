import React, { useState, useEffect } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { FaPlus } from "react-icons/fa";
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

function GetUser() {
  const [data, setData] = useState([]);


  useEffect(() => {
    axios.get('http://localhost/Art-Magic/connection/users/get.php')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);


  const sentid = (id) => {
    
    axios.post('http://localhost/React/frontend/Admin/connection/users/getuser.php',  id )
      .then(response => {
        // Handle the response, e.g., redirect to the edit page
        console.log('this the php :'+response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

 

  return (
    <div id="mainUdiv">
    
      <table className="table table-bordered">
        <thead>
        <tr class="table-dark">
            <th>Id</th>
            <th>Fname</th>
            <th>Lname</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td class="table-secondary">{item.id}</td>
              <td class="table-danger">{item.fname}</td>
              <td class="table-success">{item.lname}</td>
              <td class="table-danger">{item.email}</td>
              <td class="table-info">{item.address}</td>
              <td class="table-primary">{item.phone}</td>
              <td class="table-light">
                <Link to={`/edit/${item.id}`}>
                  <button
                    type="button"
                    id="edit"
                    onClick={() => sentid(item.id)} // Call sentid with item.id
                    className="btn btn-info add-new"
                  >
                    <i className="fa fa-plus"></i> Edit
                  </button>
                </Link>
                <span> </span>
                <Link to={`/delete/${item.id}`}>
                  <button type="button" id="del" className="btn btn-info add-new">
                    Delete
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <Link to="/add"> <button class="btn btn-dark me-md-2" type="button">
          <FaPlus />  <i className="fa fa-plus"></i> Add New
        </button></Link>
      </div>
      {/* <Link to="/add"> <button type="button" className="btn btn-info add-new">
                                    <FaPlus />  <i className="fa fa-plus"></i> Add New
                                    </button></Link>  */}
    </div>
  );
}

export default GetUser;
