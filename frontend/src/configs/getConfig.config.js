export const getConfig = () => {
  return {
    apiUrl: import.meta.env.VITE_API_ECOMMERCE_URL,
    webName: import.meta.env.VITE_WEB_NAME,
  };
};
