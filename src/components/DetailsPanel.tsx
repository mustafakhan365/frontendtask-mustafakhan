import type { ContactDetails } from '../types/dashboard'

type DetailsPanelProps = {
  panelVisible: boolean
  isLoading: boolean
  details: ContactDetails | null
}

function DetailsPanel({ panelVisible, isLoading, details }: DetailsPanelProps) {
  return (
    <aside className={`details pane ${panelVisible ? 'pop-in' : ''}`}>
      <div className="pane-header">
        <strong className="title-details">Details</strong>
      </div>
      {isLoading || !details ? (
        <div className="details-skeleton">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={`details-skeleton-${idx}`} className="skeleton-line" />
          ))}
        </div>
      ) : (
        <div className="details-card">
          <section>
            <h4>Chat Data</h4>
            <p className="kv">
              <span>Assignee</span>
              <strong>{details.assignee}</strong>
            </p>
            <p className="kv">
              <span>Team</span>
              <strong>{details.team}</strong>
            </p>
          </section>
          <section>
            <h4>Contact Data</h4>
            <p className="kv">
              <span>First Name</span>
              <strong>{details.firstName}</strong>
            </p>
            <p className="kv">
              <span>Last Name</span>
              <strong>{details.lastName}</strong>
            </p>
            <p className="kv">
              <span>Phone</span>
              <strong>{details.phone}</strong>
            </p>
            <p className="kv">
              <span>Email</span>
              <strong>{details.email}</strong>
            </p>
            <p className="see-all">See all</p>
          </section>
          <section>
            <h4>Contact Labels</h4>
            <div className="chips">
              {details.labels.map((label) => (
                <span key={label}>{label}</span>
              ))}
              <span className="chip-add">＋</span>
            </div>
          </section>
          <section>
            <h4>Notes</h4>
            {details.notes.map((note, idx) => (
              <p className="note" key={`note-${idx}`}>
                {note}
              </p>
            ))}
          </section>
        </div>
      )}
    </aside>
  )
}

export default DetailsPanel
