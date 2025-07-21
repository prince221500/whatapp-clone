import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { Message } from '../../types'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import { useChatStore } from '../../store/chatStore'

interface MessageListProps {
  messages: Message[]
  currentUserId: string
}

export default function MessageList({ messages, currentUserId }: MessageListProps) {
  const { typingUsers, currentConversation } = useChatStore()
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const { ref: bottomRef, inView } = useInView({
    threshold: 0,
    rootMargin: '0px 0px -100px 0px',
  })

  useEffect(() => {
    if (inView && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [messages, inView])

  const groupedMessages = messages.reduce((groups: Message[][], message, index) => {
    const prevMessage = messages[index - 1]
    const shouldGroup = prevMessage && 
      prevMessage.sender_id === message.sender_id &&
      new Date(message.created_at).getTime() - new Date(prevMessage.created_at).getTime() < 60000 // 1 minute

    if (shouldGroup && groups.length > 0) {
      groups[groups.length - 1].push(message)
    } else {
      groups.push([message])
    }

    return groups
  }, [])

  const conversationTypingUsers = typingUsers.filter(
    tu => tu.conversation_id === currentConversation?.id && tu.user_id !== currentUserId
  )

  return (
    <div 
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      {groupedMessages.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-1">
          {group.map((message, messageIndex) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwn={message.sender_id === currentUserId}
              showAvatar={messageIndex === group.length - 1}
              showTimestamp={messageIndex === group.length - 1}
            />
          ))}
        </div>
      ))}

      {conversationTypingUsers.length > 0 && (
        <TypingIndicator users={conversationTypingUsers} />
      )}

      <div ref={bottomRef} />
    </div>
  )
}