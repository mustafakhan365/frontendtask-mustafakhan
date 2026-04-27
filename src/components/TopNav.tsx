import SvgIcon from './SvgIcon'

function TopNav() {
  return (
    <header className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 md:flex-nowrap md:gap-4">
      <div className="flex items-center gap-2 text-2xl font-semibold tracking-tight text-pink-500">
        <span className="text-base leading-none">◍</span>
        heyy
      </div>
      <nav className="flex flex-wrap items-center gap-2 flex-1">
        <a className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-1 text-xs text-slate-700 no-underline hover:bg-slate-200" href="#inbox">
          <SvgIcon path="M4 7h16v10H4zM4 9l8 5 8-5" />
          Inbox
        </a>
        <a className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-1 text-xs text-slate-700 no-underline hover:bg-slate-200" href="#contacts">
          <SvgIcon path="M7 18v-1a4 4 0 0 1 8 0v1M11 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6M16.5 9.5a2.5 2.5 0 1 0 0-5M18 18v-1a3 3 0 0 0-2-2.82" />
          Contacts
        </a>
        <a className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-1 text-xs text-slate-700 no-underline hover:bg-slate-200" href="#ai">
          <SvgIcon path="M12 4l2.2 2.2L17 7l-2 2 1 3h-8l1-3-2-2 2.8-.8L12 4zM8 14h8v4H8z" />
          AI Employees
        </a>
        <a className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-1 text-xs text-slate-700 no-underline hover:bg-slate-200" href="#workflows">
          <SvgIcon path="M4 6h6v4H4zM14 6h6v4h-6zM9 14h6v4H9zM10 8h4M12 10v4" />
          Workflows
        </a>
        <a className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-1 text-xs text-slate-700 no-underline hover:bg-slate-200" href="#campaigns">
          <SvgIcon path="M4 10l8-6 8 6v8H4zM9 18v-4h6v4" />
          Campaigns
        </a>
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
