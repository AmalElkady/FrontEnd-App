export const mapPPToUrl = (photosArr, signedRequest) => {
  if (Array.isArray(photosArr)) {
    if (signedRequest != null && photosArr.length != 0) {
      const newPhotosArr = photosArr.map((e, i) => {
        if (e.p != null) {
          const editSignedRequest = signedRequest.replace("/*?", `/${e.p}?`);
          e.p = editSignedRequest;
        }
      });
      return newPhotosArr;
    }
  }
};
