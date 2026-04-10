import "./globals.css";
import { Providers } from "@/providers/Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<body className="antialiased">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
