import { data, Link, useLoaderData, type MetaFunction } from 'react-router'
import HeroCallToAction from '#app/components/organisms/Hero/HeroCallToAction.tsx'
import heroImage from '~/assets/jpg/Hero-Image.jpg'
import ArticleCard from '~/components/organisms/ArticleCard.tsx'
import { prisma } from '~/utils/db.server.ts'
import { getArticleImgSrc } from '~/utils/misc.tsx'

export const meta: MetaFunction = () => [{ title: 'Epic News' }]

export async function loader() {
	const latestArticle = await prisma.article.findFirst({
		where: { isPublished: true },
		orderBy: { publishedAt: 'desc' },
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { objectKey: true } },
		},
	})

	const techArticles = await prisma.article.findMany({
		where: {
			isPublished: true,
			category: { slug: 'technology' },
		},
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { objectKey: true } },
		},
	})

	const entertainmentArticles = await prisma.article.findMany({
		where: {
			isPublished: true,
			category: { slug: 'entertainment' },
		},
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { objectKey: true } },
		},
	})

	const businessArticles = await prisma.article.findMany({
		where: {
			isPublished: true,
			category: { slug: 'business' },
		},
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { objectKey: true } },
		},
	})

	return data({
		techArticles,
		entertainmentArticles,
		businessArticles,
		latestArticle,
	})
}

export default function Index() {
	const {
		latestArticle,
		techArticles,
		entertainmentArticles,
		businessArticles,
	} = useLoaderData<typeof loader>()
	const mainArticle = latestArticle

	return (
		<main className="w-full">
			<div className="w-full">
				<Link to={mainArticle ? `/article/${mainArticle.id}` : '#'}>
					<HeroCallToAction
						image={
							mainArticle?.images?.[0]?.objectKey
								? getArticleImgSrc(mainArticle.images[0].objectKey)
								: heroImage
						}
						imageRight={true}
						hasBackgroundColour={true}
					>
						<div className="flex flex-col gap-8 px-8">
							<h1 className="text-mega mt-2 mb-8 text-left text-white italic">
								Breaking News
							</h1>
							<h2 className="text-h2 text-left font-bold text-white">
								{mainArticle ? mainArticle.title : 'Welcome to Epic News'}
							</h2>
							<p className="text-left text-lg text-white">
								{mainArticle?.category?.name || 'General News'}
							</p>
						</div>
					</HeroCallToAction>
				</Link>
			</div>

			<div className="container py-4">
				<h2 className="mb-8 text-center text-5xl italic">
					Latest Technology News
				</h2>
				<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
					{techArticles.length > 0 ? (
						techArticles.map((article) => (
							<ArticleCard
								key={article.id}
								articleId={article.id}
								title={article.title}
								category={article.category?.name}
								objectKey={article.images[0]?.objectKey}
							/>
						))
					) : (
						<p>No Technology articles found</p>
					)}
				</div>
			</div>

			<div className="container py-4">
				<h2 className="mb-8 text-center text-5xl italic">Entertainment</h2>
				<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
					{entertainmentArticles.length > 0 ? (
						entertainmentArticles.map((article) => (
							<ArticleCard
								key={article.id}
								articleId={article.id}
								title={article.title}
								category={article.category?.name}
								objectKey={article.images[0]?.objectKey}
							/>
						))
					) : (
						<p>No Entertainment articles found</p>
					)}
				</div>
			</div>

			<div className="container py-4">
				<h2 className="mb-8 text-center text-5xl italic">Business</h2>
				<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
					{businessArticles.length > 0 ? (
						businessArticles.map((article) => (
							<ArticleCard
								key={article.id}
								articleId={article.id}
								title={article.title}
								category={article.category?.name}
								objectKey={article.images[0]?.objectKey}
							/>
						))
					) : (
						<p>No Business articles found</p>
					)}
				</div>
			</div>
		</main>
	)
}
