import type { ZAPAlert } from "../types/zapAlerts";
import axios from "axios";
import { inferCompliance } from "../utils/complianceUtils";

const ZAP_BASE_URL = process.env.ZAP_BASE_URL;

export const spiderAndScan = async (
	targetUrl: string,
	complianceStandard: string,
): Promise<{ alerts: ZAPAlert[] }> => {
	try {
		// Start Spidering
		const spiderResponse = await axios.get(
			`${ZAP_BASE_URL}/JSON/spider/action/scan/`,
			{ params: { url: targetUrl, recurse: true } },
		);

		const spiderScanId = spiderResponse.data.scan;
		let spiderProgress = 0;

		while (spiderProgress < 100) {
			const spiderStatus = await axios.get(
				`${ZAP_BASE_URL}/JSON/spider/view/status/`,
				{ params: { scanId: spiderScanId } },
			);
			spiderProgress = Number(spiderStatus.data.status);
			await new Promise((resolve) => setTimeout(resolve, 5000));
		}

		const scanResponse = await axios.get(
			`${ZAP_BASE_URL}/JSON/ascan/action/scan/`,
			{ params: { url: targetUrl } },
		);

		const scanId = scanResponse.data.scan;
		let scanProgress = 0;

		while (scanProgress < 100) {
			const scanStatus = await axios.get(
				`${ZAP_BASE_URL}/JSON/ascan/view/status/`,
				{ params: { scanId } },
			);
			scanProgress = Number(scanStatus.data.status);
			await new Promise((resolve) => setTimeout(resolve, 5000));
		}

		// Fetch Alerts
		const alertsResponse = await axios.get(
			`${ZAP_BASE_URL}/JSON/core/view/alerts/`,
			{ params: { baseurl: targetUrl } },
		);

		const alerts: ZAPAlert[] = alertsResponse.data.alerts || [];

		const enrichedAlerts = alerts
			.map((alert) => {
				const compliance = inferCompliance(alert.cweid);
				return {
					...alert,
					complianceStandard: complianceStandard,
					complianceDetails: compliance[complianceStandard] || [
						"Uncategorized",
					],
				};
			})
			.filter((alert) => alert.complianceDetails[0] !== "Uncategorized");

		return { alerts: enrichedAlerts };
	} catch (error: unknown) {
		throw new Error("Failed to perform spider/scan");
	}
};
