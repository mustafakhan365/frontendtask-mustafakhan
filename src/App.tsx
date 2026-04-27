import { useEffect, useMemo, useState } from 'react'
import ChatListPanel from './components/ChatListPanel'
import ConversationPanel from './components/ConversationPanel'
import DetailsPanel from './components/DetailsPanel'
import HoneycombDock from './components/HoneycombDock'
import LeftSidebar from './components/LeftSidebar'
import TopNav from './components/TopNav'
import { fetchContactDetails, fetchConversationByContact, fetchInboxData } from './services/dashboardApi'
import {
  sectionOrder,
  type DashboardData,
  type LoadState,
  type NavFilter,
  type SectionKey,
} from './types/dashboard'

function App() {
  const [activeFilter, setActiveFilter] = useState<NavFilter>('my-inbox')
  const [activeContactId, setActiveContactId] = useState<number | null>(null)
  const [searchValue, setSearchValue] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [activeMenuTab, setActiveMenuTab] = useState('Inbox')
  const [selected, setSelected] = useState<SectionKey>('inbox')
  const handleTabChange = (tab: string) => setActiveMenuTab(tab)
  const [travellingTo, setTravellingTo] = useState<SectionKey | null>(null)
  const [panelReveal, setPanelReveal] = useState<Record<SectionKey, boolean>>({
    inbox: false,
    chat: false,
    details: false,
  })
  const [states, setStates] = useState<Record<SectionKey, LoadState>>({
    inbox: 'loading',
    chat: 'loading',
    details: 'loading',
  })
  const [data, setData] = useState<DashboardData>({
    inbox: [],
    chat: [],
    details: null,
  })

  const anyLoading = useMemo(
    () => sectionOrder.some((key) => states[key] !== 'ready'),
    [states],
  )

  const filteredInbox = useMemo(() => {
    const source = data.inbox
    if (!source.length) return source
    if (activeFilter === 'all') return source
    if (activeFilter === 'unassigned') return source.filter((item) => item.unread > 0)
    if (activeFilter === 'sales') return source.filter((_, idx) => idx % 2 === 0)
    if (activeFilter === 'support') return source.filter((_, idx) => idx % 2 === 1)
    return source.slice(0, 8)
  }, [data.inbox, activeFilter])

  const searchableList = useMemo(() => {
    const query = searchValue.trim().toLowerCase()
    if (!query) return filteredInbox
    return filteredInbox.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.preview.toLowerCase().includes(query),
    )
  }, [filteredInbox, searchValue])

  const fetchSection = async (key: SectionKey) => {
    setStates((prev) => ({ ...prev, [key]: 'loading' }))
    try {
      if (key === 'inbox') {
        const inbox = await fetchInboxData()
        setData((prev) => ({ ...prev, inbox }))
      }

      if (key === 'chat') {
        const chat = await fetchConversationByContact(1)
        setData((prev) => ({ ...prev, chat }))
      }

      if (key === 'details') {
        const details = await fetchContactDetails(1)
        if (details) {
          setData((prev) => ({ ...prev, details }))
        }
      }

      setStates((prev) => ({ ...prev, [key]: 'ready' }))
      setPanelReveal((prev) => ({ ...prev, [key]: true }))
    } catch {
      setStates((prev) => ({ ...prev, [key]: 'ready' }))
      setPanelReveal((prev) => ({ ...prev, [key]: true }))
    }
  }

  const openContact = async (contactId: number) => {
    setActiveContactId(contactId)
    setStates((prev) => ({ ...prev, chat: 'loading', details: 'loading' }))
    const [chat, details] = await Promise.all([
      fetchConversationByContact(contactId),
      fetchContactDetails(contactId),
    ])
    setData((prev) => ({
      ...prev,
      chat,
      details: details ?? prev.details,
    }))
    setStates((prev) => ({ ...prev, chat: 'ready', details: 'ready' }))
  }

  const onSendMessage = () => {
    const value = chatInput.trim()
    if (!value) return
    setData((prev) => ({
      ...prev,
      chat: [
        ...prev.chat,
        {
          id: Date.now(),
          from: 'agent',
          text: value,
          time: new Date().toTimeString().slice(0, 5),
        },
      ],
    }))
    setChatInput('')
  }

  useEffect(() => {
    let cancelled = false

    const withDelay = async (key: SectionKey, delayMs: number) => {
      await new Promise((resolve) => setTimeout(resolve, delayMs))
      if (cancelled) return
      await fetchSection(key)
    }

    withDelay('inbox', 350)
    withDelay('chat', 700)
    withDelay('details', 1050)

    return () => {
      cancelled = true
    }
  }, [])

  const onSelectHoneycomb = (key: SectionKey) => {
    setSelected(key)
    setTravellingTo(key)
    setTimeout(() => {
      setTravellingTo(null)
      setPanelReveal((prev) => ({ ...prev, [key]: true }))
    }, 700)
    if (states[key] !== 'ready') {
      fetchSection(key)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col gap-2 px-3 py-3">
      <TopNav activeTab={activeMenuTab} onTabChange={handleTabChange} />

      <main className="grid flex-1 gap-0 border border-slate-200 rounded-2xl overflow-hidden bg-white grid-cols-1 lg:grid-cols-[200px_240px_minmax(0,1fr)_250px] xl:grid-cols-[210px_250px_minmax(0,1fr)_238px]">
        <LeftSidebar
          panelVisible={panelReveal.inbox}
          activeFilter={activeFilter}
          statesInboxReady={states.inbox === 'ready'}
          filteredInbox={filteredInbox}
          activeContactId={activeContactId}
          onFilterChange={setActiveFilter}
          onOpenContact={openContact}
        />

        <ChatListPanel
          panelVisible={panelReveal.chat}
          isLoading={states.chat === 'loading'}
          activeContactId={activeContactId}
          searchValue={searchValue}
          list={searchableList}
          onSearchChange={setSearchValue}
          onOpenContact={openContact}
        />

        <ConversationPanel
          panelVisible={panelReveal.chat}
          isLoading={states.chat === 'loading'}
          activeContactId={activeContactId}
          searchableList={searchableList}
          messages={data.chat}
          chatInput={chatInput}
          onChatInputChange={setChatInput}
          onSendMessage={onSendMessage}
        />

        <DetailsPanel
          panelVisible={panelReveal.details}
          isLoading={states.details === 'loading'}
          details={data.details}
        />
      </main>

      <HoneycombDock
        anyLoading={anyLoading}
        selected={selected}
        travellingTo={travellingTo}
        states={states}
        onSelect={onSelectHoneycomb}
        sectionOrder={sectionOrder}
      />
    </div>
  )
}

export default App