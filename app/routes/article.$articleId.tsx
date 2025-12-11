import { type LoaderFunctionArgs, data, useLoaderData } from 'react-router'

export async function loader({ params }: LoaderFunctionArgs) {
	const { articleId } = params

	return data({ articleId })
}

export default function ArticlePage() {
	const { articleId } = useLoaderData<typeof loader>()

	return (
		<div className="container py-16">
			<h2 className="text-h2 pb-8">My amazing news article</h2>

			<p>Article ID: {articleId}</p>
		</div>
	)
}
