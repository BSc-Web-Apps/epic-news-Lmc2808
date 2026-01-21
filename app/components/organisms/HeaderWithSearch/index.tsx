import { useMatches, Link } from 'react-router'
import logo from '#app/assets/png/Epic-News-Logo-Red.png'
import { SearchBar } from '#app/components/search-bar.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { UserDropdown } from '#app/components/user-dropdown.tsx'
import { useOptionalUser, userHasRole } from '#app/utils/user.ts'

export default function HeaderWithSearch() {
	const matches = useMatches()
	const isOnSearchPage = matches.find((m) => m.id === 'routes/users+/index')
	const searchBar = isOnSearchPage ? null : <SearchBar status="idle" />
	const user = useOptionalUser()
	const isAdminUser = user ? userHasRole(user, 'admin') : false

	return (
		<header className="mt-0 py-0">
			<nav className="dark:bg-dark-secondary flex h-26 flex-wrap items-center justify-between gap-4 bg-slate-700 p-6 sm:flex-nowrap md:gap-4">
				<div className="flex items-center gap-4"></div>
				<Link to="/" className="flex w-20 items-center justify-center">
					<img src={logo} />
				</Link>

				<div className="flex flex-1 items-center justify-center gap-6">
					{isAdminUser && (
						<Link
							to="/admin-review"
							className="rounded bg-slate-400 px-4 py-2 font-bold text-white hover:bg-red-800"
						>
							Admin Review
						</Link>
					)}
					<Link
						to="/about-us"
						prefetch="intent"
						className="rounded bg-slate-400 px-4 py-2 font-bold text-white hover:bg-slate-500"
					>
						About Us
					</Link>

					<Link
						to="/news/technology"
						prefetch="intent"
						className="rounded bg-slate-400 px-4 py-2 font-bold text-white hover:bg-slate-500"
					>
						Technology
					</Link>
					<Link
						to="/news/business"
						prefetch="intent"
						className="rounded bg-slate-400 px-4 py-2 font-bold text-white hover:bg-slate-500"
					>
						Business
					</Link>

					<Link
						to="/news/sports"
						prefetch="intent"
						className="rounded bg-slate-400 px-4 py-2 font-bold text-white hover:bg-slate-500"
					>
						Sports
					</Link>
				</div>

				{searchBar}

				<div className="flex items-center gap-10">
					{user ? (
						<UserDropdown />
					) : (
						<Button asChild variant="default" size="lg">
							<Link to="/login">Log In</Link>
						</Button>
					)}
				</div>
				<div className="block w-full sm:hidden">{searchBar}</div>
			</nav>
		</header>
	)
}
