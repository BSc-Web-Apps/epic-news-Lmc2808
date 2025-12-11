type ArticleCard = {
	title: string
	category?: string
}

export default function ArticleCard({ title, category }: ArticleCard) {
	return (
		<div className="flex h-48 flex-col justify-between rounded-lg bg-red-900 p-4 transition-transform duration-200 hover:scale-105 hover:bg-red-800">
			<h3
				className="mb-2 line-clamp-2 text-lg font-bold text-white"
				title={title}
			>
				{title}
			</h3>
			{category && <p className="mt-auto text-sm text-gray-200">{category}</p>}
		</div>
	)
}
