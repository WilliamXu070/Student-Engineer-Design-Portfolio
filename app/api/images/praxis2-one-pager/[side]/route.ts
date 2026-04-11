import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { join } from "node:path";
import { Readable } from "node:stream";

export const runtime = "nodejs";

const imageMap: Record<string, string> = {
	front: "Slide1.PNG",
	back: "Slide2.PNG",
};

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ side: string }> },
) {
	const { side } = await params;
	const filename = imageMap[side];

	if (!filename) {
		return new Response("Not found", { status: 404 });
	}

	const imagePath = join(process.cwd(), "Context", "Praxis 2", "1_pager", filename);
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
