import { RiLinkedinBoxFill, RiTwitterXFill } from 'react-icons/ri'
import { useLoaderData } from 'react-router'
import { ParallaxProvider } from 'react-scroll-parallax'
import { type Route } from './+types/root.ts'
import { type loader } from './__root.server.tsx'
import { GeneralErrorBoundary } from './components/error-boundary.tsx'
import FooterLogoCentre from './components/organisms/Footer/FooterLogoCentre.tsx'
import HeaderWithSearch from './components/organisms/HeaderWithSearch'
import ParallaxBackground from './components/organisms/Hero/ParallaxBackground.tsx'
import Document from './components/shared-layout/Document.tsx'
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

	return (
		<ParallaxProvider>
			<Document theme={theme} nonce={nonce} honeyProps={data?.honeyProps}>
				<div className="flex h-screen flex-col justify-between">
					<HeaderWithSearch />
					<div className="flex-1">
						<main className="w-full">
							<h1 className="text-mega mt-8 mb-0 text-center italic">
								Breaking News
							</h1>

							<div className="w-full py-4">
								<div className="w-full py-16">
									<HeroCallToAction
										image={heroImage}
										imageRight={true}
										hasBackgroundColour={true}
									>
										<div className="flex flex-col gap-8 px-8">
											<h2 className="text-h2 bold">
												Man believes the Sun is a Fake!
											</h2>
											<p className="text-lg">
												Keep up to date with the latest tech news.
											</p>
										</div>
									</HeroCallToAction>
								</div>
							</div>

							<ParallaxBackground
								title="Epic News"
								image={heroImage}
								logo={logo}
								altText="Martial arts training background"
							>
								<div className="mt-10 text-center">
									<button className="bg-secondary hover:bg-secondary-dark rounded-lg px-6 py-3 text-white shadow-md">
										Join Us Today
									</button>
								</div>
							</ParallaxBackground>

							<h1 className="mt-8 mb-8 text-center text-3xl italic">
								Meet Our Pundits
							</h1>
							<div className="flex justify-center gap-4">
								<TeamMemberCard
									name="Ben Green"
									role="Trainee Assistant to Assistant"
									imgSrc={portrait2}
								/>
								<TeamMemberCard
									name="Theodore Ruth"
									role="Junior Assistant"
									imgSrc={portrait1}
								/>
								<TeamMemberCard
									name="Jimmy Smith"
									role="Assistant to the Assistant Manager"
									imgSrc={portrait3}
								/>
							</div>
						</main>
					</div>
					<div className="container flex justify-between pb-5">
						<ThemeSwitch userPreference={data?.requestInfo.userPrefs.theme} />
					</div>
					<FooterLogoCentre />
				</div>
			</Document>
		</ParallaxProvider>
	)
}
export const ErrorBoundary = GeneralErrorBoundary
