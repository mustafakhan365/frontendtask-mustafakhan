import type { InboxItem } from '../types/dashboard'
import SvgIcon from './SvgIcon'

type ChatListPanelProps = {
  panelVisible: boolean
  isLoading: boolean
  activeContactId: number | null
  searchValue: string
  list: InboxItem[]
  onSearchChange: (value: string) => void
  onOpenContact: (id: number) => void
}

function ChatListPanel({
  panelVisible,
  isLoading,
  activeContactId,
  searchValue,
  list,
  onSearchChange,
  onOpenContact,
}: ChatListPanelProps) {
  return (
    <section className={`chat-list pane ${panelVisible ? 'pop-in' : ''}`}>
      <div className="pane-header">
        <strong className="title-list">Michael Johnson</strong>
        <button type="button" className="icon-btn" aria-label="Edit">
          <SvgIcon path="M4 20h4l10-10-4-4L4 16v4zM12 6l4 4" />
        </button>
      </div>
      <div className="pane-search">
        <input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Chat"
          aria-label="Search chat list"
        />
      </div>
      <div className="list-filters">
        <span>Open</span>
        <span>Newest</span>
      </div>
      <div className="conversation-list">
        {isLoading
          ? Array.from({ length: 10 }).map((_, idx) => (
              <div className="skeleton-row" key={`chat-item-skeleton-${idx}`} />
            ))
          : list.slice(0, 10).map((item) => (
              <article key={`row-${item.id}`} className={activeContactId === item.id ? 'active-row' : ''}>
                <div className="avatar soft" style={{ background: `${item.color}2b`, color: '#2f3441' }}>
                  {item.name[0]}
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.preview}</p>
                </div>
                <time>{item.time}</time>
                <button
                  type="button"
                  className="row-link"
                  onClick={() => onOpenContact(item.id)}
                  aria-label={`Open ${item.name}`}
                />
              </article>
            ))}
      </div>
    </section>
  )
}

export default ChatListPanel
