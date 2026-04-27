import type { ChatMessage, ContactDetails, InboxItem } from '../types/dashboard'
import { fallbackChat } from '../types/dashboard'

const hues = ['#7c83ff', '#f5cd55', '#7fa5ff', '#ffaf7a', '#f5d66a', '#f2a387', '#8f7dff']

export async function fetchInboxData(): Promise<InboxItem[]> {
  const [usersRes, todosRes] = await Promise.all([
    fetch('https://dummyjson.com/users?limit=10'),
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10'),
  ])
  const usersJson: { users: Array<{ id: number; firstName: string; lastName: string }> } =
    await usersRes.json()
  const todosJson: Array<{ id: number; title: string; completed: boolean }> =
    await todosRes.json()

  return usersJson.users.map((user, index) => {
    const todo = todosJson[index]
    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName?.slice(0, 8) ?? ''}`.trim(),
      preview: todo?.title ?? 'New update waiting for review.',
      time: `${23 - Math.min(index, 8)}:${(20 + index).toString().padStart(2, '0')}`,
      unread: todo && !todo.completed && index < 5 ? index + 1 : 0,
      color: hues[index % hues.length],
    }
  })
}

export async function fetchConversationByContact(contactId: number): Promise<ChatMessage[]> {
  try {
    const [postsRes, commentsRes] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${contactId}&_limit=4`),
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${contactId}&_limit=4`),
    ])
    const postsJson: Array<{ id: number; body: string }> = await postsRes.json()
    const commentsJson: Array<{ id: number; body: string }> = await commentsRes.json()

    const combined: ChatMessage[] = []
    postsJson.forEach((post, idx) => {
      combined.push({
        id: post.id * 10,
        from: 'customer',
        text: post.body,
        time: `23:${(8 + idx * 2).toString().padStart(2, '0')}`,
      })
      if (commentsJson[idx]) {
        combined.push({
          id: commentsJson[idx].id * 10 + 1,
          from: 'agent',
          text: commentsJson[idx].body,
          time: `23:${(9 + idx * 2).toString().padStart(2, '0')}`,
        })
      }
    })

    return combined.length ? combined : fallbackChat
  } catch {
    return fallbackChat
  }
}

export async function fetchContactDetails(contactId: number): Promise<ContactDetails | null> {
  try {
    const [userRes, commentsRes] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${contactId}`),
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${contactId}&_limit=2`),
    ])
    const userJson: {
      name: string
      email: string
      phone: string
      company: { name: string }
    } = await userRes.json()
    const commentsJson: Array<{ body: string }> = await commentsRes.json()
    const [firstName = '', lastName = ''] = userJson.name.split(' ')

    return {
      assignee: 'James West',
      team: userJson.company.name,
      firstName,
      lastName,
      phone: userJson.phone,
      email: userJson.email,
      labels: ['Closed Won', 'Chicago'],
      notes: commentsJson.map((x) => x.body),
    }
  } catch {
    return null
  }
}
