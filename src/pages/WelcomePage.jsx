import React, { useState, useEffect } from "react";
import ChangePasswordForm from "../component/ChangePassword";
import { selectUser } from "../slices/userSlice";
import { useSelector } from "react-redux";

const WelcomePage = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState({ edit: false, id: "" });
  const [data, setData] = useState([]);
  const user = useSelector(selectUser);

  console.log(JSON.parse(user),"this is main user")
  const loggedIinUser = JSON.parse(localStorage.getItem("loggedinuser"));

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/user");
        const jsonData = await response.json();
        setUsers(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //   useEffect(() => {
  //     // Fetch users from local storage on component mount
  //     const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  //     setUsers(storedUsers);
  //   }, []);

  const handleView = (userId) => {
    // Handle view user logic, e.g., redirect to user details page

    console.log(`View User with ID: ${userId}`);
  };

  const handleEdit = (userId) => {
    // Handle edit user logic, e.g., redirect to edit user page
    setEditUser(true);
    setEditUser((editUser) => ({
      edit:true,
      id: userId,
    }));
    console.log(`Edit User with ID: ${userId}`);
  };


  console.log(editUser)
  return (
    <div>
      <h1>Welcome</h1>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>DOB</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user?.id}>
              <td>{user?.username}</td>
              <td>{user?.dob}</td>
              <td>{user?.email}</td>
              <td>
                <button onClick={() => handleView(user?.id)}>View</button>
                {loggedIinUser?.id === user?.id && (
                  <button onClick={() => handleEdit(user?.id)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
      {editUser?.edit && <ChangePasswordForm id={editUser?.id} />}
    </div>
  );
};

export default WelcomePage;
