import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./context/auth.context.tsx";
import { Provider } from "react-redux";
import store from "./store.ts";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			refetchOnWindowFocus: false,
		},
		mutations: {},
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Provider store={store}>
					<App />
				</Provider>
			</AuthProvider>
		</QueryClientProvider>
	</StrictMode>
);
