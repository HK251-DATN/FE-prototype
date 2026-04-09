import { backofficeClient } from "";

const buyerApi = {
  getProfile: () => backofficeClient.get("/buyer"),
  updateProfile: (data) => backofficeClient.put("/buyer", data),
};

export default buyerApi;
