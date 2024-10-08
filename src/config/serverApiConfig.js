export const API_BASE_URL =
  process.env.NODE_ENV == "production" ||
  process.env.REACT_APP_DEV_REMOTE == "remote"
    ? "https://www.doc-gen.xyz/api/"
    : "http://localhost:8888/api/";

export const ACCESS_TOKEN_NAME = "x-auth-token";
