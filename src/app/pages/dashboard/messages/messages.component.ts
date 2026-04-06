import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  id: string;
  sender_id: string;
  text: string;
  timestamp: Date;
  isMe: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="messages-container animate-fade-up">
      <!-- Sidebar -->
      <div class="chat-sidebar glass-card">
        <div class="sidebar-header">
          <h2 class="sidebar-title">Messages</h2>
          <div class="search-box">
             <input type="text" placeholder="Search chats..." class="input-sm" />
          </div>
        </div>
        
        <div class="conversation-list">
          @for (chat of conversations(); track chat.id) {
            <div 
              class="conversation-item" 
              [class.active]="selectedChat()?.id === chat.id"
              (click)="selectChat(chat)">
              <div class="avatar-container">
                <img [src]="chat.avatar" class="chat-avatar" alt="Avatar" />
                @if (chat.online) {
                  <span class="online-indicator"></span>
                }
              </div>
              <div class="chat-info">
                <div class="chat-header-row">
                  <span class="chat-name">{{ chat.name }}</span>
                  <span class="chat-time">{{ chat.time }}</span>
                </div>
                <div class="chat-footer-row">
                  <p class="chat-preview">{{ chat.lastMessage }}</p>
                  @if (chat.unread > 0) {
                    <span class="unread-count">{{ chat.unread }}</span>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Chat Window -->
      <div class="chat-main glass-card">
        @if (selectedChat()) {
          <div class="chat-header">
            <div class="selected-user-info">
              <img [src]="selectedChat()?.avatar" class="chat-avatar-sm" alt="Avatar" />
              <div>
                <h3 class="selected-user-name">{{ selectedChat()?.name }}</h3>
                <span class="status-text">{{ selectedChat()?.online ? 'Online' : 'Offline' }}</span>
              </div>
            </div>
            <div class="chat-actions">
              <button class="icon-btn">📞</button>
              <button class="icon-btn">⋮</button>
            </div>
          </div>

          <div class="chat-messages" #scrollContainer>
            @for (msg of messages(); track msg.id) {
              <div class="message-row" [class.me]="msg.isMe">
                <div class="message-bubble" [class.me]="msg.isMe">
                  <p class="message-text">{{ msg.text }}</p>
                  <span class="message-time">{{ msg.timestamp | date:'shortTime' }}</span>
                </div>
              </div>
            }
          </div>

          <div class="chat-input-area">
            <div class="input-wrapper">
              <button class="attachment-btn">+</button>
              <input 
                type="text" 
                placeholder="Type a message..." 
                class="message-input" 
                [(ngModel)]="newMessage" 
                (keyup.enter)="sendMessage()" />
              <button class="send-btn" (click)="sendMessage()">
                <span class="send-icon">➤</span>
              </button>
            </div>
          </div>
        } @else {
          <div class="empty-chat-state">
            <div class="empty-icon">💬</div>
            <h2>Your messages</h2>
            <p>Select a conversation to start chatting with creators and brands.</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .messages-container {
      display: grid;
      grid-template-columns: 350px 1fr;
      gap: 24px;
      height: calc(100vh - 160px);
      min-height: 600px;
    }

    /* Sidebar */
    .chat-sidebar {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 0;
    }
    .sidebar-header {
      padding: 24px;
      border-bottom: 1px solid var(--border-weak);
    }
    .sidebar-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .search-box .input-sm {
      width: 100%;
      background: rgba(255,255,255,0.05);
    }

    .conversation-list {
      flex: 1;
      overflow-y: auto;
    }
    .conversation-item {
      display: flex;
      padding: 16px 24px;
      gap: 12px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .conversation-item:hover {
      background: rgba(255,255,255,0.03);
    }
    .conversation-item.active {
      background: rgba(var(--primary-rgb, 99, 102, 241), 0.08);
      border-right: 3px solid var(--primary);
    }

    .avatar-container { position: relative; }
    .chat-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
    .online-indicator {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 12px;
      height: 12px;
      background: #10b981;
      border: 2px solid var(--bg-card);
      border-radius: 50%;
    }

    .chat-info { flex: 1; min-width: 0; }
    .chat-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }
    .chat-name { font-weight: 600; font-size: 15px; }
    .chat-time { font-size: 12px; color: var(--text-tertiary); }
    
    .chat-footer-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .chat-preview {
      font-size: 13px;
      color: var(--text-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
    }
    .unread-count {
      background: var(--primary);
      color: white;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 10px;
      min-width: 18px;
      text-align: center;
    }

    /* Main Chat */
    .chat-main {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 0;
    }
    .chat-header {
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border-weak);
    }
    .selected-user-info { display: flex; align-items: center; gap: 12px; }
    .chat-avatar-sm { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
    .selected-user-name { font-size: 16px; font-weight: 600; }
    .status-text { font-size: 12px; color: var(--text-tertiary); }
    .icon-btn {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.2s;
    }
    .icon-btn:hover { opacity: 1; }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: rgba(0,0,0,0.02);
    }
    .message-row { display: flex; width: 100%; }
    .message-row.me { justify-content: flex-end; }
    .message-bubble {
      max-width: 70%;
      padding: 12px 16px;
      border-radius: 18px;
      background: var(--bg-card);
      border: 1px solid var(--border-weak);
      position: relative;
    }
    .message-bubble.me {
      background: var(--primary);
      color: white;
      border-color: transparent;
    }
    .message-text { margin: 0; font-size: 15px; line-height: 1.5; }
    .message-time {
      font-size: 10px;
      opacity: 0.6;
      display: block;
      margin-top: 4px;
      text-align: right;
    }

    .chat-input-area { padding: 20px 24px; }
    .input-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255,255,255,0.05);
      border-radius: 24px;
      padding: 4px 8px 4px 16px;
      border: 1px solid var(--border-strong);
    }
    .attachment-btn {
      background: none;
      border: none;
      font-size: 24px;
      color: var(--text-tertiary);
      cursor: pointer;
    }
    .message-input {
      flex: 1;
      background: none;
      border: none;
      padding: 10px 0;
      color: var(--text-primary);
      font-size: 15px;
    }
    .message-input:focus { outline: none; }
    .send-btn {
      background: var(--primary);
      color: white;
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .send-btn:hover { transform: scale(1.05); }
    .send-icon { font-size: 16px; transform: rotate(-45deg) translate(2px, -1px); }

    .empty-chat-state {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      text-align: center;
      color: var(--text-tertiary);
    }
    .empty-icon { font-size: 64px; margin-bottom: 24px; opacity: 0.5; }
    .empty-chat-state h2 { color: var(--text-primary); margin-bottom: 8px; }
  `]
})
export class MessagesComponent implements OnInit {
  conversations = signal<Conversation[]>([
    {
      id: '1',
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      lastMessage: 'Hey, I checked your proposal and I love it!',
      time: '12:45 PM',
      unread: 2,
      online: true
    },
    {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      lastMessage: 'Can we discuss the timeline for the video?',
      time: '10:30 AM',
      unread: 0,
      online: false
    },
    {
      id: '3',
      name: 'Jordan Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      lastMessage: 'Sent you the draft for the Instagram story.',
      time: 'Yesterday',
      unread: 0,
      online: true
    }
  ]);

  selectedChat = signal<Conversation | null>(null);
  messages = signal<ChatMessage[]>([]);
  newMessage = '';

  ngOnInit() {
    // Optionally pre-select first chat
    // this.selectChat(this.conversations()[0]);
  }

  selectChat(chat: Conversation) {
    this.selectedChat.set(chat);
    // Load mock messages for the selected chat
    const mockMessages: ChatMessage[] = [
      { id: '1', sender_id: chat.id, text: 'Hi there! I saw your recent campaign post.', timestamp: new Date(Date.now() - 3600000), isMe: false },
      { id: '2', sender_id: 'me', text: 'Hello! Thanks for reaching out. What did you think?', timestamp: new Date(Date.now() - 3500000), isMe: true },
      { id: '3', sender_id: chat.id, text: chat.lastMessage, timestamp: new Date(), isMe: false }
    ];
    this.messages.set(mockMessages);
    
    // Clear unread count
    this.conversations.update(chats => 
      chats.map(c => c.id === chat.id ? { ...c, unread: 0 } : c)
    );
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedChat()) return;

    const msg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      sender_id: 'me',
      text: this.newMessage,
      timestamp: new Date(),
      isMe: true
    };

    this.messages.update(prev => [...prev, msg]);
    
    // Update last message in sidebar
    const chatId = this.selectedChat()?.id;
    this.conversations.update(chats => 
      chats.map(c => c.id === chatId ? { ...c, lastMessage: this.newMessage, time: 'Just now' } : c)
    );

    this.newMessage = '';
  }
}
