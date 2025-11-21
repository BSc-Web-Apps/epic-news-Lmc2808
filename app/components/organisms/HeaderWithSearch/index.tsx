import { useMatches, Link } from 'react-router'
import logo from '#app/assets/png/Epic-News-Logo-Red.png'
import { SearchBar } from '#app/components/search-bar.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { UserDropdown } from '#app/components/user-dropdown.tsx'
import { useOptionalUser } from '#app/utils/user.ts'

export default function HeaderWithSearch() {
	const matches = useMatches()
	const isOnSearchPage = matches.find((m) => m.id === 'routes/users+/index')
	const searchBar = isOnSearchPage ? null : <SearchBar status="idle" />
	const user = useOptionalUser()

	return (
		<header className="mt-0 py-0">
			<nav className="bg-secondary dark:bg-dark-secondary flex flex-wrap items-center justify-between gap-4 p-10 sm:flex-nowrap md:gap-8">
				<div className="flex items-center gap-10"></div>
				<div className="flex items-center gap-4">
					<Link to="/" className="flex w-20 items-center justify-center">
						<img src={logo} />
					</Link>
				</div>
				<div className="ml-auto hidden max-w-sm flex-1 sm:block">
					{searchBar}
				</div>
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
