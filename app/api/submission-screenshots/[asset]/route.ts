import { createReadStream, existsSync } from "fs";
import path from "path";
import { Readable } from "stream";

import { NextResponse } from "next/server";

const SCREENSHOTS: Record<string, string> = {
	home: "home.png",
	"project-cards": "projects-open.png",
	"position-scroll": "scrolled.png",
	"ctmf-view": "mid.png",
};

export const GET = async (
	_request: Request,
	{ params }: { params: Promise<{ asset: string }> },
) => {
	const { asset } = await params;
	const fileName = SCREENSHOTS[asset];

	if (!fileName) {
		return new NextResponse("Screenshot not found.", { status: 404 });
	}

	const filePath = path.join(process.cwd(), fileName);

	if (!existsSync(filePath)) {
		return new NextResponse("Screenshot file missing.", { status: 404 });
	}

	const stream = createReadStream(filePath);

	return new NextResponse(Readable.toWeb(stream) as BodyInit, {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
};
