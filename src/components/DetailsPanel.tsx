import type { ContactDetails } from '../types/dashboard'

type DetailsPanelProps = {
  panelVisible: boolean
  isLoading: boolean
  details: ContactDetails | null
}

function DetailsPanel({ panelVisible, isLoading, details }: DetailsPanelProps) {
  return (
    <aside className={`overflow-hidden border-slate-200 bg-white ${panelVisible ? 'animate-fade-rise' : ''}`}>
      <div className="flex h-12 items-center justify-between px-3">
        <strong className="text-base font-semibold tracking-tight text-slate-900">Details</strong>
      </div>

      {isLoading || !details ? (
        <div className="grid gap-2 p-3">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={`details-skeleton-${idx}`} className="h-3 rounded-2xl bg-slate-200/70 animate-shimmer" />
          ))}
        </div>
      ) : (
        <div className="grid gap-3 p-3">
          <section>
            <h4 className="mb-2 text-sm font-semibold text-slate-900">Chat Data</h4>
            <div className="space-y-2 border-b border-slate-200 pb-3 text-xs text-slate-500">
              <p className="flex items-center justify-between gap-3">
                <span>Assignee</span>
                <strong className="text-slate-900 font-medium">{details.assignee}</strong>
              </p>
              <p className="flex items-center justify-between gap-3">
                <span>Team</span>
                <strong className="text-slate-900 font-medium">{details.team}</strong>
              </p>
            </div>
          </section>

          <section>
            <h4 className="mb-2 text-sm font-semibold text-slate-900">Contact Data</h4>
            <div className="space-y-2 border-b border-slate-200 pb-3 text-xs text-slate-500">
              <p className="flex items-center justify-between gap-3">
                <span>First Name</span>
                <strong className="text-slate-900 font-medium">{details.firstName}</strong>
              </p>
              <p className="flex items-center justify-between gap-3">
                <span>Last Name</span>
                <strong className="text-slate-900 font-medium">{details.lastName}</strong>
              </p>
              <p className="flex items-center justify-between gap-3">
                <span>Phone</span>
                <strong className="text-slate-900 font-medium">{details.phone}</strong>
              </p>
              <p className="flex items-center justify-between gap-3">
                <span>Email</span>
                <strong className="text-slate-900 font-medium">{details.email}</strong>
              </p>
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-900">See all</p>
          </section>

          <section>
            <h4 className="mb-2 text-sm font-semibold text-slate-900">Contact Labels</h4>
            <div className="flex flex-wrap gap-2">
              {details.labels.map((label) => (
                <span key={label} className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[0.65rem] text-sky-700">
                  {label}
                </span>
              ))}
              <span className="grid h-5 w-5 place-items-center rounded-full border border-slate-300 bg-white text-slate-500 text-[0.75rem]">＋</span>
            </div>
          </section>

          <section>
            <h4 className="mb-2 text-sm font-semibold text-slate-900">Notes</h4>
            <div className="space-y-2">
              {details.notes.map((note, idx) => (
                <p key={`note-${idx}`} className="rounded-2xl bg-amber-100 px-3 py-2 text-[0.8rem] text-slate-800">
                  {note}
                </p>
              ))}
            </div>
          </section>
        </div>
      )}
    </aside>
  )
}

export default DetailsPanel
