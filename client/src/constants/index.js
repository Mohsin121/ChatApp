const devUrls = {
  api_url: "http://localhost:8000/api",
  file_url: "http://localhost:8000",
  front_end: "http://localhost:3000",
};

const prodUrls = {
  api_url: "http://34.239.106.12/api",
  file_url: "http://34.239.106.12",
  front_end: "http://34.239.106.12",
};

const environment = import.meta.env.MODE === "development" ? devUrls : prodUrls;

export const environmentUrls = {
  ...environment,
};
