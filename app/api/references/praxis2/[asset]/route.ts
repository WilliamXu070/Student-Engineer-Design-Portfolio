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
	rfp: {
		path: [
			"Context",
			"Praxis 2",
			"Addressing the Dexterity-Manipulability Gap Experienced by Amateur Astronomers in Cold Weather-1.pdf",
		],
		type: "application/pdf",
		filename: "Praxis-II-RFP.pdf",
	},
	beta: {
		path: ["Context", "Praxis 2", "BETA Release (1).pptx"],
		type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
		filename: "Praxis-II-Beta-Release.pptx",
	},
	showcase: {
		path: ["Context", "Praxis 2", "Showcase.docx"],
		type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		filename: "Praxis-II-Showcase.docx",
	},
	discord: {
		path: ["Context", "Praxis 2", "Discord Record.txt"],
		type: "text/plain; charset=utf-8",
		filename: "Praxis-II-Discord-Record.txt",
	},
	poster: {
		path: ["Context", "Praxis 2", "TH12_T04_440 - Poster Draft.png"],
		type: "image/png",
		filename: "Praxis-II-Poster-Draft.png",
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
