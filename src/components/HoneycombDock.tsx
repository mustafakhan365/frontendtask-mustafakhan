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
    return <div className="h-0" />
  }

  return (
    <footer className="fixed bottom-3.5 right-3.5 z-20 w-[280px] rounded-[14px] border border-slate-300/70 bg-white/95 backdrop-blur-sm p-3 shadow-sm">
      <div className="mb-2 text-xs text-slate-500">Loading Navigator</div>
      <div className="flex gap-2">
        {sectionOrder.map((key) => (
          <button
            key={key}
            type="button"
            className={`hexagon grid h-[52px] w-[52px] place-items-center bg-slate-200 text-slate-700 transition duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.03] hover:brightness-105 ${
              selected === key ? 'bg-gradient-to-br from-violet-200 to-sky-300 text-slate-900 shadow-[0_8px_20px_rgba(96,165,250,0.35)] animate-outline-pulse' : ''
            } ${states[key] === 'loading' ? 'busy' : ''}`}
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
      <div className="mt-2 text-left text-xs text-slate-500 min-h-[18px]">
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
