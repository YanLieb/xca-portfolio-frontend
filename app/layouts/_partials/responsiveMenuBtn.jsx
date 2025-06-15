'use client'

export default function ResponsiveMenuBtn() {
	function toggleMenu() {
		const header = document.querySelector('.header')
		header.classList.toggle('is-menu-open')
	}
	
	return (
		 <div className="header__toggle-menu cursor-pointer flex flex-col gap-2 sm:hidden" onClick={toggleMenu}>
			 <span className="block w-8 h-1 bg-black transition-all duration-500 ease-in-out"></span>
			 <span className="block w-8 h-1 bg-black transition-all duration-500 ease-in-out"></span>
		 </div>
	)
}