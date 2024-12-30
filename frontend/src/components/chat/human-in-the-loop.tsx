import { Button } from "../ui/button";

interface HumanInTheLoopProps {
	onConfirm: (confirmType: string) => void;
	onCancel: () => void;
	// message?: string;
	confirmType?: string;
}

const HumanInTheLoop: React.FC<HumanInTheLoopProps> = ({
	onConfirm,
	onCancel,
	// message,
	confirmType,
}) => {
	return (
		<div className="flex flex-col mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-primary">
			{/* <p className="mb-4 font-semibold">{message}</p> */}
			<div className="flex space-x-4">
				<Button
					variant="secondary"
					size="lg"
					className="border"
					onClick={() => onConfirm(confirmType || "")}
				>
					Yes
				</Button>
				<Button
					size="lg"
					variant="destructive"
					type="button"
					onClick={onCancel}
				>
					No
				</Button>
			</div>
		</div>
	);
};

export { HumanInTheLoop };
