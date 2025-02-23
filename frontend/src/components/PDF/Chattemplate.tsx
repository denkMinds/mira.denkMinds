import { useRef, useEffect, useState } from "react";
import { Button } from "@components/ui/button";
import { useReactToPrint } from "react-to-print";
import { useQuery } from "convex/react";
import type { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useStore from "../../store/store";
import { Card, CardContent } from "../ui/card";
import ReactMarkdown from "react-markdown"; // Import react-markdown
import rehypeRaw from "rehype-raw"; // Import rehype-raw for raw HTML rendering

type Summary = {
	_id: Id<"summaries">;
	title: string;
	content: string;
	createdAt: string;
};

export function ChatTemplate() {
	const { _id } = useParams<{ _id: string }>();
	const templateRef = useRef<HTMLDivElement>(null);
	const [chatSummary, setChatSummary] = useState<Summary | null>(null);
	const user = useStore((state) => state.user);

	if (!user) return null;

	const fetchedSummary = useQuery(api.summaries.getSummariesByUserId, {
		userId: String(user.id),
	}) as Summary[];

	const navigate = useNavigate();

	useEffect(() => {
		if (fetchedSummary) {
			const foundSummary = fetchedSummary.find(
				(summary) => summary._id === _id,
			);
			setChatSummary(foundSummary || null);
		}
	}, [fetchedSummary, _id]);

	const handlePrint = useReactToPrint({
		contentRef: templateRef,
		documentTitle: chatSummary?.title || "Security Report",
		onBeforePrint: () => {
			return Promise.resolve();
		},
		onAfterPrint: () => {},
	});

	return (
		<div className="relative p-8">
			<div className="flex justify-between items-center absolute top-4 left-4 right-4">
				<Button variant="outline" onClick={() => navigate(-1)}>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Files
				</Button>
				<Button onClick={handlePrint} variant="outline">
					Download to PDF
				</Button>
			</div>

			<Card className="max-w-[850px] mx-auto bg-white">
				<CardContent ref={templateRef} className="p-8">
					<div className="flex justify-between items-center border-b border-gray-200 pb-4">
						<span className="text-sm font-medium text-gray-600">
							denkMinds
						</span>
						<div className="text-sm text-gray-500">
							https://denkminds.vercel.app
						</div>
					</div>

					{/* Title Section */}
					<div className="my-8">
						<h1 className="text-2xl font-semibold text-gray-900 mb-6">
							{/* {chatSummary?.title } */}
							ChatSummary
						</h1>
						<div className="text-sm text-gray-600 space-y-1">
							<p>Generated by: {user.username}</p>
							<p>Date: {new Date().toLocaleDateString()}</p>
						</div>
					</div>

					{/* Chat Summary Section */}
					<div className="mt-8 print-content">
						{chatSummary ? (
							<>
								<div className="space-y-4">
									{/* Render markdown content */}
									<ReactMarkdown rehypePlugins={[rehypeRaw]}>
										{chatSummary.content}
									</ReactMarkdown>
								</div>

								<div className="text-xs text-gray-500 mt-4">
									Report generated on:{" "}
									{new Date(
										chatSummary.createdAt,
									).toLocaleString()}
								</div>
							</>
						) : (
							<p>Loading chat summary...</p>
						)}
					</div>

					{/* Footer */}
					<div className="mt-12 pt-4 border-t border-gray-200">
						<div className="flex justify-between items-center text-xs text-gray-500">
							<p>© 2025 denkMinds. All rights reserved.</p>
							<div className="flex items-center gap-4">
								<span className="uppercase font-medium">
									Sensitive
								</span>
								<span>Page 1 of 1</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
