import { RiLinkedinBoxFill, RiTwitterXFill } from 'react-icons/ri'
import { useLoaderData, Outlet } from 'react-router'
import { ParallaxProvider } from 'react-scroll-parallax'
import { AuthenticityTokenProvider } from 'remix-utils/csrf/react'
import { type Route } from './+types/root.ts'
import { type loader } from './__root.server.tsx'
import { GeneralErrorBoundary } from './components/error-boundary.tsx'
import FooterLogoCentre from './components/organisms/Footer/FooterLogoCentre.tsx'
import HeaderWithSearch from './components/organisms/HeaderWithSearch'
import ParallaxBackground from './components/organisms/Hero/ParallaxBackground.tsx'
import Document from './components/shared-layout/Document.tsx'
import { useToast } from './components/toaster.tsx'
import { EpicToaster } from './components/ui/sonner.tsx'
import { ThemeSwitch, useTheme } from './routes/resources+/theme-switch.tsx'
import { useNonce } from './utils/nonce-provider.ts'
import rootLinkElements from './utils/providers/rootLinkElements.ts'
import heroImage from '~/assets/jpg/Hero-Image.jpg'
import portrait1 from '~/assets/jpg/portrait-01.jpg'
import portrait2 from '~/assets/jpg/portrait-02.jpg'
import portrait3 from '~/assets/jpg/portrait-03.jpg'
import logo from '~/assets/png/epic-news-logo-red.png'
import HeroCallToAction from '~/components/organisms/Hero/HeroCallToAction.tsx'

export const links: Route.LinksFunction = () => {
	return rootLinkElements
}
export { meta } from './__root.client.tsx'
export { headers, loader } from './__root.server.tsx'

interface TeamMemberCardProps {
	name: string
	role: string
	imgSrc: string
}

export function TeamMemberCard({ name, role, imgSrc }: TeamMemberCardProps) {
	return (
		<div className="w-fit rounded-lg bg-slate-800 p-8">
			<img
				src={imgSrc}
				alt="An employee"
				className="mx-auto h-64 w-64 rounded-full"
			/>

			<div className="pt-6">
				<h3 className="font-semi-bold text-center text-white">{name}</h3>
				<p className="pt-1 text-center text-slate-400">{role}</p>

				<div className="flex justify-center gap-4 pt-6 text-slate-400">
					<RiTwitterXFill />
					<RiLinkedinBoxFill />
				</div>
			</div>
		</div>
	)
}

export default function App() {
	const data = useLoaderData<typeof loader | null>()
	const nonce = useNonce()
	const theme = useTheme()
	useToast(data?.toast)

	return (
		<AuthenticityTokenProvider token={data?.csrfToken ?? 'invalid'}>
			<ParallaxProvider>
				<Document theme={theme} nonce={nonce} honeyProps={data?.honeyProps}>
					<div className="flex h-screen flex-col justify-between">
						<HeaderWithSearch />
						<div className="flex-1">
							<Outlet />
						</div>
						<div className="container flex justify-between pb-5">
							<ThemeSwitch userPreference={data?.requestInfo.userPrefs.theme} />
						</div>
						<FooterLogoCentre />
					</div>
					<EpicToaster
						closeButton
						position="bottom-right"
						theme={theme}
						expand
						richColors
						duration={5000}
					/>
				</Document>
			</ParallaxProvider>
		</AuthenticityTokenProvider>
	)
}
export const ErrorBoundary = GeneralErrorBoundary
