'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const buttonOptions = [
  { option: 'All cabins', filter: 'all' },
  { option: '1—3 guests', filter: 'small' },
  { option: '4—7 guests', filter: 'medium' },
  { option: '8—12 guests', filter: 'large' },
]

function Filter() {
  const searchParmas = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const activeFilter = searchParmas.get('capacity') ?? 'all'
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParmas)
    params.set('capacity', filter)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="border border-primary-800 flex">
      {buttonOptions.map((button) => (
        <Button
          filter={button.filter}
          handleFilter={handleFilter}
          activeFilter={activeFilter}
          key={button.filter}
        >
          {button.option}
        </Button>
      ))}
    </div>
  )
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  )
}

export default Filter
