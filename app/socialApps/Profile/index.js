import React, { Component } from "react";
import About from "../../../components/profile/About";
import Biography from "../../../components/profile/Biography";
import Events from "../../../components/profile/Events";
import Contact from "../../../components/profile/Contact";
import Friends from "../../../components/profile/Friends";
import Photos from "../../../components/profile/Photos";
import ProfileHeader from "../../../components/profile/ProfileHeader";
import Auxiliary from "../../../util/Auxiliary";
import { friendList } from "./data";
import { photoList } from "../Wall/data";

class Profile extends Component {
  render() {
    return (
      <Auxiliary>
        <ProfileHeader />
        <div className="jr-profile-content">
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-7 col-12">
              <About />
              <Biography />
              <Events />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-5 col-12">
              <Contact />
              <div className="row">
                <div className="col-12">
                  <Friends friendList={friendList} />
                </div>
                <div className="col-12">
                  <Photos photoList={photoList} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Auxiliary>
    );
  }
}

export default Profile;
