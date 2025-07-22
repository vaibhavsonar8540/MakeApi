import React, { useState } from "react";
import axios from "axios";

function SignUp() {
  const [form, setForm] = useState({
    username: "", email: "", dob: "", role: "", location: "", password: "", confirmPassword: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:3030/signup", form);
      alert("Registration successful");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Sign Up</h2>
      {["username", "email", "dob", "location", "password", "confirmPassword"].map((field) => (
        <input
          key={field}
          type={field.includes("password") ? "password" : field === "dob" ? "date" : "text"}
          name={field}
          placeholder={field}
          onChange={handleChange}
          required
        />
      ))}
      <select name="role" onChange={handleChange} required>
        <option value="">Select Role</option>
        <option value="Admin">Admin</option>
        <option value="Explorer">Explorer</option>
      </select>
      <button type="submit">Register</button>
    </form>

  );
}

export default SignUp;
