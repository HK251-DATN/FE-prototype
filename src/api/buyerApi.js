import { backofficeClient } from "./axiosClient";

const buyerApi = {
  getProfile: () => backofficeClient.get("/api/buyer"),
  updateProfile: (data) => backofficeClient.put("/api/user", data),
  updateAvatar: (formData) =>
    backofficeClient.post("/api/user/avt-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

export default buyerApi;
