import { useState } from 'react'
import { Bot, Send } from 'lucide-react'
import { askAIAssistant } from '../services/api'
import { useFarmer } from '../context/FarmerContext'

export default function AIAssistant() {
  const { profileId } = useFarmer()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!message.trim()) return

    const userMessage = message

    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        text: userMessage,
      },
    ])

    setMessage('')
    setLoading(true)

    try {
      const result = await askAIAssistant(
        userMessage,
        profileId
      )

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: result.answer,
        },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Sorry, I could not process your request.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Bot className="w-8 h-8 text-green-600" />
        <div>
          <h1 className="text-2xl font-bold">AI Farming Assistant</h1>
          <p className="text-gray-600">
            Ask farming questions and get AI-powered guidance.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-gray-500 text-center mt-10">
              Ask a question like:
              <br />
              <br />
              • How can I improve wheat yield?
              <br />
              • What causes yellow leaves?
              <br />
              • Best irrigation practices for rice?
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-green-100 ml-auto'
                  : 'bg-gray-100'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          ))}

          {loading && (
            <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
              Thinking...
            </div>
          )}
        </div>

        <div className="border-t p-4 flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask your farming question..."
            className="flex-1 border rounded-lg px-4 py-2"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend()
              }
            }}
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-lg flex items-center gap-2"
          >
            <Send size={18} />
            Send
          </button>
        </div>
      </div>
    </div>
  )
}