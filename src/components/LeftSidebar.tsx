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
  return (
    <aside className={`left-nav ${panelVisible ? 'pop-in' : ''}`}>
      <h2 className="nav-title">Inbox</h2>
      <ul className="nav-list">
        <li className={activeFilter === 'my-inbox' ? 'active' : ''}>
          <button type="button" onClick={() => onFilterChange('my-inbox')}>
            <span>
              <i className="dot-icon">✉</i>My Inbox
            </span>
          </button>
        </li>
        <li className={activeFilter === 'all' ? 'active' : ''}>
          <button type="button" onClick={() => onFilterChange('all')}>
            <span>
              <i className="dot-icon">👥</i>All
            </span>
            <small>28</small>
          </button>
        </li>
        <li className={activeFilter === 'unassigned' ? 'active' : ''}>
          <button type="button" onClick={() => onFilterChange('unassigned')}>
            <span>
              <i className="dot-icon">◉</i>Unassigned
            </span>
            <small>5</small>
          </button>
        </li>
      </ul>

      <p className="nav-section">Teams</p>
      <ul className="nav-list subtle">
        {teamItems.map((item) => {
          const value = item.label === 'Sales' ? 'sales' : 'support'
          return (
            <li key={item.label} className={activeFilter === value ? 'active' : ''}>
              <button type="button" onClick={() => onFilterChange(value)}>
                <span>
                  <i className="dot-icon">◎</i>
                  {item.label}
                </span>
                <small>{item.count}</small>
              </button>
            </li>
          )
        })}
      </ul>

      <p className="nav-section">Users</p>
      <ul className="user-mini-list">
        {!statesInboxReady
          ? Array.from({ length: 7 }).map((_, idx) => (
              <li className="skeleton-line mini" key={`mini-user-${idx}`} />
            ))
          : filteredInbox.slice(0, 8).map((item) => (
              <li key={`user-${item.id}`} className={activeContactId === item.id ? 'active' : ''}>
                <div className="avatar mini" style={{ background: `${item.color}33`, color: item.color }}>
                  {item.name[0]}
                </div>
                <button type="button" onClick={() => onOpenContact(item.id)} className="user-mini-button">
                  <span>{item.name}</span>
                  <small>{Math.max(1, item.unread)}</small>
                </button>
              </li>
            ))}
      </ul>
      <p className="nav-section">Channels</p>
      <div className="channel-pill">Fit4Life</div>
    </aside>
  )
}

export default LeftSidebar
