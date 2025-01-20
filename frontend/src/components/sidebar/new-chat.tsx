import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import useChatActionStore from "../../store/chatActions";

export function NewChat() {
	const navigate = useNavigate();
	const { clearStore } = useChatActionStore();

	const handleNewChat = () => {
		clearStore();
		navigate("/chatbot");
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton
					tooltip="New Chat"
					className="flex bg-secondary justify-center border border-sidebar"
					onClick={handleNewChat}
				>
					<Plus className="text-[#7156DB]" />
					<span className="text-[#7156DB]">New Chat</span>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
