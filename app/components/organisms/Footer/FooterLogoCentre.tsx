import { Link, NavLink } from 'react-router'
import logo from '#app/assets/png/Epic-News-Logo-Red.png'
import SocialMediaButtons from '#app/components/molecules/SocialMediaButtons'
import { type FooterProps } from './FooterBasic'

const FooterLogoCentre = ({
	companyName = 'EPIC NEWS!',
	altText = 'Our company logo',
}: FooterProps) => {
	return (
		<footer className="dark:bg-dark-secondary bg-slate-700 lg:py-16">
			<div className="container">
				<div className="border-muted-foreground/75 dark:border-dark-muted-foreground/75 grid grid-cols-3 items-center border-b lg:pb-8">
					<div className="flex flex-col items-start justify-center gap-6 py-8 font-bold text-white lg:flex-row">
						<NavLink to="/news/technology" className="text-white">
							Technology
						</NavLink>
						<NavLink to="/news/entertainment" className="text-white">
							Entertainment
						</NavLink>
						<NavLink to="/news/business" className="text-white">
							Business
						</NavLink>
					</div>

					<div className="flex justify-center">
						<Link to="/" className="flex w-20 items-center justify-center">
							<img src={logo} alt={altText} />
						</Link>
					</div>

					<div className="flex flex-col items-start justify-center gap-6 py-8 font-bold text-white lg:flex-row">
						<NavLink to="/news/technology" className="text-white">
							Technology
						</NavLink>
						<NavLink to="/news/entertainment" className="text-white">
							Entertainment
						</NavLink>
						<NavLink to="/news/business" className="text-white">
							Business
						</NavLink>
					</div>
				</div>

				<div className="flex items-center justify-center py-8">
					<div className="block">
						<div className="mb-8 flex justify-center">
							<SocialMediaButtons />
						</div>
						<div className="foreground/75 dark:text-dark-secondary-foreground/75 text-center text-white">
							{companyName} | {new Date().getFullYear()}
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default FooterLogoCentre
