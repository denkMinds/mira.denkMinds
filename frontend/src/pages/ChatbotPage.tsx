import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import { ModeToggle } from "../components/theme/mode-toggle";

export default function ChatbotPage() {
	const [inputValue, setInputValue] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<div className="flex h-screen bg-background">
			{/* Sidebar */}
			<div className="w-64 border-r flex flex-col">
				<div className="p-4 border-b flex justify-between items-center">
					<h1 className="font-semibold">Chatbot Name</h1>
					<Button variant="ghost" size="icon" className="h-8 w-8">
						⚙️
					</Button>
				</div>

				<div className="p-4 space-y-2">
					<Button variant="outline" className="w-full justify-start">
						📖 Tutorial
					</Button>
					<Button className="w-full"> + New Chat</Button>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col">
				<header className="flex items-center justify-between p-4 border-b">
					<div className="flex items-center gap-4">
						<Button variant="ghost">← New Chat</Button>
						<span className="text-sm text-muted-foreground">
							Version
						</span>
					</div>
					<ModeToggle />
				</header>

				<ScrollArea className="flex-1 p-4">
					<div className="space-y-4 max-w-3xl mx-auto"/>
				</ScrollArea>

				<div className="p-4 border-t">
					<div className="max-w-3xl mx-auto space-y-4">
						<div className="flex gap-2">
							<label htmlFor="file-upload">
								<Button variant="outline" className="w-full">
									📂 Upload File
								</Button>
							</label>

							{/* Hidden file input */}
							<input
								id="file-upload"
								type="file"
								style={{ display: "none" }}
							/>
							<Button variant="outline" className="flex-1">
								🎤 Audio chat
							</Button>
							<Button variant="outline" className="flex-1">
								🌐 Translate
							</Button>
							<Button variant="outline" className="flex-1">
								📊 Get report
							</Button>
						</div>

						<form onSubmit={handleSubmit} className="flex gap-2">
							<Input
								placeholder="Ask me anything..."
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								className="flex-1"
							/>
							<Button type="submit" size="icon" variant="outline">
								⬆
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
