import React from "react";

function About() {
  return (
    <div className="about-container">
      <h2>About This Project</h2>
      <p>This project includes:</p>
      <ul>
        <li>Sign up/Login authentication using JWT</li>
        <li>Role-based access control (Admin/Explorer)</li>
        <li>MongoDB integration</li>
        <li>Logging to log.txt</li>
      </ul>
      <p>Tech Used: React, Express.js, MongoDB, JWT</p>
    </div>

  );
}

export default About;
