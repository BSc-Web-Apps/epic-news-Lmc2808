import { invariant } from '@epic-web/invariant'
import { type LoaderFunctionArgs, data, useLoaderData } from 'react-router'
import ArticleCard from '~/components/ArticleCard.tsx'
import { prisma } from '~/utils/db.server.ts'
import { toTitleCase } from '~/utils/stringUtils.ts'

export async function loader({ params }: LoaderFunctionArgs) {
	const { category } = params

	invariant(typeof category === 'string', 'Category not found')
	const categoryTitle = toTitleCase(category)

	const filteredArticles = await prisma.article.findMany({
		where: {
			category: {
				slug: category,
			},
		},
		select: {
			id: true,
			title: true,
			category: { select: { name: true } },
			images: { select: { id: true } },
		},
	})

	return data({ categoryTitle, filteredArticles })
}

export default function NewsCategoryPage() {
	const { categoryTitle, filteredArticles } = useLoaderData<typeof loader>()

	return (
		<div className="container py-16">
			<h2 className="text-h2 mb-8">{categoryTitle}</h2>

			<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
				{filteredArticles.map((article) => (
					<ArticleCard
						key={article.id}
						articleId={article.id}
						title={article.title}
						category={article.category?.name}
						objectKey={article.images[0]?.objectKey}
					/>
				))}
			</div>
		</div>
	)
}
