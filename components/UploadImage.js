import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Resizer from "react-image-file-resizer";
import ReactCrop from "react-image-crop";
import UserCard from "./Cards/UserCard"

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

  // const [crop, setCrop] = useState({
  //   unit: "px",
  //   width: 100,
  //   height: 100,
  //   aspect: 16 / 9
  // });
  // const [crop, setCrop] = useState( {
  //           unit: "%",
  //           width: 50,
  //           height:50,
  //           // aspect: 16 / 9
  //         }
  //       );
  const [crop, setCrop] = useState(null);
  let myRef = React.createRef();
  const [fileSrc, setFileSrc] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [croppedImageFile, setCroppedImageFile] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [selectImg, setSelectedImg] = useState(null);
  const [rechW, setRechW] = useState(null);
  const [rechH, setRechH] = useState(null);



useEffect(() => {
    function handleResize() {
       console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
       if(window.innerWidth>575){
       setCrop({
            unit: "px",
            width: 150,
            height:150,
            // aspect: 16 / 9
          });
       }else{
           setCrop({
            unit: "px",
            width: 200,
            height:200,
            // aspect: 16 / 9
          });
       }
      // setDimensions({
      //   height: window.innerHeight,
      //   width: window.innerWidth
      // })
    
}
    window.addEventListener('resize', handleResize)
  })

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(null)
      setFileSrc(null)
      setCroppedImageUrl(null)
      setImageRef(null)
      setSelectedImg(null)
      setRechW(null)
      setRechH(null)
      const reader = new FileReader();
      console.log("select file");
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
    console.log("crop.width ",crop.width);
    console.log("crop.height ",crop.height);
    if (crop.width <myRef.current.componentRef.clientWidth/2) {
      console.log("1#####");
      crop.width = myRef.current.componentRef.clientWidth/2;
    }
    if (crop.height < myRef.current.componentRef.clientHeight/2) {
      console.log("2#####");
      crop.height =myRef.current.componentRef.clientHeight/2;
    }
    setCrop(crop);
  };

  const makeClientCrop = async crop => {
    if (imageRef && crop.width && crop.height) {
      // console.log("cropeddddddd ", crop);
      // console.log("imageRef ", imageRef);
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
    console.log("rech to cal w", Math.round(rechW),crop.width);
    console.log("rech to cal h",Math.round(rechH),crop.height);
    canvas.width = crop.width*Math.round(rechW);
    canvas.height = crop.height*Math.round(rechH);
    console.log(" canvas.width  ", canvas.width );
    console.log("canvas.height  ",  canvas.height );

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width*Math.round(rechW) * scaleX,
      crop.height*Math.round(rechH) * scaleY,
      0,
      0,
      crop.width*Math.round(rechW),
      crop.height*Math.round(rechH)
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        console.log("blooooob ",blob);
        const file = new File([blob], fileName, {
        type: "image/jpeg",
        lastModified: Date.now()
      });
       console.log("blooooob2 ",file);
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
const getImgFromSrc=(fSrc)=>{
  console.log("from  getImgFromSrc");
   const img = new Image();
      img.src = fileSrc;
      setSelectedImg(img);
       setCrop({
            unit: "px",
            width: myRef.current.componentRef.clientWidth/2,
            height:myRef.current.componentRef.clientHeight/2,
            // aspect: 16 / 9
          });
     // img.onload = function() {
        // console.log("imgWidth: ",img.width);
        // console.log("imgHeight: ",img.height);
        // let cropSitting = {};
        // if (img.width >= img.height) {
        //   console.log("1@@@@");
        //   cropSitting = {
        //     unit: "px",
        //     width: img.height/2,
        //     height: img.height/2,
        //     // width: "50",
        //     // height:"50",
        //     aspect: 16 / 9
        //   };
        //   setCrop(cropSitting);
        // } else if (img.height >= img.width) {
        //   console.log("2@@@@");
        //   cropSitting = {
        //     unit: "px",
        //     width: img.width/2,
        //     height: img.width/2,
        //     //   width: "50",
        //     // height:"50",
        //     aspect: 16 / 9
        //   };
        //   setCrop(cropSitting);
        // }
     // };
}
useEffect(() => {
    if (selectImg) {
      // fixed size
      //  console.log("myRef.current h",myRef.current.componentRef.clientHeight);
      //  console.log("myRef.current w",myRef.current.componentRef.clientWidth);
       //image size
      //   console.log("imgWidth: ",selectImg.width);
      //  console.log("imgHeight: ",selectImg.height);
       // rech
       setRechW(selectImg.width/myRef.current.componentRef.clientWidth);
       setRechH(selectImg.height/myRef.current.componentRef.clientHeight)

    }
}, [selectImg]);

  useEffect(() => {
    if (fileSrc) {
      //console.log("fileSrc ", fileSrc);
      getImgFromSrc(fileSrc);
     
    }
  }, [fileSrc]);

  const CropDemo = ({ src }) => {
    const [crop, setCrop] = useState({ aspect: 16 / 9 });
    return (
      <ReactCrop src={src} crop={crop} onChange={newCrop => setCrop(newCrop)} />
    );
  };

  const uploadSingleFile = e => {
    setDisplayFile(URL.createObjectURL(e.target.files[0]));
    //setFile(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const resizeFile = file => {
  console.log("from resize ", file);
    return new Promise(resolve => {
     Resizer.imageFileResizer(
     file, // the file from input
     480, // width
     480, // height
     "JPEG", // compress format WEBP, JPEG, PNG
     70, // quality
     0, // rotation
     (uri) => {
       console.log(uri);
       resolve(uri);
       // You upload logic goes here
     },
     "blob" // blob or base64 default base64
   )
    })
  };

  const onChange = async file => {
    console.log("from onchange 1 ",file);
    const image = await resizeFile(file);
    console.log("rom onchange 2 ", image);
  };

  return (
    <>
      <br />
      <br />
         {/* <UserCard
                  // key={option.i}
                  user={{_:croppedImageUrl,n:"Maha Ahmed",co:"EG",ci:"1"}}
                  timeScore="1990070126733669"
                ></UserCard> */}

      {croppedImageUrl && (
        <div style={{ width: "30%"}}>
          {" "}
          <img alt="Crop" style={{ maxWidth: "100%" }} src={croppedImageUrl} />
        </div>
      )}
      <br />
      {fileSrc &&(
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
