"use client"

import '../styles/main.scss';
import Providers from "./Provider";
import { QueryClient, QueryClientProvider } from 'react-query';



const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <QueryClientProvider client={queryClient}>
         <Providers>{children}</Providers>
      </QueryClientProvider>
      </body>
    </html>
  );
}
