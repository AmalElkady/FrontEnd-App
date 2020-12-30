import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Resizer from "react-image-file-resizer";
import ReactCrop from "react-image-crop";
import UserCard from "./Cards/UserCard";

import IntlMessages from "../util/IntlMessages";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "70%",
    margin: "2rem auto"
  }
}));
export default function UploadImage() {
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [displayFile, setDisplayFile] = useState(null);
  /////////
  const [crop, setCrop] = useState(null);
  let myRef = React.createRef();
  const [fileSrc, setFileSrc] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [croppedImageFile, setCroppedImageFile] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [selectImg, setSelectedImg] = useState(null);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 575) {
        setCrop({
          unit: "px",
          width: 150,
          height: 150
        });
      } else {
        setCrop({
          unit: "px",
          width: 200,
          height: 200
        });
      }
    }
    window.addEventListener("resize", handleResize);
  });

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(null);
      setFileSrc(null);
      setCroppedImageUrl(null);
      setImageRef(null);
      setSelectedImg(null);
      const reader = new FileReader();
      reader.addEventListener("load", () => setFileSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoaded = image => {
    setImageRef(image);
  };

  const onCropComplete = crop => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    if (crop.width < myRef.current.componentRef.clientWidth / 2) {
      crop.width = myRef.current.componentRef.clientWidth / 2;
    }
    if (crop.height < myRef.current.componentRef.clientHeight / 2) {
      crop.height = myRef.current.componentRef.clientHeight / 2;
    }
    setCrop(crop);
  };

  const makeClientCrop = async crop => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef,
        crop,
        "newFile.jpeg"
      );
      setCroppedImageUrl(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        const file = new File([blob], fileName, {
          type: "image/jpeg",
          lastModified: Date.now()
        });
        setCroppedImageFile(file);
        resolve(window.URL.createObjectURL(blob));
      }, "image/jpeg");
    });
  };

  useEffect(() => {
    if (croppedImageFile) {
      onChange(croppedImageFile);
    }
  }, [croppedImageFile]);
  const getImgFromSrc = fSrc => {
    const img = new Image();
    img.src = fileSrc;
    setSelectedImg(img);
    setCrop({
      unit: "px",
      width: myRef.current.componentRef.clientWidth / 2,
      height: myRef.current.componentRef.clientHeight / 2
    });
  };

  useEffect(() => {
    if (fileSrc) {
      getImgFromSrc(fileSrc);
    }
  }, [fileSrc]);
  const uploadSingleFile = e => {
    setDisplayFile(URL.createObjectURL(e.target.files[0]));
    //setFile(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const resizeFile = file => {
    return new Promise(resolve => {
      Resizer.imageFileResizer(
        file, // the file from input
        480, // width
        480, // height
        "JPEG", // compress format WEBP, JPEG, PNG
        70, // quality
        0, // rotation
        uri => {
          console.log(uri);
          resolve(uri);
          // You upload logic goes here
        },
        "blob" // blob or base64 default base64
      );
    });
  };

  const onChange = async file => {
    const image = await resizeFile(file);
    console.log("rom onchange 2 ", image);
  };

  return (
    <>
      <br />
      <br />
      {croppedImageUrl && (
        <div style={{ width: "30%" }}>
          {" "}
          <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
        </div>
      )}
      <br />
      {fileSrc && (
        <ReactCrop
          id="crop-container"
          src={fileSrc}
          crop={crop}
          ruleOfThirds
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
          ref={myRef}
        />
      )}
      <br />
      <br />
      <br />
      {/* {displayFile && <img src={displayFile} alt="" />} */}
      <label htmlFor="upload-photo">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          accept="image/*"
          //onChange={uploadSingleFile}
          onChange={onSelectFile}
        />
        <Button color="primary" variant="contained" component="span">
          Upload Image
        </Button>
      </label>
    </>
  );
}
