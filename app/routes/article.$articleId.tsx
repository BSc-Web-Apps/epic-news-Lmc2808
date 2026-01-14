import { invariant } from '@epic-web/invariant'
import { type LoaderFunctionArgs, data, useLoaderData } from 'react-router'
import siteLogo from '#app/assets/png/Epic-News-Logo-Red.png'
import { prisma } from '~/utils/db.server.ts'
import { getArticleImgSrc } from '~/utils/misc'

export async function loader({ params }: LoaderFunctionArgs) {
	const { articleId } = params

	invariant(typeof articleId === 'string', 'No article ID provided')

	const article = await prisma.article.findUnique({
		where: { id: articleId },
		select: {
			id: true,
			title: true,
			content: true,
			category: { select: { name: true } },
			owner: { select: { name: true } },
			images: { select: { objectKey: true } },
		},
	})

	return data({ article })
}

const ArticleNotFound = () => {
	return (
		<div className="container flex h-full flex-1 flex-col items-center justify-center">
			<h2 className="text-h2 pb-8 text-center">No article found 🤔</h2>
			<p className="text-center text-xl">
				Please check the article ID in your browser and try again.
			</p>
		</div>
	)
}

export default function ArticlePage() {
	const { article } = useLoaderData<typeof loader>()

	if (!article) return <ArticleNotFound />

	const imageSrc = article.images[0]
		? getArticleImgSrc(article.images[0].objectKey)
		: siteLogo

	return (
		<div className="container py-16">
			<h2 className="text-h2 pb-8">{article.title}</h2>

			<img
				src={imageSrc}
				alt={article.title}
				className="mb-8 max-h-[375px] w-full rounded object-cover"
			/>

			<div className="mb-8 flex items-center gap-4 text-slate-800 italic">
				<p>{article.category?.name}</p>
				<p>By {article.owner?.name}</p>
			</div>

			<p className="text-lg leading-relaxed">{article.content}</p>
		</div>
	)
}
