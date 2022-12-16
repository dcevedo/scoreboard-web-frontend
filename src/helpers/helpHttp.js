export const helpHttp = () => {
  const customFetch = async (endpoint, options) => {
    const defaultHeader = {
      accept: "application/json",
    };

    const controller = new AbortController();
    options.signal = controller.signal;
  
    options.method = options.method || "GET";
    options.headers = options.headers 
      ?{...options.headers, ...defaultHeader}
      : defaultHeader;

    options.body = JSON.stringify(options.body) || false;
    if(!options.body) delete options.body;

    console.log(endpoint,options);
    setTimeout(() => controller.abort(),1000);

    try {
      const res = await fetch(endpoint, options);
      return await (res.ok ? res.json() : Promise.reject(
        {
          err: true,
          status: res.status || "00",
          statusText: res.statusText || "sin mensaje de status",
          message: (await res.json()).message || "Sin mensaje",
        }));
    } catch (err) {
      return err;
    }
  };

  const get = (url,options = {}) => customFetch(url,options);

  const post = (url,options = {}) => {
    options.method = "POST";
    return customFetch(url,options);
  };

  const put = (url,options = {}) => {
    options.method = "PUT";
    return customFetch(url,options);
  };

  const del = (url,options = {}) => {
    options.method = "DELETE";
    return customFetch(url,options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
