import { honeycombIcons, targetClassMap, type LoadState, type SectionKey } from '../types/dashboard'

type HoneycombDockProps = {
  anyLoading: boolean
  selected: SectionKey
  travellingTo: SectionKey | null
  states: Record<SectionKey, LoadState>
  onSelect: (key: SectionKey) => void
  sectionOrder: SectionKey[]
}

function HoneycombDock({
  anyLoading,
  selected,
  travellingTo,
  states,
  onSelect,
  sectionOrder,
}: HoneycombDockProps) {
  if (!anyLoading) {
    return <div className="dock-spacer" />
  }

  return (
    <footer className="honeycomb-dock">
      <div className="dock-title">Loading Navigator</div>
      <div className="honeycomb-row">
        {sectionOrder.map((key) => (
          <button
            key={key}
            type="button"
            className={`honeycomb ${selected === key ? 'selected' : ''} ${states[key] === 'loading' ? 'busy' : ''}`}
            onClick={() => onSelect(key)}
          >
            <span>{honeycombIcons[key]}</span>
          </button>
        ))}
      </div>
      {travellingTo ? (
        <div className={`travelling-icon ${targetClassMap[travellingTo]}`}>
          <span>{honeycombIcons[travellingTo]}</span>
        </div>
      ) : null}
      <div className="content-loading">
        {states[selected] === 'loading' ? (
          <p>Loading {selected} content...</p>
        ) : (
          <p>{selected} section is ready</p>
        )}
      </div>
    </footer>
  )
}

export default HoneycombDock
