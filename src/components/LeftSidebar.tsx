import { teamItems, type InboxItem, type NavFilter } from '../types/dashboard'

type LeftSidebarProps = {
  panelVisible: boolean
  activeFilter: NavFilter
  statesInboxReady: boolean
  filteredInbox: InboxItem[]
  activeContactId: number | null
  onFilterChange: (filter: NavFilter) => void
  onOpenContact: (id: number) => void
}

function LeftSidebar({
  panelVisible,
  activeFilter,
  statesInboxReady,
  filteredInbox,
  activeContactId,
  onFilterChange,
  onOpenContact,
}: LeftSidebarProps) {
  const optionClasses = (active: boolean) =>
    `flex w-full items-center justify-between gap-2 rounded-2xl px-3 py-2 text-left text-sm text-slate-900 ${
      active ? 'bg-slate-100' : 'hover:bg-slate-50'
    }`

  return (
    <aside className={`overflow-hidden border-r border-slate-200 bg-white ${panelVisible ? 'animate-fade-rise' : ''}`}>
      <div className="p-3">
        <h2 className="mb-3 text-[18px] font-semibold tracking-tight text-slate-900">Inbox</h2>
        <ul className="grid gap-2">
          <li>
            <button type="button" className={optionClasses(activeFilter === 'my-inbox')} onClick={() => onFilterChange('my-inbox')}>
              <span className="inline-flex items-center gap-2 text-sm">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[0.55rem] opacity-80">✉</span>
                My Inbox
              </span>
            </button>
          </li>
          <li>
            <button type="button" className={optionClasses(activeFilter === 'all')} onClick={() => onFilterChange('all')}>
              <span className="inline-flex items-center gap-2 text-sm">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[0.55rem] opacity-80">👥</span>
                All
              </span>
              <small className="text-[0.65rem] text-slate-500">28</small>
            </button>
          </li>
          <li>
            <button type="button" className={optionClasses(activeFilter === 'unassigned')} onClick={() => onFilterChange('unassigned')}>
              <span className="inline-flex items-center gap-2 text-sm">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[0.55rem] opacity-80">◉</span>
                Unassigned
              </span>
              <small className="text-[0.65rem] text-slate-500">5</small>
            </button>
          </li>
        </ul>
      </div>

      <div className="border-t border-slate-200 p-3">
        <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Teams</p>
        <ul className="grid gap-2">
          {teamItems.map((item) => {
            const value = item.label === 'Sales' ? 'sales' : 'support'
            return (
              <li key={item.label}>
                <button
                  type="button"
                  className={optionClasses(activeFilter === value)}
                  onClick={() => onFilterChange(value)}
                >
                  <span className="inline-flex items-center gap-2 text-sm">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[0.65rem] opacity-80">◎</span>
                    {item.label}
                  </span>
                  <small className="text-[0.65rem] text-slate-500">{item.count}</small>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="border-t border-slate-200 p-3">
        <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Users</p>
        <ul className="grid gap-2">
          {!statesInboxReady
            ? Array.from({ length: 7 }).map((_, idx) => (
                <li key={`mini-user-${idx}`} className="h-6 rounded-2xl bg-slate-200/70 animate-shimmer" />
              ))
            : filteredInbox.slice(0, 8).map((item) => (
                <li
                  key={`user-${item.id}`}
                  className={`grid grid-cols-[20px_1fr_auto] items-center gap-2 rounded-2xl px-3 py-2 text-xs text-slate-900 ${
                    activeContactId === item.id ? 'bg-slate-100' : 'hover:bg-slate-50'
                  }`}
                >
                  <div
                    className="grid h-7 w-7 place-items-center rounded-full text-xs font-semibold"
                    style={{ background: `${item.color}33`, color: item.color }}
                  >
                    {item.name[0]}
                  </div>
                  <button type="button" onClick={() => onOpenContact(item.id)} className="flex w-full items-center justify-between gap-2 p-0 text-left">
                    <span>{item.name}</span>
                    <small className="text-[0.65rem] text-slate-500">{Math.max(1, item.unread)}</small>
                  </button>
                </li>
              ))}
        </ul>
      </div>

      <div className="border-t border-slate-200 p-3">
        <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Channels</p>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">Fit4Life</div>
      </div>
    </aside>
  )
}

export default LeftSidebar
