import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { join } from "node:path";
import { Readable } from "node:stream";

export const runtime = "nodejs";

const videoPath = join(process.cwd(), "app", "Videos", "Praxis1_Water_Opener_Sound_Test.mp4");
const contentType = "video/mp4";

export async function GET(request: Request) {
  const fileStats = await stat(videoPath);
  const range = request.headers.get("range");

  if (range) {
    const [rangeStart, rangeEnd] = range.replace("bytes=", "").split("-");
    const start = Number(rangeStart);
    const end = rangeEnd ? Number(rangeEnd) : fileStats.size - 1;
    const stream = createReadStream(videoPath, { start, end });

    return new Response(Readable.toWeb(stream) as ReadableStream, {
      status: 206,
      headers: {
        "Content-Length": String(end - start + 1),
        "Content-Type": contentType,
        "Content-Range": `bytes ${start}-${end}/${fileStats.size}`,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Accept-Ranges": "bytes",
      },
    });
  }

  const stream = createReadStream(videoPath);

  return new Response(Readable.toWeb(stream) as ReadableStream, {
    headers: {
      "Content-Length": String(fileStats.size),
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "Accept-Ranges": "bytes",
    },
  });
}
