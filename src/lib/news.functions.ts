import { createServerFn } from "@tanstack/react-start";
import { fetchRateNews } from "./news.server";

export const getRateNews = createServerFn({ method: "GET" }).handler(async () => {
  return await fetchRateNews();
});
