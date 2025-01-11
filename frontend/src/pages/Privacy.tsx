import type React from "react";

import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { ThemeProvider } from "../components/theme/theme-provider";

import MiraLogo from "../assets/MiraLogo.svg";

const PrivacyPolicy: React.FC = () => {
	const navigate = useNavigate(); // Initialize the navigate hook

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="p-6 bg-transparent text-black-800 font-sans">
				<div className="max-w-6xl mx-auto bg-transparent shadow-lg rounded-lg p-6">
					<div className="space-y-4">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
							Privacy Policy
						</h1>
						<p className="text-gray-500 dark:text-gray-400">
							Last updated: January 1, 2025
						</p>
					</div>

					<section className="mt-6 space-y-4">
						<p>
							At denkMinds, we value your privacy and are
							committed to protecting your personal information.
							This Privacy Policy outlines how we collect, use,
							store, and share your information when you interact
							with our products, services, and platforms. By using
							our services, you agree to the practices described
							in this policy.
						</p>

						<hr className="my-6 border-gray-300" />

						<h2 className="text-2xl font-bold tracking-tight">
							Information We Collect
						</h2>
						<p>
							We collect information to provide and improve our
							services. This includes:
						</p>
						<p className="text-gray-500 dark:text-gray-400">
							<strong>Information You Provide:</strong>
						</p>
						<ul className="list-disc pl-6">
							<li>
								Personal details, such as your name and email
								address, when you register or contact us.
							</li>
							<li>
								Feedback, inquiries, or other communications
								sent to us.
							</li>
						</ul>

						<section className="mt-6 space-y-4">
							<p className="text-gray-500 dark:text-gray-400">
								<strong>Third-Party Information:</strong>
							</p>
							<ul className="list-disc pl-6">
								<li>
									Data from partners or integrations you
									authorize, such as CRM tools or analytics
									platforms.
								</li>
							</ul>
						</section>

						<p className="text-gray-500 dark:text-gray-400">
							<strong>With Trusted Third Parties:</strong>
						</p>
						<ul className="list-disc pl-6">
							<li>
								Service providers that assist in our operations
								(e.g., hosting, analytics, or email
								communication).
							</li>
						</ul>
					</section>

					<hr className="my-6 border-gray-300" />

					<section className="mt-6 space-y-4">
						<h2 className="text-2xl font-bold tracking-tight">
							Sharing Your Data
						</h2>
						<p className="text-gray-500 dark:text-gray-400">
							<strong>For Legal Reasons:</strong>
						</p>
						<ul className="list-disc pl-6">
							<li>
								If required by law, regulation, or legal
								process.
							</li>
							<li>
								Partners in collaborative projects, only with
								relevant and necessary data.
							</li>
						</ul>
					</section>

					<hr className="my-6 border-gray-300" />

					<section className="mt-6 space-y-4">
						<h2 className="text-2xl font-bold tracking-tight">
							Data Storage and Security
						</h2>
						<p>
							We implement industry-standard security measures to
							protect your data, including encryption, access
							controls, and regular audits. However, no system is
							completely secure. While we strive to safeguard your
							information, we cannot guarantee its absolute
							security.
						</p>
					</section>

					<hr className="my-6 border-gray-300" />

					<section className="mt-6 space-y-4">
						<h2 className="text-2xl font-bold tracking-tight">
							Your Rights
						</h2>
						<p>You have the right to: </p>
						<ul className="list-disc pl-6">
							<li>
								<strong>Access and Update Your Data:</strong>{" "}
								Review or correct inaccuracies in your personal
								information.
							</li>
							<li>
								<strong>Request Deletion:</strong> Ask us to
								delete your data, subject to legal or
								contractual obligations.
							</li>
							<li>
								<strong>Withdraw Consent:</strong> Revoke your
								consent for processing, where applicable.
							</li>
						</ul>
						<p>
							To exercise these rights, contact us at{" "}
							<strong className="text-gray-500 dark:text-gray-400">
								denkminds@gmail.com
							</strong>
						</p>
					</section>

					<hr className="my-6 border-gray-300" />

					<section className="mt-6 space-y-4">
						<h2 className="text-2xl font-bold tracking-tight">
							Policy Updates
						</h2>
						<p>
							We may update this policy periodically to reflect
							changes in our practices or legal requirements. We
							will notify you of significant updates and encourage
							you to review this policy regularly.
						</p>
					</section>

					<hr className="my-6 border-gray-300" />

					<section className="mt-6 space-y-4">
						<h2 className="text-2xl font-bold tracking-tight">
							Contact Us
						</h2>
						<p>If you have questions, reach out to us at:</p>
						<ul className="list-disc pl-7">
							<li>
								<p>
									Email: <strong>denkminds@gmail.com</strong>
								</p>
							</li>
						</ul>
					</section>

					<hr className="my-6 border-gray-300" />

					<div className="flex flex-col items-center justify-center">
						<p className="text-center text-gray-500 dark:text-gray-400">
							Thank you for trusting denkMinds with your privacy.
						</p>
						<img
							src={MiraLogo}
							alt="Logo"
							className="w-7 h-7 mr-2 flex justify-center"
						/>
					</div>

					<div className="fixed top-4 left-4">
						<Button
							size="lg"
							type="button"
							onClick={() => navigate(-1)} // Use navigate(-1) for going back
							className="bg-transparent border border-white/50 backdrop-blur-md text-grey hover:bg-white/10 transition-all"
						>
							<ArrowLeft className="w-4 h-4 mr-2" />
							Back
						</Button>
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default PrivacyPolicy;
