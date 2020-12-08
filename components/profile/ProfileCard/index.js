import React from "react";

export default function ProfileCard({ mainInfo }) {
  return (
    <div>
      <div className="profile-intro card shadow  border-0 text-center">
        <div className="pi-header">
          <div className="card-image layer">
            <img
              className="avatar-circle"
              src={mainInfo.photo}
              alt="Team Member"
            />
          </div>
        </div>
        <div className="pi-content">
          <h4>{mainInfo.n}</h4>
          <p>Designer</p>
          <p className="card-text">
            Hello everyone, I am Maryam. My designs are used in several big
            companies in United State and other countries.
          </p>
        </div>
        <div className="pi-footer">
          <div className="icons-wrapper">
            <span className="icon facebook-icon jr-link">
              <i className="zmdi zmdi-facebook zmdi-hc-fw zmdi-hc-lg" />
            </span>

            <span className="icon twitter-icon jr-link">
              <i className="zmdi zmdi-twitter zmdi-hc-fw zmdi-hc-lg" />
            </span>

            <span className="icon linkedin-icon jr-link">
              <i className="zmdi zmdi-linkedin zmdi-hc-fw zmdi-hc-lg" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
