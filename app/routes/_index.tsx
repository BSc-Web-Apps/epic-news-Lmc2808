import { data, useLoaderData, type MetaFunction } from 'react-router'
import HeroCallToAction from '#app/components/organisms/Hero/HeroCallToAction.tsx'
import { TeamMemberCard } from '#app/root.tsx'
import heroImage from '~/assets/jpg/Hero-Image.jpg'
import portrait1 from '~/assets/jpg/portrait-01.jpg'
import portrait2 from '~/assets/jpg/portrait-02.jpg'
import portrait3 from '~/assets/jpg/portrait-03.jpg'
import logo from '~/assets/png/epic-news-logo-red.png'
import ArticleCard from '~/components/organisms/ArticleCard.tsx'
import { prisma } from '~/utils/db.server.ts'

export const meta: MetaFunction = () => [{ title: 'Epic News' }]
export async function loader() {
	const allArticles = await prisma.article.findMany({
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { objectKey: true } },
		},
	})

	return data({ allArticles })
}

export default function Index() {
	const { allArticles } = useLoaderData<typeof loader>()

	return (
		<main className="w-full">
			<div className="w-full">
				<HeroCallToAction
					image={heroImage}
					imageRight={true}
					hasBackgroundColour={true}
				>
					<div className="flex flex-col gap-8 px-8">
						<h1 className="text-mega mt-2 mb-8 text-left text-white italic">
							Breaking News
						</h1>
						<h2 className="text-h2 text-left font-bold text-white">
							Man believes the Sun is a Fake!
						</h2>
						<p className="text-left text-lg text-white">
							Keep up to date with the latest tech news.
						</p>
					</div>
				</HeroCallToAction>
			</div>

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
			<div className="container py-16">
				<h2 className="text-h2 mb-8 font-normal">Latest news</h2>

				<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
					{allArticles.length > 0 ? (
						allArticles.map((article) => (
							<ArticleCard
								key={article.id}
								articleId={article.id}
								title={article.title}
								category={article.category?.name}
								objectKey={article.images[0]?.objectKey}
							/>
						))
					) : (
						<p>No articles found</p>
					)}
				</div>
			</div>
		</main>
	)
}
