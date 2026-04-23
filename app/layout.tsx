import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body className="bg-[#FFFAEB] text-slate-900">
        {children}
      </body>
    </html>
  );
}