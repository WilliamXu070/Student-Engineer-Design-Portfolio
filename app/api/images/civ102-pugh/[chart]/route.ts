import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { join } from "node:path";
import { Readable } from "node:stream";

export const runtime = "nodejs";

const allowedCharts = new Set(["1", "2", "3", "4", "5", "6"]);

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ chart: string }> },
) {
	const { chart } = await params;

	if (!allowedCharts.has(chart)) {
		return new Response("Not found", { status: 404 });
	}

	const imagePath = join(process.cwd(), "Context", "CIV102", `Pugh${chart}.png`);
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
