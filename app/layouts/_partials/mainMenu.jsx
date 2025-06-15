"use client"

import Link from 'next/link'

export default function MainMenu({ menu, classes = "" }) {
  const closeMenuOnLinkClick = (e) => {
    const header = document.querySelector('header.header')
    header.classList.remove("is-menu-open")
  }

  return (
    <ul className={classes}>
      {menu.map(item => (
        <li key={item.page.id}>
          <Link className="font-medium uppercase sm:font-light sm:normal-case" onClick={closeMenuOnLinkClick} href={`/${item.page.slug}`}>{item.title ?? item.page.title}</Link>
        </li>),
      )}
    </ul>
  )
}
