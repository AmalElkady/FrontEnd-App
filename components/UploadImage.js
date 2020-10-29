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

/////////

  const [crop, setCrop] = useState({ unit: '%',
      width: 30,
      height: 60,
    //  minWidth : 30,
    //  minHeight: 30,
     //aspect: 16 / 9 
      });
  const [fileSrc, setFileSrc] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [imageRef, setImageRef] = useState(null);

 const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener('load', () =>
        setFileSrc(reader.result)
    );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

 const onImageLoaded = image => {
    setImageRef(image)
  };

  const onCropComplete = crop => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop, percentCrop) => {
    setCrop(crop);
  };


 
  const makeClientCrop = async (crop)=> {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef,
        crop,
        'newFile.jpeg'
      );
      setCroppedImageUrl(croppedImageUrl);
    }
  }

 const getCroppedImg=(image, crop, fileName) =>{
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

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
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        //window.URL.revokeObjectURL(fileUrl);
       // fileUrl = window.URL.createObjectURL(blob);
        resolve(window.URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
}





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
        {croppedImageUrl && (
         <div style={{ width: '30%' }}> <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
         </div>
        )}
 <br />
      {fileSrc && (<ReactCrop
            src={fileSrc}
            crop={crop}
            ruleOfThirds
            onImageLoaded={onImageLoaded}
            onComplete={onCropComplete}
            onChange={onCropChange}
      />)}
      <br />
      <label htmlFor="upload-photo">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          accept="image/*" 
          onChange={onSelectFile}
        />
        <Button color="primary" variant="contained" component="span">
          Upload Image
        </Button>
      </label>
    </>
  );
}
