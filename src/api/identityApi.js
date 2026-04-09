import { identityClient } from "./axiosClient";

const identityApi = {
  changePassword: (data) =>
    identityClient.post("/api/user/change-password", data),
};

export default identityApi;
