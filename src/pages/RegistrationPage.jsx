import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const [userData, setUserData] = useState();
  const [validated, setIsValidated] = useState(true);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailUnique(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/user");
        const jsonData = await response.json();
        setUserData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  localStorage.setItem("users", JSON.stringify(userData));
  console.log(userData, "this is user data");

  const isError =
    email === "" ||
    username === "" ||
    password === "" ||
    dob === "" ||
    address === "" ||
    phone === "";

  console.log(isError, "isError");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userExists = userData.some((user) => user.email === email);
    console.log(userExists, "userExists");

    if (isError) {
      setIsValidated(false);
      alert("Fill all the fields to register the form ");
    } else {
      if (!userExists) {
        const response = await fetch("http://localhost:5000/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            dob: dob,
            address: address,
            phone: phone,
          }),
        });

        if (response.ok) {
          // User created successfully
          alert("User created successfully");
          navigate("/login");
        } else {
          // Error creating user
          alert("Error creating user");
        }
      } else {
        setIsEmailUnique(false);
        alert("Email is not unique");
      }
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          {!isEmailUnique && (
            <div style={{ color: "red" }}>Email must be unique</div>
          )}
          {email === "" && !validated && (
            <div style={{ color: "red" }}>Email is required</div>
          )}
        </div>

        <br />
        <div style={{ display: "flex" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password === "" && !validated && (
            <div style={{ color: "red" }}>Password is required</div>
          )}
        </div>
        <div style={{ display: "flex", marginTop: "20px" }}>
          <label>Username:</label>
          <input
            type="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {username === "" && !validated && (
            <div style={{ color: "red" }}>Username is required</div>
          )}
        </div>
        <br />
        <div style={{ display: "flex" }}>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          {dob === "" && !validated && (
            <div style={{ color: "red" }}>Date of birth is required</div>
          )}
        </div>
        <br />
        <div style={{ display: "flex" }}>
          <label>Address:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          {address === "" && !validated && (
            <div style={{ color: "red" }}>Address is required</div>
          )}
        </div>
        <br />
        <div style={{ display: "flex" }}>
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {phone === "" && !validated && (
            <div style={{ color: "red" }}>Phone number is required</div>
          )}
        </div>
        <br />
        <button type="submit">Register</button>
      </form>
      <div>
        Already a user?
        <button
          onClick={() => navigate("/login")}
          style={{ marginTop: "50px" }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default RegistrationPage;
