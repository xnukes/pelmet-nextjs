import '../styles/global.css'
import React from "react";
import { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient, Hydrate } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NextUIProvider } from '@nextui-org/react';

const App = ({Component, pageProps}: AppProps) => {
	const [queryClient] = React.useState(() => new QueryClient())

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<NextUIProvider>
					<Component {...pageProps} />
				</NextUIProvider>
			</Hydrate>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export default App;
