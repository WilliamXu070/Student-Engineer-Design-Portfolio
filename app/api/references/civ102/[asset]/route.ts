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
		path: ["Context", "CIV102", "CIV102 Project Team 202 Design Report.pdf"],
		type: "application/pdf",
		filename: "CIV102-Design-Report.pdf",
	},
	calculations: {
		path: ["Context", "CIV102", "CIV102 Project Team 202 Design Calculations.pdf"],
		type: "application/pdf",
		filename: "CIV102-Design-Calculations.pdf",
	},
	assembly: {
		path: ["Context", "CIV102", "CIV102 Project Team 202 Engineering Assembly.pdf"],
		type: "application/pdf",
		filename: "CIV102-Engineering-Assembly.pdf",
	},
	drawings: {
		path: ["Context", "CIV102", "Drawings for Final Design.pdf"],
		type: "application/pdf",
		filename: "CIV102-Final-Design-Drawings.pdf",
	},
	"3d-drawing": {
		path: ["Context", "CIV102", "3-D drawing.pdf"],
		type: "application/pdf",
		filename: "CIV102-3D-Drawing.pdf",
	},
	"performance-summary": {
		path: ["Context", "CIV102", "UPDATED_PERFORMANCE_SUMMARY.txt"],
		type: "text/plain; charset=utf-8",
		filename: "CIV102-Updated-Performance-Summary.txt",
	},
	"bridge-testing-video": {
		path: ["Context", "CIV102", "Bridge Testing Video.MOV"],
		type: "video/quicktime",
		filename: "CIV102-Bridge-Testing-Video.MOV",
	},
	"build-review-video": {
		path: ["Context", "CIV102", "Build_Review.MOV"],
		type: "video/quicktime",
		filename: "CIV102-Build-Review.MOV",
	},
	"cross-section": {
		path: ["Context", "CIV102", "Final_Bridge_Cross_Section.png"],
		type: "image/png",
		filename: "CIV102-Final-Bridge-Cross-Section.png",
	},
	"loading-configuration": {
		path: ["Context", "CIV102", "LoadingConfiguration.png"],
		type: "image/png",
		filename: "CIV102-Loading-Configuration.png",
	},
	"splice-failure": {
		path: ["Context", "CIV102", "Splice Failure.jpg"],
		type: "image/jpeg",
		filename: "CIV102-Splice-Failure.jpg",
	},
	failure: {
		path: ["Context", "CIV102", "failure.png"],
		type: "image/png",
		filename: "CIV102-Failure.png",
	},
	"time-log": {
		path: ["Context", "CIV102", "Time_Log.png"],
		type: "image/png",
		filename: "CIV102-Time-Log.png",
	},
	"team-photo": {
		path: ["Context", "CIV102", "team_photo.jpg"],
		type: "image/jpeg",
		filename: "CIV102-Team-Photo.jpg",
	},
	"pugh-1": {
		path: ["Context", "CIV102", "Pugh1.png"],
		type: "image/png",
		filename: "CIV102-Pugh-1.png",
	},
	"pugh-2": {
		path: ["Context", "CIV102", "Pugh2.png"],
		type: "image/png",
		filename: "CIV102-Pugh-2.png",
	},
	"pugh-3": {
		path: ["Context", "CIV102", "Pugh3.png"],
		type: "image/png",
		filename: "CIV102-Pugh-3.png",
	},
	"pugh-4": {
		path: ["Context", "CIV102", "Pugh4.png"],
		type: "image/png",
		filename: "CIV102-Pugh-4.png",
	},
	"pugh-5": {
		path: ["Context", "CIV102", "Pugh5.png"],
		type: "image/png",
		filename: "CIV102-Pugh-5.png",
	},
	"pugh-6": {
		path: ["Context", "CIV102", "Pugh6.png"],
		type: "image/png",
		filename: "CIV102-Pugh-6.png",
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
