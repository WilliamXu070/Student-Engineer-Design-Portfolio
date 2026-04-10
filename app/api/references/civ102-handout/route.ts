import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { join } from "node:path";
import { Readable } from "node:stream";

export const runtime = "nodejs";

const pdfPath = join(process.cwd(), "Context", "CIV102", "CIV102-2025F-BDP-Handout-v2.pdf");

export async function GET() {
	const fileStats = await stat(pdfPath);
	const stream = createReadStream(pdfPath);

	return new Response(Readable.toWeb(stream) as ReadableStream, {
		headers: {
			"Content-Length": String(fileStats.size),
			"Content-Type": "application/pdf",
			"Content-Disposition": 'attachment; filename="CIV102-2025F-BDP-Handout-v2.pdf"',
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}
