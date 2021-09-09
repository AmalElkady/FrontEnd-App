import Router from "next/router";

export default (context = {}, target) => {
  if (context.pathname) {
    if (context.store.getState().auth.authUser !== "access_token") {
      //Router.push('/signin');
      return false;
    } else {
      return true;
    }

    //  if(context.pathname === '/dashboard/eCommerce') {

    //   }
  } else {
    context.res.writeHead(303, { Location: target });
    context.res.end();
  }
  //  Router.push(target);
  //  if (context.res) {
  //    context.res.writeHead(303, { Location: target });
  //    context.res.end();
  //  } else {
  //    Router.replace(target);
  //  }
};
