import { useState, useEffect } from "react";

import {
	Folder,
	Home,
	MessageCircle,
	MoreHorizontal,
	Settings2,
	Trash2,
	// Share2,
	Copy,
	ScanBarcodeIcon,
	ScanText,
	LucideScanFace,
	Scan,
} from "lucide-react";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarSeparator,
	SidebarContent,
	SidebarGroupContent,
} from "@components/ui/sidebar";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { SidebarMenuBadge } from "@components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/store";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Chats } from "../../types/chats";
import {
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "../ui/sidebar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";

const ChatSkeleton = () => {
	return (
		<div className="animate-pulse">
			{[...Array(5)].map((_, i) => {
				const key = `skeleton-${i}`;
				return (
					<div key={key} className="flex items-center space-x-4 p-2">
						<div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700" />
						<div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
					</div>
				);
			})}
		</div>
	);
};

export default function NavContent() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const user = useStore((state) => state.user);
	if (!user) {
		return null;
	}
	const { id } = user;

	const recentChats = useQuery(api.chats.getChatsByUserId, {
		userId: String(id),
	});
	useEffect(() => {
		if (recentChats) {
			setIsLoading(false);
		}
	}, [recentChats]);

	return (
		<>
			<SidebarGroup>
				<SidebarMenu>
					{/* <SidebarMenuItem> */}
					{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
					{/* <a onClick={() => navigate("/dashboard")}>
							<SidebarMenuButton tooltip="Home">
								<Home className="h-4 w-4" />
								<span>Dashboard</span>
							</SidebarMenuButton>
						</a>
					</SidebarMenuItem> */}
					<Collapsible defaultOpen className="group/collapsible">
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton tooltip="Dashboard">
									<Home className="h-4 w-4" />
									<span>Dashboard</span>
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>
									{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
									<a onClick={() => navigate("/recent-scan")}>
										<SidebarMenuButton tooltip="Scans">
											<ScanText className="h-4 w-4" />
											<span>Scans</span>
										</SidebarMenuButton>
									</a>
								</SidebarMenuSub>
								{/* <SidebarMenuSub>
									
									<a onClick={() => navigate("/api-scan")}>
										<SidebarMenuButton tooltip="Api Scans">
											<span>Api Scans</span>
										</SidebarMenuButton>
									</a>
								</SidebarMenuSub> */}
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
					<SidebarMenuItem>
						{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
						<a onClick={() => navigate("/settings")}>
							<SidebarMenuButton tooltip="Settings">
								<Settings2 className="h-4 w-4" />
								<span>Settings</span>
							</SidebarMenuButton>
						</a>
					</SidebarMenuItem>
					<SidebarMenuItem>
						{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
						<a onClick={() => navigate("/reports")}>
							<SidebarMenuButton tooltip="Reports">
								<Folder className="h-4 w-4" />
								<span>Reports</span>
							</SidebarMenuButton>

							{/* Calculate Length of the no of reports array */}
							<SidebarMenuBadge>12</SidebarMenuBadge>
						</a>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroup>
			<SidebarSeparator />
			<SidebarGroup>
				<SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
				<SidebarContent className="h-[calc(100vh-280px)]">
					<SidebarGroupContent>
						<SidebarMenu>
							{isLoading ? (
								<ChatSkeleton />
							) : (
								recentChats?.map((chat: Chats) => (
									<SidebarMenuItem key={chat._id}>
										<SidebarMenuButton
											asChild
											className="w-full justify-between cursor-pointer"
											onClick={() => navigate(`/chatbot/${chat._id}`)}
										>
											<div className="flex items-center">
												<MessageCircle className="mr-2 h-4 w-4 shrink-0" />
												<span className="flex-grow truncate">{chat.title}</span>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															variant="ghost"
															size="sm"
															className="ml-auto h-8 w-8 p-0"
														>
															<MoreHorizontal className="h-4 w-4 ml-auto" />
															<span className="sr-only">Open menu</span>
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent
														align="end"
														className="w-[160px]"
													>
														<DropdownMenuItem
														// onClick={() =>
														// 	handleCopy(chat.id)
														// }
														>
															<Copy className="mr-2 h-4 w-4" />
															<span>Copy</span>
														</DropdownMenuItem>
														{/* <DropdownMenuItem
														// onClick={() =>
														// 	handleShare(chat.id)
														// }
														>
															<Share2 className="mr-2 h-4 w-4" />
															<span>Share</span>
														</DropdownMenuItem> */}
														<DropdownMenuSeparator />
														<DropdownMenuItem
															// onClick={() => handleDelete(chat.id)}
															className="text-red-600"
														>
															<Trash2 className="mr-2 h-4 w-4" />
															<span>Delete</span>
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))
							)}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarContent>
			</SidebarGroup>
		</>
	);
}
