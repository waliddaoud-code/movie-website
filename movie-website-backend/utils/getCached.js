import cache from "../cache.js";

export default async function getCached(key, ttl, fetchFn) {
  const cached = cache.get(key);
  if (cached) {
    console.log(`Cache hit for key: ${key}`);
    return cached;
  }
  console.log(`Cache miss for key: ${key}`);
  const data = await fetchFn();
  cache.set(key, data, ttl);
  return data;
}
