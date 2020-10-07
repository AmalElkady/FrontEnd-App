import cookie from 'js-cookie';
//https://blog.dareboost.com/en/2019/03/secure-cookies-secure-httponly-flags/
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 3600,
      path: '/',
    });
  }
};

export const getCookie = (key,req) => {
    return process.browser
      ? getCookieFromBrowser(key)
      : getCookieFromServer(key, req);
	//return process.browser
   // ? 
  // return getCookieFromBrowser(key);
};

export const removeCookie = key => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 3600,
    });
  }
};

const getCookieFromBrowser = key => {
  return cookie.get(key);
};

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};
