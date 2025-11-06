import { useLoaderData } from 'react-router'
import { type Route } from './+types/root.ts'
import { type loader } from './__root.server.tsx'
import { GeneralErrorBoundary } from './components/error-boundary.tsx'
import Document from './components/shared-layout/Document.tsx'
import { useNonce } from './utils/nonce-provider.ts'
import rootLinkElements from './utils/providers/rootLinkElements.ts'
import portrait1 from '~/assets/jpg/portrait-01.jpg'

export const links: Route.LinksFunction = () => {
	return rootLinkElements
}
export { meta } from './__root.client.tsx'
export { headers, loader } from './__root.server.tsx'

export default function App() {
	const data = useLoaderData<typeof loader | null>()
	const nonce = useNonce()

	return (
		<Document nonce={nonce} honeyProps={data?.honeyProps}>
			<div className="flex h-screen flex-col justify-between">
				<div className="flex-1">
					<main className="grid h-full place-items-center">
						<h1 className="text-mega">This is Epic News</h1>
						<p className="text-base text-white md:text-lg lg:text-xl">
							Welcome to Epic News, where the latest developments in tech are
							found here!
						</p>
						<img
							className="h-60 w-60 rounded-full object-cover"
							src={portrait1}
							alt="Portrait1"
						/>
						<h2 className="mb-1 text-white">Bob Green</h2>
						<h3 className="text-gray-500">Senior Designer</h3>
						<button className="lg:text:xl rounded bg-red-500 px-4 py-2 font-bold text-white shadow-xl hover:cursor-pointer hover:bg-amber-500 md:text-lg">
							Breaking News
						</button>
					</main>
				</div>
			</div>
		</Document>
	)
}

export const ErrorBoundary = GeneralErrorBoundary
