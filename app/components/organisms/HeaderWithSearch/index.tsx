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
			<nav className="bg-secondary dark:bg-dark-secondary flex flex-wrap items-center justify-between gap-4 p-4 sm:flex-nowrap md:gap-4">
				<div className="flex items-center gap-4"></div>
				<Link to="/" className="flex w-20 items-center justify-center">
					<img src={logo} />
				</Link>

				<div className="m-5 flex flex-1 gap-8">
					<div className="m-5 ml-auto hidden max-w-sm flex-1 space-x-4 sm:block">
						<div className="container">
							<div className="border-muted-foreground/75 dark:border-dark-muted-foreground/75 flex flex-col items-center justify-around lg:flex-row lg:pb-8">
								<Link
									to="/about-us"
									prefetch="intent"
									className="text-secondary-foreground dark:text-dark-secondary-foreground flex flex-col items-start gap-6 py-8 font-bold lg:flex-row"
								>
									About us
								</Link>
								<Link
									to="/contact-us"
									prefetch="intent"
									className="text-secondary-foreground dark:text-dark-secondary-foreground flex flex-col items-start gap-6 py-8 font-bold lg:flex-row"
								>
									Contact Us
								</Link>
								<Link
									to="/news"
									prefetch="intent"
									className="text-secondary-foreground dark:text-dark-secondary-foreground flex flex-col items-start gap-6 py-8 font-bold lg:flex-row"
								>
									News
								</Link>
							</div>
						</div>
					</div>
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
