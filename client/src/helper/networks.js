import axios from "axios";
export const BaseUrlDB =
  "https://json-server-suman-chakraborty.herokuapp.com/user_details";

export const BaseUrlImgur = "https://api.imgur.com/3/image";

export const SendUsers = (data) => {
  return axios.post(BaseUrlDB, data);
};
