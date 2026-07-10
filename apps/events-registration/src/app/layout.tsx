import type { Metadata } from "next";
import { Unbounded, Space_Grotesk, Anton } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@repo/ui/lenisProvider";
import { ClientComponent } from "../components/clientComponent";
import { Cursor } from "../components/fx/Cursor";
import { Toaster } from "react-hot-toast";

/* Display face — mapped onto the shared --font-rakkas slot so every
   font-title usage across shared packages picks it up. */
const unbounded = Unbounded({
	subsets: ["latin"],
	weight: ["400", "500", "700", "900"],
	variable: "--font-rakkas",
});

/* Body face — mapped onto the shared --font-inter slot. */
const grotesk = Space_Grotesk({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-inter",
});

/* Condensed poster face — massive lineup-poster headline stacks. */
const anton = Anton({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-poster",
});

export const metadata: Metadata = {
	title: "Antaragni '26 — Events & Roadtrips | IIT Kanpur",
	description:
		"The 61st edition of Antaragni, the annual cultural festival of IIT Kanpur. Compete, perform, belong.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${unbounded.variable} ${grotesk.variable} ${anton.variable} antialiased`}
			>
				<Cursor />
				<Toaster
					toastOptions={{
						style: {
							background: "#12091f",
							color: "#f4f1fa",
							border: "2px solid rgba(255,255,255,0.16)",
							boxShadow: "4px 4px 0 rgba(0,0,0,0.5)",
						},
					}}
				/>
				<LenisProvider>
					<ClientComponent>{children}</ClientComponent>
				</LenisProvider>
			</body>
		</html>
	);
}
