import React, { useState, useRef, useEffect, useCallback } from 'react'
import config from '../config'

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState([
    { text: "Hello, I'm here to help you get answers to any Insurance-related question you have according to the policies offered by Faithful Insurance", sender: 'bot' },
    { text: "I'll connect you to an agent shortly", sender: 'bot' }
  ])
  const [position, setPosition] = useState({ x: 20, y: 90 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  
  const chatContainerRef = useRef(null)
  const chatHistoryRef = useRef(null)
  const inputRef = useRef(null)
  const headerRef = useRef(null)

  // Phone number for WhatsApp
  const phoneNumber = config.WHATSAPP_PHONE

  // Handle click outside to close chat
  const handleClickOutside = useCallback((e) => {
    if (isOpen && chatContainerRef.current && !chatContainerRef.current.contains(e.target)) {
      // Don't close if clicking on the chat icon
      if (!e.target.closest('.whatsapp-icon')) {
        setIsOpen(false)
      }
    }
  }, [isOpen])

  // Drag functionality with improved mouse handling
  const handleMouseDown = useCallback((e) => {
    if (!headerRef.current?.contains(e.target) || e.target.closest('.bi-x')) {
      return // Only drag from header, not from close button
    }
    
    e.preventDefault()
    setIsDragging(true)
    
    const rect = chatContainerRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return
    
    e.preventDefault()
    
    const newX = e.clientX - dragOffset.x
    const newY = e.clientY - dragOffset.y
    
    // Get viewport dimensions and chat container dimensions
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const chatWidth = 350
    const chatHeight = 400
    
    // Calculate boundaries (keep chat fully visible)
    const minX = 0
    const maxX = viewportWidth - chatWidth
    const minY = 0
    const maxY = viewportHeight - chatHeight
    
    setPosition({
      x: Math.max(minX, Math.min(newX, maxX)),
      y: Math.max(minY, Math.min(newY, maxY))
    })
  }, [isDragging, dragOffset])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Handle message input
  const handleInputChange = (e) => {
    setMessage(e.target.value)
  }

  // Toggle chat visibility
  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  // Send message to WhatsApp
  const sendToWhatsApp = () => {
    if (!message.trim()) return
    
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
    
    // Add to chat history
    setChatHistory(prev => [...prev, { text: message, sender: 'user' }])
    setMessage('')
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendToWhatsApp()
    }
  }

  // Click outside handler
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, handleClickOutside])

  // Global mouse events for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'grabbing'
      document.body.style.userSelect = 'none'
    } else {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  // Auto-scroll chat history
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight
    }
  }, [chatHistory])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const chatStyle = {
    position: 'fixed',
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: '350px',
    height: '400px',
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    display: isOpen ? 'flex' : 'none',
    flexDirection: 'column',
    zIndex: 996,
    cursor: isDragging ? 'grabbing' : 'default'
  }

  const iconStyle = {
    position: 'fixed',
    bottom: '80px',
    right: '10px',
    width: '50px',
    height: '50px',
    zIndex: 996,
    background: '#59CE72',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s',
    color: 'white',
    fontSize: '24px'
  }

  return (
    <>
      {/* Chat Icon */}
      <div 
        className="whatsapp-icon"
        style={iconStyle}
        onClick={toggleChat}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        <i className="bi bi-whatsapp"></i>
      </div>

      {/* Chat Container */}
      <div 
        ref={chatContainerRef}
        style={chatStyle}
      >
        {/* Chat Header */}
        <div 
          ref={headerRef}
          style={{
            padding: '15px',
            background: '#59CE72',
            color: 'white',
            borderRadius: '15px 15px 0 0',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            position: 'relative'
          }}
          onMouseDown={handleMouseDown}
        >
          <h3 style={{ margin: 0, fontSize: '16px', pointerEvents: 'none' }}>WhatsApp Chat Assistant</h3>
          <i 
            className="bi bi-x"
            style={{
              position: 'absolute',
              top: '10px',
              right: '15px',
              fontSize: '24px',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              zIndex: 1
            }}
            onClick={toggleChat}
          ></i>
        </div>

        {/* Chat History */}
        <div 
          ref={chatHistoryRef}
          style={{
            flex: 1,
            padding: '15px',
            overflowY: 'auto',
            maxHeight: '280px'
          }}
        >
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: '10px',
                padding: '8px 12px',
                borderRadius: '15px',
                maxWidth: '80%',
                background: msg.sender === 'user' ? '#4285f4' : '#f1f3f4',
                color: msg.sender === 'user' ? 'white' : 'black',
                marginLeft: msg.sender === 'user' ? 'auto' : '0',
                marginRight: msg.sender === 'user' ? '0' : 'auto'
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div style={{ padding: '15px', borderTop: '1px solid #ddd' }}>
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '14px'
            }}
          />
        </div>
      </div>
    </>
  )
}