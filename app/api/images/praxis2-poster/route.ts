import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { join } from "node:path";
import { Readable } from "node:stream";

export const runtime = "nodejs";

const imagePath = join(process.cwd(), "Context", "Praxis 2", "TH12_T04_440 - Poster Draft.png");

export async function GET() {
  const fileStats = await stat(imagePath);
  const stream = createReadStream(imagePath);

  return new Response(Readable.toWeb(stream) as ReadableStream, {
    headers: {
      "Content-Length": String(fileStats.size),
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
