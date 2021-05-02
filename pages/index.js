import React, { Component, Fragment } from "react";
import FrontPage from "./frontPage";

const API_KEY = "5b623d5355373a0a083a";

// const pusher = new Pusher(API_KEY, {
//   cluster: "eu",
//   authorizer: authorizer
// });

// var channel = pusher.subscribe("private-co_ci_va_uid");

// channel.bind("message", function(data) {
//   // fillData('message-container',data.value);
//   console.log("data.value ", data.value);
// });
// channel.bind("love", function(data) {
//   //  fillData('love-container',data.value);
//   console.log("data.value ", data.value);
// });
// channel.bind("view", function(data) {
//   // fillData('view-container',data.value);
//   console.log("data.value ", data.value);
// });
// channel.bind("privatephoto", function(data) {
//   //  fillData('privatephoto-container',data.value);
//   console.log("data.value ", data.value);
// });
// channel.bind("disconnect_signal", function(data) {
//   //  fillData('disconnectsignal-container',data.value);
//   console.log("data.value ", data.value);
// });

class IndexPage extends Component {
  render() {
    return <FrontPage />;
  }
}

export default IndexPage;
