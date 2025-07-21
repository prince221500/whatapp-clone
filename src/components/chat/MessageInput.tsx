import { useState, useRef, useEffect } from 'react'
import { Send, Smile, Paperclip, Mic } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'

interface MessageInputProps {
  onSendMessage: (content: string, replyTo?: string) => void
  onTyping: () => void
}

export default function MessageInput({ onSendMessage, onTyping }: MessageInputProps) {
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const emojiPickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [message])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    } else {
      onTyping()
    }
  }

  const handleEmojiClick = (emojiData: any) => {
    setMessage(prev => prev + emojiData.emoji)
    setShowEmojiPicker(false)
    textareaRef.current?.focus()
  }

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording)
    // TODO: Implement voice recording
  }

  return (
    <div className="bg-whatsapp-message-bg border-t border-gray-700 p-4">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div ref={emojiPickerRef} className="absolute bottom-20 left-4 z-50">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            theme="dark"
            width={350}
            height={400}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Attachment button */}
        <button
          type="button"
          className="p-2 text-whatsapp-gray hover:text-white hover:bg-gray-700 rounded-full transition-colors"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Message input container */}
        <div className="flex-1 relative">
          <div className="flex items-end bg-whatsapp-dark rounded-3xl border border-gray-600 focus-within:border-whatsapp-primary transition-colors">
            {/* Emoji button */}
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-3 text-whatsapp-gray hover:text-white transition-colors"
            >
              <Smile className="w-5 h-5" />
            </button>

            {/* Text input */}
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-white placeholder-whatsapp-gray resize-none outline-none py-3 pr-3 max-h-32 chat-input"
              rows={1}
            />
          </div>
        </div>

        {/* Send/Voice button */}
        {message.trim() ? (
          <button
            type="submit"
            className="p-3 bg-whatsapp-primary hover:bg-whatsapp-secondary text-white rounded-full transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleVoiceRecord}
            className={`p-3 rounded-full transition-colors ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-whatsapp-primary hover:bg-whatsapp-secondary text-white'
            }`}
          >
            <Mic className="w-5 h-5" />
          </button>
        )}
      </form>
    </div>
  )
}