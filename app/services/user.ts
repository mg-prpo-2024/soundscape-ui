import { baseFetcher } from "~/services/base";

const fetcher = baseFetcher.extend({ prefixUrl: "http://localhost:3000/user" });

export async function signUp() {
  return await fetcher.post("sign-up").json();
}

export async function signIn() {
  return await fetcher.post("sign-in").json();
}

export async function update() {
  return await fetcher.put("update").json();
}
