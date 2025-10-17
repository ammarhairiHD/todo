"use client";

import { parseJwt } from "./jwtExtract";

export default function getTokenData() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  const getData = parseJwt(token);
  return {
    username: getData?.username,
    email: getData?.email,
  };
}
