import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Resizer from "react-image-file-resizer";
import ReactCrop from "react-image-crop";

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
  const [imgPreview, setImgPreview] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });

  const uploadSingleFile = e => {
    setFile({
      file: URL.createObjectURL(e.target.files[0])
    });
    if (file) {
      console.log("file ", file);
      setImgPreview(<img src={file} alt="" />);
    }
  };
  const CropDemo = ({ src }) => {
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    return (
      <ReactCrop src={src} crop={crop} onChange={newCrop => setCrop(newCrop)} />
    );
  };

  const resizeFile = file =>
    new Promise(resolve => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        uri => {
          resolve(uri);
        },
        "base64"
      );
    });

  const onChange = e => {
    setFile({
      file: URL.createObjectURL(e.target.files[0])
    });
    if (file) {
      console.log("file ", file);
      setImgPreview(<img src={file} alt="" />);
    }
  };

  return (
    <>
      <div>{imgPreview}</div>
      <ReactCrop
        src="../static/images/avatar.png"
        crop={crop}
        onChange={newCrop => setCrop(newCrop)}
      />
      <br />
      <label htmlFor="upload-photo">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          onChange={onChange}
        />

        <Button color="primary" variant="contained" component="span">
          Upload Image
        </Button>
      </label>
    </>
  );
}
