import { type MetaFunction } from 'react-router'
import HeroCallToAction from '#app/components/organisms/Hero/HeroCallToAction.tsx'
import ParallaxBackground from '#app/components/organisms/Hero/ParallaxBackground.tsx'
import { TeamMemberCard } from '#app/root.tsx'
import heroImage from '~/assets/jpg/Hero-Image.jpg'
import portrait1 from '~/assets/jpg/portrait-01.jpg'
import portrait2 from '~/assets/jpg/portrait-02.jpg'
import portrait3 from '~/assets/jpg/portrait-03.jpg'
import logo from '~/assets/png/epic-news-logo-red.png'

export const meta: MetaFunction = () => [{ title: 'Epic News' }]

export default function Index() {
	return (
		<main className="w-full">
			<h1 className="text-mega mt-8 mb-0 text-center italic">Breaking News</h1>

			<div className="w-full py-4">
				<div className="w-full py-16">
					<HeroCallToAction
						image={heroImage}
						imageRight={true}
						hasBackgroundColour={true}
					>
						<div className="flex flex-col gap-8 px-8">
							<h2 className="text-h2 bold">Man believes the Sun is a Fake!</h2>
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
	)
}
