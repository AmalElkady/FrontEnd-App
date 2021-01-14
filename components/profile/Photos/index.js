import React from "react";
import Widget from "../../../components/Widget/index";

import Carousel from "react-elastic-carousel";

export default function Photos({ items }) {
  return (
    // <Widget title="Photos" styleName="jr-card-profile-sm">
    //   <div className="pt-2">
    //     <ul className="jr-gallery-list">
    //       {photoList.map((photo, index) => (
    //         <li key={index}>
    //           <img alt="..." src={photo.image} />
    //         </li>
    //       ))}
    //     </ul>
    //     <span className="text-primary jr-fs-md pointer jr-d-block">
    //       Go to gallery{" "}
    //       <i
    //         className={`zmdi zmdi-long-arrow-right jr-fs-xxl ml-2 d-inline-flex align-middle`}
    //       />
    //     </span>
    //   </div>
    // </Widget>
    <Carousel>
      {items.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </Carousel>
  );
}
