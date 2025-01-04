import { Button } from "../ui/button";

interface VulnerabilityStandardsProps {
	question?: string;
	actionPrompts: { id: string; name: string; type: string }[];
	onConfirm: (selectedStandard: string, type: string) => void;
}

const HumanInTheLoopOptions: React.FC<VulnerabilityStandardsProps> = ({
	question,
	actionPrompts,
	onConfirm,
}) => {
	return (
		<div className="flex flex-col mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-primary">
			<p className="mb-4 font-semibold">{question}</p>
			<div className="flex space-x-4">
				{actionPrompts.map((action) => (
					<Button
						key={action.id}
						variant="secondary"
						size="lg"
						className="border"
						onClick={() => onConfirm(action.name, action.type)}
					>
						{action.name}
					</Button>
				))}
			</div>
		</div>
	);
};

export { HumanInTheLoopOptions };
