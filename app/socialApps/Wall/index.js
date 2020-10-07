import React, { Component } from "react";

import Profile from "../../../components/wall/Profile";
import PostList from "../../../components/wall/PostList";
import Interests from "../../../components/wall/Interests";
import Photos from "../../../components/wall/Photos";
import Friends from "../../../components/wall/Friends";
import CustomScrollbars from "../../../util/CustomScrollbars";
import {
  communitiesList,
  friendList,
  interestList,
  photoList,
  postList,
  recentActivity,
  user,
  userInfo
} from "./data";
import Communities from "../../../components/wall/Communities";
import RecentActivity from "../../dashboard/CRM/RecentActivity";

class Wall extends Component {
  render() {
    return (
      <div className="jr-main-content">
        <div className="row">
          <div className="d-none d-sm-block col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <CustomScrollbars className="jr-wall-scroll scrollbar">
              <Profile user={user} userInfo={userInfo} />
              <Interests interestList={interestList} />
              <Friends friendList={friendList} />

              <Photos photoList={photoList} title="Photos" />
              <span className="text-primary jr-fs-md pointer jr-d-block mb-4">
                Go to gallery{" "}
                <i
                  className={`zmdi zmdi-long-arrow-right jr-fs-xxl ml-2 d-inline-flex align-middle`}
                />
              </span>
            </CustomScrollbars>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <CustomScrollbars className="jr-wall-scroll scrollbar">
              <div className="jr-wall-postlist">
                <PostList postList={postList} user={user} />
              </div>
            </CustomScrollbars>
          </div>
          <div className="d-none d-lg-block col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
            <CustomScrollbars className="jr-wall-scroll scrollbar">
              <Communities communitiesList={communitiesList} />
              <span className="text-primary jr-fs-md pointer d-block mb-4">
                See All Communities{" "}
                <i
                  className={`zmdi zmdi-long-arrow-right jr-fs-xxl ml-2 d-inline-flex align-middle`}
                />
              </span>
              <RecentActivity recentList={recentActivity} shape="square" />
            </CustomScrollbars>
          </div>
        </div>
      </div>
    );
  }
}

export default Wall;
