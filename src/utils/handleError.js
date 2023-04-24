import { message } from "antd";

export const handleError = (err, key) => {
  if (err.response?.data?.message) {
    message.error({
      content: err?.response?.data?.message || err?.message,
      key,
    });
  }
};
