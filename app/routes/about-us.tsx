import { TeamMemberCard } from '#app/root.tsx'
import portrait1 from '~/assets/jpg/portrait-01.jpg'
import portrait2 from '~/assets/jpg/portrait-02.jpg'
import portrait3 from '~/assets/jpg/portrait-03.jpg'

export default function AboutUsRoute() {
	return (
		<div className="container py-8">
			<h1 className="mb-8 text-center text-3xl italic">Meet Our Pundits</h1>
			<div className="mt-8 flex justify-center gap-4">
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
		</div>
	)
}
