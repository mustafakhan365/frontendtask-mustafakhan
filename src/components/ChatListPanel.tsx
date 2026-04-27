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
    <section className={`overflow-hidden border-r border-slate-200 bg-white ${panelVisible ? 'animate-fade-rise' : ''}`}>
      <div className="flex h-12 items-center justify-between px-3">
        <strong className="text-lg font-semibold tracking-tight text-slate-900">Michael Johnson</strong>
        <button type="button" className="grid h-6 w-6 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500" aria-label="Edit">
          <SvgIcon path="M4 20h4l10-10-4-4L4 16v4zM12 6l4 4" />
        </button>
      </div>

      <div className="mx-3 mb-2 rounded-2xl border border-slate-200 px-2 py-1">
        <input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Chat"
          aria-label="Search chat list"
          className="w-full bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="mb-2 flex items-center justify-between px-3 text-xs text-slate-700 border-b border-slate-200 pb-2">
        <span>Open</span>
        <span>Newest</span>
      </div>

      <div className="grid gap-2 px-2 pb-3">
        {isLoading
          ? Array.from({ length: 10 }).map((_, idx) => (
              <div key={`chat-item-skeleton-${idx}`} className="h-12 rounded-2xl bg-slate-200/70 animate-shimmer" />
            ))
          : list.slice(0, 10).map((item) => (
              <article
                key={`row-${item.id}`}
                className={`relative grid grid-cols-[36px_1fr_auto] gap-3 items-center rounded-2xl border px-3 py-2 text-sm text-slate-900 ${
                  activeContactId === item.id ? 'border-slate-300 bg-slate-100' : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div
                  className="grid h-9 w-9 place-items-center rounded-full text-xs font-semibold"
                  style={{ background: `${item.color}2b`, color: '#2f3441' }}
                >
                  {item.name[0]}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900">{item.name}</h3>
                  <p className="truncate text-[0.7rem] leading-4 text-slate-500">{item.preview}</p>
                </div>
                <time className="text-[0.65rem] text-slate-400">{item.time}</time>
                <button
                  type="button"
                  className="absolute inset-0"
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
