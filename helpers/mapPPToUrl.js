export const mapPPToUrl = (photosArr, signedRequest) => {
  if (Array.isArray(photosArr)) {
    if (signedRequest != null && photosArr.length != 0) {
      const newPhotosArr = photosArr.map((e, i) => {
        if (e.p != null) {
          if (e.p.includes(".xxx")) {
            e.p = null;
          } else {
            const editSignedRequest = signedRequest.replace("/*?", `/${e.p}?`);
            e.p = editSignedRequest;
          }
        }
      });
      return newPhotosArr;
    }
  }
};
