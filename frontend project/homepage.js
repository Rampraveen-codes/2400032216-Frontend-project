import "./globals.css";
import { QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

export const metadata = {
  title: "EduPlatform",
  description: "Learning management system"
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <div className="min-h-screen">
              <header className="bg-white shadow">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                  <h1 className="text-lg font-semibold text-indigo-600">EduPlatform</h1>
                  <nav>
                    <a className="mr-4" href="/">Home</a>
                    <a className="mr-4" href="/courses">Courses</a>
                    <a className="mr-4" href="/dashboard">Dashboard</a>
                  </nav>
                </div>
              </header>
              <main className="max-w-6xl mx-auto p-6">{children}</main>
            </div>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}