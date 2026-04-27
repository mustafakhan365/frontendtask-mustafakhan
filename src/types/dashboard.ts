export type SectionKey = 'inbox' | 'chat' | 'details'
export type LoadState = 'idle' | 'loading' | 'ready'
export type NavFilter = 'my-inbox' | 'all' | 'unassigned' | 'sales' | 'support'

export type InboxItem = {
  id: number
  name: string
  preview: string
  time: string
  unread: number
  color: string
}

export type ChatMessage = {
  id: number
  from: 'agent' | 'customer'
  text: string
  time: string
}

export type ContactDetails = {
  assignee: string
  team: string
  firstName: string
  lastName: string
  phone: string
  email: string
  labels: string[]
  notes: string[]
}

export type DashboardData = {
  inbox: InboxItem[]
  chat: ChatMessage[]
  details: ContactDetails | null
}

export const sectionOrder: SectionKey[] = ['inbox', 'chat', 'details']

export const honeycombIcons: Record<SectionKey, string> = {
  inbox: '📥',
  chat: '💬',
  details: '📇',
}

export const targetClassMap: Record<SectionKey, string> = {
  inbox: 'move-inbox',
  chat: 'move-chat',
  details: 'move-details',
}

export const teamItems = [
  { label: 'Sales', count: 7 },
  { label: 'Customer Support', count: 16 },
] as const

export const fallbackChat: ChatMessage[] = [
  {
    id: 1,
    from: 'customer',
    text: "Hi, I recently joined Fit4Life and I'm trying to access my workout plan, but I can't login. Can you help?",
    time: '23:08',
  },
  {
    id: 2,
    from: 'agent',
    text: "Hello Olivia 👋 I'm Michael, your AI customer support assistant. Let's fix this quickly. Could you confirm the email address?",
    time: '23:10',
  },
  { id: 3, from: 'customer', text: "Yes, it's olivia.Mckinsey@gmail.com", time: '23:16' },
  {
    id: 4,
    from: 'agent',
    text: "Thanks! Looks like your reset wasn't completed. I've sent a new link - please check your inbox.",
    time: '23:18',
  },
]
