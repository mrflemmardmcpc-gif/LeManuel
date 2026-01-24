import { put } from "@vercel/blob";

export const config = { runtime: "nodejs18.x" };

const send = (res, status, payload) => {
  res.status(status).setHeader("content-type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
};

const parseDataUrl = (dataUrl) => {
  const match = /^data:(.+);base64,(.+)$/.exec(dataUrl || "");
  if (!match) return null;
  const [, mime, b64] = match;
  return { mime, b64 };
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
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed" });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return send(res, 500, { error: "BLOB_READ_WRITE_TOKEN missing" });

  let payload;
  try {
    payload = await readJson(req);
  } catch (err) {
    return send(res, 400, { error: "Invalid JSON body" });
  }

  const { dataUrl, filename } = payload || {};
  const parsed = parseDataUrl(dataUrl);
  if (!parsed) return send(res, 400, { error: "dataUrl must be a base64 data URI" });

  const { mime, b64 } = parsed;
  const sizeBytes = Math.floor((b64.length * 3) / 4);
  if (sizeBytes > 450 * 1024) return send(res, 413, { error: "File too large (>450KB)" });

  const binary = Uint8Array.from(Buffer.from(b64, "base64"));
  const ext = (mime.split("/")[1] || "jpg").split(";")[0];
  const safeName = filename?.replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 80) || "image";
  const objectName = `uploads/${Date.now()}-${Math.random().toString(16).slice(2)}-${safeName}.${ext}`;

  try {
    const blob = await put(objectName, binary, {
      access: "public",
      contentType: mime,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return send(res, 200, { url: blob.url });
  } catch (err) {
    return send(res, 500, { error: err.message || "Upload failed" });
  }
}
