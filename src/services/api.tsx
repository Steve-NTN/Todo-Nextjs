import configs from "@/configs";

type dataType = {
  method: string,
  body?: any
}

const API = (url: string, data?: dataType) => {
  return fetch(`${configs?.API_DOMAIN}${url}`, data)
    .then((res) => res?.json())
};

export default API;
