"use client";

import { parseJwt } from "./jwtExtract";

export default function getTokenData() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const getData = parseJwt(token);
  return {
    username: getData?.username,
    email: getData?.email,
  };
}
