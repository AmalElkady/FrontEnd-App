import React from "react";
import Widget from "../../../components/Widget/index";
import { useRouter } from "next/router";

import Carousel from "react-elastic-carousel";
import IntlMessages from "../../../util/IntlMessages";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";

export default function Photos({ items }) {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];
  const router = useRouter();
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
    <Carousel breakPoints={breakPoints}>
      {items.map(item => (
        <div className="img-div" key={item.id}>
          {/* {item.title} */}
          {router.query.flag == "read" && (
            <div className="img-div-overlay">
              <Tooltip title="Send request to access photos">
                {/* <Button>
                  <Fab aria-label="Send to access photos"> */}
                <Typography variant="body1" gutterBottom>
                  <IntlMessages id="profile.privateImg" />
                </Typography>
                {/* </Fab>
                </Button> */}
              </Tooltip>
            </div>
          )}
          {router.query.flag == "readMe" && (
            <>
              <Tooltip title="Delete" className="icon-img-delete">
                <Fab aria-label="delete">
                  <DeleteIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="Edit" aria-label="add" className="icon-img-edit">
                <Fab color="secondary">
                  <EditIcon />
                </Fab>
              </Tooltip>
              <Tooltip
                title="Add New Photo"
                aria-label="add"
                className="icon-img-add"
              >
                <Fab color="secondary">
                  <AddIcon />
                </Fab>
              </Tooltip>
            </>
          )}
          <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80" />
        </div>
      ))}
    </Carousel>
  );
}
