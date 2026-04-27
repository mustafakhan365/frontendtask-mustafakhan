import SvgIcon from './SvgIcon'

type NavTab = {
  id: string
  label: string
  icon: string
}

type TopNavProps = {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navTabs: NavTab[] = [
  { id: 'Inbox', label: 'Inbox', icon: 'M4 7h16v10H4zM4 9l8 5 8-5' },
  { id: 'Contacts', label: 'Contacts', icon: 'M7 18v-1a4 4 0 0 1 8 0v1M11 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6M16.5 9.5a2.5 2.5 0 1 0 0-5M18 18v-1a3 3 0 0 0-2-2.82' },
  { id: 'AI Employees', label: 'AI Employees', icon: 'M12 4l2.2 2.2L17 7l-2 2 1 3h-8l1-3-2-2 2.8-.8L12 4zM8 14h8v4H8z' },
  { id: 'Workflows', label: 'Workflows', icon: 'M4 6h6v4H4zM14 6h6v4h-6zM9 14h6v4H9zM10 8h4M12 10v4' },
  { id: 'Campaigns', label: 'Campaigns', icon: 'M4 10l8-6 8 6v8H4zM9 18v-4h6v4' },
]

function TopNav({ activeTab, onTabChange }: TopNavProps) {
  return (
    <header className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 md:flex-nowrap md:gap-4">
      <div className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-pink-500">
        <span className="text-base leading-none">◍</span>
        heyy
      </div>
      <nav className="flex flex-wrap items-center gap-2 flex-1">
        {navTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`inline-flex items-center gap-2 rounded-2xl px-3 py-1 text-xs no-underline transition ${
              activeTab === tab.id
                ? 'bg-[#D8DEE4] text-slate-900 shadow-sm shadow-slate-300/20'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <SvgIcon path={tab.icon} />
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <button type="button" className="grid h-6 w-6 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-500" aria-label="Settings">
          <SvgIcon path="M12 8.5A3.5 3.5 0 1 1 12 15.5A3.5 3.5 0 0 1 12 8.5zM19 12l2-1-1-3-2 .2a7 7 0 0 0-1.5-1.5l.2-2-3-1-1 2a7 7 0 0 0-2 0l-1-2-3 1 .2 2A7 7 0 0 0 6.5 8L4.5 7.8l-1 3 2 1a7 7 0 0 0 0 2l-2 1 1 3 2-.2a7 7 0 0 0 1.5 1.5l-.2 2 3 1 1-2a7 7 0 0 0 2 0l1 2 3-1-.2-2a7 7 0 0 0 1.5-1.5l2 .2 1-3-2-1a7 7 0 0 0 0-2z" />
        </button>
        <button type="button" className="grid h-6 w-6 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-500" aria-label="Notifications">
          <SvgIcon path="M12 4a4 4 0 0 1 4 4v2.5l1.5 2.5H6.5L8 10.5V8a4 4 0 0 1 4-4zM10 18a2 2 0 0 0 4 0" />
        </button>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.7rem] text-slate-700">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-pink-500 text-[0.65rem] font-semibold text-white">M</span>
          <span>Michael Johnson</span>
        </div>
      </div>
    </header>
  )
}

export default TopNav
