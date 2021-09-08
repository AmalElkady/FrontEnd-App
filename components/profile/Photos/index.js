import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import ModalUploadMPP from "../../../components/Modals/modalUploadMPP";
import ModalSendPPAccess from "../../../components/Modals/modalSendPPAccess";
import {
  openModalPP,
  openModalSendPP,
  ppRemove,
  readMyPhotos,
  setFinalPP,
  readMyProfile,
  requestPhotoReadPP,
  ppUploadSuccess,
  ppRemoveSuccess
} from "../../../actions/Profile";
import { mapObjectToArray } from "../../../helpers/mapObjectToArray";
import { mapPPToUrl } from "../../../helpers/mapPPToUrl";

export default function Photos({ newUser }) {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];
  const router = useRouter();
  const [photoIndex, setPhotoIndex] = useState(null);
  const [photosMapped, setPhotosMapped] = useState(null);

  const [defaultPhotos, setDefaultPhotos] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 }
  ]);
  const OpenModalPP = useSelector(state => state.profile.openModalPP);
  const OpenModalSendPP = useSelector(state => state.profile.openModalSendPP);
  const PhotoUploadPP = useSelector(state => state.profile.photoUploadPP);
  const PhotoRemovePP = useSelector(state => state.profile.photoRemovePP);
  const myPhotos = useSelector(state => state.profile.myPhotos);
  const userPhotos = useSelector(state => state.profile.userPhotos);
  const myPhotoPPSigned = useSelector(state => state.profile.myPhotoPPSigned);
  const userPhotoPPSigned = useSelector(
    state => state.profile.userPhotoPPSigned
  );
  const userClickedProfile = useSelector(
    state => state.home.userClickedProfile
  );
  const userPhotoPPSignedMessage = useSelector(
    state => state.profile.userPhotoPPSignedMessage
  );
  const finalPP = useSelector(state => state.profile.finalPP);
  const dispatch = useDispatch();
  useEffect(() => {
    setPhotosMapped(null);
    if (myPhotos != null && router.query.flag == "readMe") {
      setPhotosMapped(mapObjectToArray(myPhotos));
      dispatch(readMyPhotos(1));
    }
  }, [myPhotos]);
  useEffect(() => {
    setPhotosMapped(null);
    if (
      userPhotos != null &&
      userClickedProfile &&
      userClickedProfile.flag == "read"
    ) {
      setPhotosMapped(mapObjectToArray(userPhotos));
      dispatch(
        requestPhotoReadPP(
          userClickedProfile.i,
          userClickedProfile.co,
          userClickedProfile.ci,
          userClickedProfile.va
        )
      );
    }
  }, [userPhotos]);

  useEffect(() => {
    if (myPhotoPPSigned != null && router.query.flag == "readMe") {
      dispatch(setFinalPP(mapPPToUrl(photosMapped, myPhotoPPSigned)));
    }
  }, [myPhotoPPSigned]);

  useEffect(() => {
    if (userPhotoPPSigned != null && userClickedProfile.flag == "read") {
      dispatch(setFinalPP(mapPPToUrl(photosMapped, userPhotoPPSigned)));
    }
  }, [userPhotoPPSigned]);

  useEffect(() => {
    if (PhotoUploadPP) {
      dispatch(readMyProfile("L2"));
      dispatch(openModalPP(false));
      dispatch(ppUploadSuccess(false));
    }
  }, [PhotoUploadPP]);

  useEffect(() => {
    if (PhotoRemovePP) {
      dispatch(readMyProfile("L2"));
      dispatch(ppRemoveSuccess(false));
    }
  }, [PhotoRemovePP]);

  return (
    <>
      {
        <Carousel breakPoints={breakPoints}>
          {photosMapped &&
            finalPP &&
            !userPhotoPPSignedMessage &&
            photosMapped.map(item => (
              <div className="img-div" key={item.id}>
                {/* {router.query.flag == "read" && (
                  <div className="img-div-overlay">
                    <Tooltip
                      title="Send request to access photos"
                      onClick={() => {
                        dispatch(openModalSendPP(true));
                      }}
                    > */}
                {/* <Button>
                  <Fab aria-label="Send to access photos"> */}
                {/* <Typography variant="body1" gutterBottom>
                        <IntlMessages id="profile.privateImg" />
                      </Typography> */}
                {/* </Fab>
                </Button> */}
                {/* </Tooltip>
                  </div> */}
                {/* )} */}
                {router.query.flag == "readMe" && (
                  <>
                    {item.p && (
                      <>
                        <Tooltip
                          title="Delete"
                          className="icon-img-delete"
                          onClick={() => {
                            console.log("remove pp ", item.id + 1);
                            dispatch(ppRemove(item.id + 1));
                          }}
                        >
                          <Fab aria-label="delete">
                            <DeleteIcon />
                          </Fab>
                        </Tooltip>
                        <Tooltip
                          title="Edit"
                          aria-label="add"
                          className="icon-img-edit"
                          onClick={() => {
                            console.log("remove pp ", item.id);
                            dispatch(ppRemove(item.id + 1));
                            setPhotoIndex(item.id + 1);
                            dispatch(openModalPP(true));
                          }}
                        >
                          <Fab color="secondary">
                            <EditIcon />
                          </Fab>
                        </Tooltip>
                      </>
                    )}
                    {item.p == null && (
                      <Tooltip
                        title="Add New Photo"
                        aria-label="add"
                        className="icon-img-add"
                        onClick={() => {
                          setPhotoIndex(item.id + 1);
                          dispatch(openModalPP(true));
                        }}
                      >
                        <Fab color="secondary">
                          <AddIcon />
                        </Fab>
                      </Tooltip>
                    )}
                  </>
                )}
                {item.p && <img src={item.p} />}
                {item.p == null && (
                  <img src="../../../static/images/avatar.png" />
                )}
              </div>
            ))}
          {photosMapped == null &&
            (router.query.flag == "readMe" || newUser == true) &&
            defaultPhotos.map(item => (
              <div className="img-div" key={item.id}>
                {(router.query.flag == "readMe" || newUser == true) && (
                  <>
                    <Tooltip
                      title="Add New Photo"
                      aria-label="add"
                      className="icon-img-add"
                      onClick={() => {
                        setPhotoIndex(item.id);
                        dispatch(openModalPP(true));
                      }}
                    >
                      <Fab color="secondary">
                        <AddIcon />
                      </Fab>
                    </Tooltip>
                    <img src="../../../static/images/avatar.png" />
                  </>
                )}
              </div>
            ))}
          {(userPhotos == null || userPhotoPPSignedMessage) &&
            userClickedProfile &&
            userClickedProfile.flag == "read" &&
            defaultPhotos.map(item => (
              <div className="img-div" key={item.id}>
                <div className="img-div-overlay">
                  <Tooltip
                    title="Send request to access photos"
                    onClick={() => {
                      console.log("open modal");
                      dispatch(openModalSendPP(true));
                    }}
                  >
                    <Typography variant="body1" gutterBottom>
                      <IntlMessages id="profile.privateImg" />
                    </Typography>
                  </Tooltip>
                </div>
                <img src="../../../static/images/avatar.png" />
              </div>
            ))}
        </Carousel>
      }
      {OpenModalSendPP && (
        <ModalSendPPAccess
          id={userClickedProfile.i}
          co={userClickedProfile.co}
          ci={userClickedProfile.ci}
          va={userClickedProfile.va}
        ></ModalSendPPAccess>
      )}
      {OpenModalPP && <ModalUploadMPP photoNum={photoIndex}></ModalUploadMPP>}
    </>
  );
}
