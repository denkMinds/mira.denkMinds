import axiosInstance from "./axios";

//login api
interface ChatPayload {
	prompt: string;
}
interface ScanPayload {
	website: string;
	selectedStandard: string;
}

const chat = async (payload: ChatPayload) => {
	const response = await fetch("http://localhost:8000/api/chat", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!response.body) {
		throw new Error("No response body");
	}

	return response.body; // Return the readable stream for processing
};
const scan = (payload: ScanPayload) => axiosInstance.post("/api/scan", payload);

export const chatApis = {
	chat,
	scan,
};
