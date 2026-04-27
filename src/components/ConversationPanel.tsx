import type { ChatMessage, InboxItem } from '../types/dashboard'
import SvgIcon from './SvgIcon'

type ConversationPanelProps = {
  panelVisible: boolean
  isLoading: boolean
  activeContactId: number | null
  searchableList: InboxItem[]
  messages: ChatMessage[]
  chatInput: string
  onChatInputChange: (value: string) => void
  onSendMessage: () => void
}

function ConversationPanel({
  panelVisible,
  isLoading,
  activeContactId,
  searchableList,
  messages,
  chatInput,
  onChatInputChange,
  onSendMessage,
}: ConversationPanelProps) {
  return (
    <section className={`grid grid-rows-[49px_1fr_auto] overflow-hidden border-r border-slate-200 bg-white ${panelVisible ? 'animate-fade-rise' : ''}`}>
      <div className="flex h-12 items-center justify-between px-3">
        <strong className="text-lg font-semibold tracking-tight text-slate-900">
          {searchableList.find((x) => x.id === activeContactId)?.name ?? 'Olivia Mckinsey'}
        </strong>
        <div className="flex items-center gap-2">
          <button type="button" className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500" aria-label="More">
            <SvgIcon path="M12 5h.01M12 12h.01M12 19h.01" />
          </button>
          <button type="button" className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500" aria-label="Theme">
            <SvgIcon path="M18 15a6 6 0 1 1-9-9 7 7 0 0 0 9 9z" />
          </button>
          <button type="button" className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500" aria-label="Call">
            <SvgIcon path="M5 4h4l2 5-2 2a13 13 0 0 0 4 4l2-2 5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
          </button>
        </div>
      </div>

      <div className="grid gap-2 overflow-y-auto bg-slate-50 px-3 py-3">
        {isLoading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={`bubble-${idx}`}
                className={`h-12 w-[64%] rounded-2xl bg-slate-200/70 animate-shimmer ${idx % 2 === 0 ? '' : 'justify-self-end'}`}
              />
            ))
          : messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[64%] rounded-2xl p-3 animate-fade-rise ${
                  message.from === 'agent' ? 'justify-self-end bg-violet-100' : 'justify-self-start bg-slate-200'
                }`}
              >
                <p className="mb-1 text-sm leading-5 text-slate-900">{message.text}</p>
                <time className="text-[0.65rem] text-slate-400">{message.time}</time>
              </div>
            ))}
      </div>

      <div className="border-t border-slate-200 bg-white px-3 py-3">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => onChatInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSendMessage()
            }}
            placeholder={isLoading ? 'Loading conversation...' : 'Type something...'}
            disabled={isLoading}
            className="flex-1 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none disabled:cursor-not-allowed disabled:bg-slate-100"
          />
          <div className="flex gap-2">
            <button type="button" className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500" onClick={onSendMessage} aria-label="Send">
              <SvgIcon path="M3 12l18-9-6 18-2-7-10-2z" />
            </button>
            <button type="button" className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500" aria-label="Voice">
              <SvgIcon path="M12 4a3 3 0 0 1 3 3v5a3 3 0 1 1-6 0V7a3 3 0 0 1 3-3zM6 11a6 6 0 0 0 12 0M12 17v3M9 20h6" />
            </button>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <button type="button" className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500" aria-label="Image">
            <SvgIcon path="M4 6h16v12H4zM8 10h.01M6 16l4-4 3 3 2-2 3 3" />
          </button>
          <button type="button" className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500" aria-label="Video">
            <SvgIcon path="M4 7h11v10H4zM15 10l5-2v8l-5-2" />
          </button>
          <button type="button" className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500" aria-label="Emoji">
            <SvgIcon path="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM9 10h.01M15 10h.01M8 14a6 6 0 0 0 8 0" />
          </button>
          <button type="button" className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500" aria-label="Attach">
            <SvgIcon path="M8 12l5-5a3 3 0 1 1 4 4l-7 7a5 5 0 0 1-7-7l8-8" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default ConversationPanel
