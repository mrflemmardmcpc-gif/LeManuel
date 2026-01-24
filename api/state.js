export const config = { runtime: "nodejs" };

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const KEY = "carnet-data";

const send = (res, status, payload) => {
  res.status(status).setHeader("content-type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
};

const kvFetch = async (path, init = {}) => {
  const res = await fetch(`${KV_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "content-type": "application/json",
      ...(init.headers || {}),
    },
  });
  return res;
};

const readFromKv = async () => {
  const res = await kvFetch(`/get/${KEY}`);
  if (res.status === 404) return { data: null };
  if (!res.ok) throw new Error(`KV get failed ${res.status}`);
  const body = await res.json();
  const value = body?.result?.value ?? body?.result ?? null;
  return { data: value };
};

const writeToKv = async (data) => {
  const res = await kvFetch(`/set/${KEY}`,
    { method: "POST", body: JSON.stringify({ value: data }) },
  );
  if (!res.ok) throw new Error(`KV set failed ${res.status}`);
  return true;
};

async function readJson(req) {
  if (req.body) return req.body;
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => { data += chunk; });
    req.on("end", () => {
      if (!data) return resolve(null);
      try { resolve(JSON.parse(data)); } catch (err) { reject(err); }
    });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (!KV_URL || !KV_TOKEN) return send(res, 500, { error: "KV REST API env vars are missing" });
  const { method } = req;

  if (method === "GET") {
    try {
      const { data } = await readFromKv();
      return send(res, 200, { data });
    } catch (err) {
      return send(res, 500, { error: err.message || "KV read error" });
    }
  }

  if (method === "POST") {
    let payload;
    try {
      payload = await readJson(req);
    } catch (err) {
      return send(res, 400, { error: "Invalid JSON body" });
    }
    if (!payload || typeof payload.data !== "object" || Array.isArray(payload.data)) {
      return send(res, 400, { error: "Body must be { data: object }" });
    }
    try {
      await writeToKv(payload.data);
      return send(res, 200, { ok: true });
    } catch (err) {
      return send(res, 500, { error: err.message || "KV write error" });
    }
  }

  return send(res, 405, { error: "Method not allowed" });
}
