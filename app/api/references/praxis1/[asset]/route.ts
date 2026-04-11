import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { join } from "node:path";
import { Readable } from "node:stream";

export const runtime = "nodejs";

const assetMap: Record<
	string,
	{
		path: string[];
		type: string;
		filename: string;
	}
> = {
	report: {
		path: ["Context", "Praxis 1", "An Acoustically Optimized Soda-Can Opening Design (1).pdf"],
		type: "application/pdf",
		filename: "Praxis-I-Design-Report.pdf",
	},
	"alpha-release": {
		path: ["Context", "Praxis 1", "Alpha Release.pptx"],
		type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
		filename: "Praxis-I-Alpha-Release.pptx",
	},
	converging: {
		path: ["Context", "Praxis 1", "Converging.docx"],
		type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		filename: "Praxis-I-Converging.docx",
	},
	reflection: {
		path: ["Context", "Praxis 1", "xuwill10-PA (1).pdf"],
		type: "application/pdf",
		filename: "Praxis-I-Reflection.pdf",
	},
	annotated: {
		path: ["Context", "Praxis 1", "annotated.png"],
		type: "image/png",
		filename: "Praxis-I-Annotated-CAD.png",
	},
	pairwise: {
		path: ["Context", "Praxis 1", "Pairwise.png"],
		type: "image/png",
		filename: "Praxis-I-Pairwise-Matrix.png",
	},
	"pugh-1": {
		path: ["Context", "Praxis 1", "PughChart1.png"],
		type: "image/png",
		filename: "Praxis-I-Pugh-Chart-1.png",
	},
	"pugh-2": {
		path: ["Context", "Praxis 1", "PughChart2.png"],
		type: "image/png",
		filename: "Praxis-I-Pugh-Chart-2.png",
	},
};

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ asset: string }> },
) {
	const { asset } = await params;
	const target = assetMap[asset];

	if (!target) {
		return new Response("Not found", { status: 404 });
	}

	const filePath = join(process.cwd(), ...target.path);
	const fileStats = await stat(filePath);
	const stream = createReadStream(filePath);

	return new Response(Readable.toWeb(stream) as ReadableStream, {
		headers: {
			"Content-Length": String(fileStats.size),
			"Content-Type": target.type,
			"Content-Disposition": `attachment; filename="${target.filename}"`,
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
}
