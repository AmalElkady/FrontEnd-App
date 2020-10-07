import Router from 'next/router';

export default (context = {}, target) => {
 
  console.log(target);
  console.log(context);
  console.log(context.pathname);
  

   
   if(context.pathname) {
 	   
 	    console.log("CHECK_HERE_");
 	    if(context.store.getState().auth.authUser !== "access_token"){
 	 	     //Router.push('/signin');
			 console.log("ze");
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
