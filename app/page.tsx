'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import {
  users, currentUser, posts as seedPosts, giftCards, conversations as seedConvos,
  notifications as seedNotifs, brandMeta, fmt,
  Post, GiftCard, Conversation, Notification, User,
} from '@/data/mock';

/* ═══════════════════════════ SVG ICONS ═══════════════════════════ */

const Svg = ({ children, size = 20, ...p }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={1.7} strokeLinecap="round"
    strokeLinejoin="round" {...p}>{children}</svg>
);

const Icons = {
  home: (p: any) => <Svg {...p}><path d="M9 21V13.6a.6.6 0 01.6-.6h4.8a.6.6 0 01.6.6V21M2 12L12 3l10 9" /><path d="M4 10v9a2 2 0 002 2h12a2 2 0 002-2v-9" /></Svg>,
  market: (p: any) => <Svg {...p}><path d="M3 6h18M3 6v14a2 2 0 002 2h14a2 2 0 002-2V6M3 6l1-4h16l1 4" /><path d="M10 13h4M12 11v4" /></Svg>,
  plus: (p: any) => <Svg {...p}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></Svg>,
  chat: (p: any) => <Svg {...p}><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></Svg>,
  user: (p: any) => <Svg {...p}><path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></Svg>,
  bell: (p: any) => <Svg {...p}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></Svg>,
  heart: (p: any) => <Svg {...p}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></Svg>,
  heartFill: (p: any) => <Svg {...p} fill="#ef4444" stroke="#ef4444"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></Svg>,
  comment: (p: any) => <Svg {...p}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></Svg>,
  share: (p: any) => <Svg {...p}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></Svg>,
  x: (p: any) => <Svg {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Svg>,
  back: (p: any) => <Svg {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></Svg>,
  send: (p: any) => <Svg {...p}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></Svg>,
  search: (p: any) => <Svg {...p}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></Svg>,
  shield: (p: any) => <Svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></Svg>,
  check: (p: any) => <Svg {...p} strokeWidth={2.5}><polyline points="20 6 9 17 4 12" /></Svg>,
  star: (p: any) => <Svg {...p} fill="#f59e0b" stroke="#f59e0b" strokeWidth={1}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></Svg>,
  clock: (p: any) => <Svg {...p}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></Svg>,
  filter: (p: any) => <Svg {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></Svg>,
  img: (p: any) => <Svg {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></Svg>,
  settings: (p: any) => <Svg {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></Svg>,
  zap: (p: any) => <Svg {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></Svg>,
  award: (p: any) => <Svg {...p}><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></Svg>,
  lock: (p: any) => <Svg {...p}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></Svg>,
  arrowUp: (p: any) => <Svg {...p}><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></Svg>,
  tag: (p: any) => <Svg {...p}><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></Svg>,
};

const Badge = ({ children }: { children: ReactNode }) => (
  <span style={{ background: '#10b981', color: '#050507', fontSize: 9, fontWeight: 700, width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: -3, right: -3, border: '2px solid var(--bg-1)' }}>
    {children}
  </span>
);

const Verified = ({ s = 13 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="#10b981" style={{ flexShrink: 0 }}>
    <path d="M12 2l2.4 3.6H18.6l.6 4.2L22.2 12l-3 2.2-.6 4.2h-4.2L12 22l-2.4-3.6H5.4l-.6-4.2L1.8 12l3-2.2.6-4.2h4.2L12 2z" />
    <path d="M9 12l2 2 4-4" stroke="#050507" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ═══════════════════════════ AVATAR ═══════════════════════════ */

const Avatar = ({ user, size = 40, ring }: { user: User; size?: number; ring?: boolean }) => (
  <div style={{ position: 'relative', flexShrink: 0 }}>
    <div style={{
      width: size, height: size, borderRadius: size * 0.32,
      background: user.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.36, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em',
      border: ring ? `2px solid var(--green)` : 'none',
    }}>
      {user.initials}
    </div>
    {user.online && (
      <div style={{ position: 'absolute', bottom: -1, right: -1, width: size * 0.28, height: size * 0.28, borderRadius: '50%', background: 'var(--green)', border: '2px solid var(--bg-1)' }} />
    )}
  </div>
);

/* ═══════════════════════════ APP ═══════════════════════════ */

export default function App() {
  const [tab, setTab] = useState<'feed' | 'market' | 'chat' | 'profile'>('feed');
  const [posts, setPosts] = useState<Post[]>(seedPosts);
  const [notifs, setNotifs] = useState<Notification[]>(seedNotifs);
  const [convos, setConvos] = useState<Conversation[]>(seedConvos);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [composeText, setComposeText] = useState('');
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [marketCat, setMarketCat] = useState('All');
  const [marketSearch, setMarketSearch] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const unreadN = notifs.filter(n => !n.read).length;
  const unreadM = convos.reduce((s, c) => s + c.unread, 0);
  const activeConvo = convos.find(c => c.id === activeChatId);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [activeConvo?.messages.length]);

  const doPost = () => {
    if (!composeText.trim()) return;
    setPosts([{ id: `p${Date.now()}`, user: currentUser, content: composeText, likes: 0, comments: 0, shares: 0, timestamp: 'now', type: 'text' }, ...posts]);
    setComposeText(''); setShowCompose(false);
  };

  const doLike = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const doSend = () => {
    if (!chatInput.trim() || !activeChatId) return;
    setConvos(convos.map(c => c.id === activeChatId ? {
      ...c, lastMessage: chatInput, timestamp: 'now', unread: 0,
      messages: [...c.messages, { id: `m${Date.now()}`, senderId: 'me', text: chatInput, timestamp: 'now', read: true }],
    } : c));
    setChatInput('');
  };

  const filteredCards = giftCards.filter(gc => {
    if (marketCat !== 'All' && gc.category !== marketCat) return false;
    if (marketSearch && !gc.brand.toLowerCase().includes(marketSearch.toLowerCase())) return false;
    return true;
  });

  const categories = ['All', ...Array.from(new Set(giftCards.map(g => g.category)))];

  /* ──────── TOP BAR ──────── */
  const TopBar = () => (
    <header style={{
      position: 'sticky', top: 0, zIndex: 30, background: 'rgba(5,5,7,0.85)',
      backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
      borderBottom: '1px solid var(--border)', padding: '0 20px', height: 56,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 9,
          background: 'linear-gradient(135deg, #10b981, #059669)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 16, color: '#050507', letterSpacing: '-0.04em',
        }}>T</div>
        <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: '-0.03em' }}>
          <span style={{ color: 'var(--green)' }}>Trenches</span>
          <span style={{ color: 'var(--tx-2)', fontWeight: 500, marginLeft: 4, fontSize: 15 }}>HQ</span>
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button onClick={() => { setShowNotifs(!showNotifs); }} style={{
          position: 'relative', width: 40, height: 40, borderRadius: 12,
          background: showNotifs ? 'var(--green-bg2)' : 'transparent',
          border: 'none', color: showNotifs ? 'var(--green)' : 'var(--tx-2)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icons.bell size={20} />
          {unreadN > 0 && <Badge>{unreadN > 9 ? '9' : unreadN}</Badge>}
        </button>
        <button onClick={() => setTab('chat')} style={{
          position: 'relative', width: 40, height: 40, borderRadius: 12,
          background: 'transparent', border: 'none', color: 'var(--tx-2)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icons.chat size={20} />
          {unreadM > 0 && <Badge>{unreadM > 9 ? '9' : unreadM}</Badge>}
        </button>
      </div>
    </header>
  );

  /* ──────── BOTTOM NAV ──────── */
  const BottomNav = () => (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40,
      background: 'rgba(12,12,16,0.92)', backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)', borderTop: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      height: 64, paddingBottom: 'env(safe-area-inset-bottom, 0)',
    }}>
      {([
        { id: 'feed' as const, icon: Icons.home, label: 'Feed' },
        { id: 'market' as const, icon: Icons.market, label: 'Market' },
        { id: 'compose' as const, icon: Icons.plus, label: '' },
        { id: 'chat' as const, icon: Icons.chat, label: 'Messages' },
        { id: 'profile' as const, icon: Icons.user, label: 'Profile' },
      ]).map(item => (
        <button key={item.id} onClick={() => {
          if (item.id === 'compose') setShowCompose(true);
          else { setTab(item.id as any); setShowNotifs(false); setActiveChatId(null); }
        }} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          background: 'none', border: 'none', cursor: 'pointer', padding: '6px 16px',
          color: item.id === 'compose' ? '#050507' : tab === item.id ? 'var(--green)' : 'var(--tx-3)',
          transition: 'color 0.15s',
        }}>
          {item.id === 'compose' ? (
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginTop: -14, boxShadow: '0 4px 20px rgba(16,185,129,0.3)',
            }}>
              <Icons.plus size={22} />
            </div>
          ) : (
            <>
              <div style={{ position: 'relative' }}>
                <item.icon size={22} />
                {item.id === 'chat' && unreadM > 0 && <Badge>{unreadM > 9 ? '9' : unreadM}</Badge>}
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.01em' }}>{item.label}</span>
            </>
          )}
        </button>
      ))}
    </nav>
  );

  /* ──────── NOTIFICATION PANEL ──────── */
  const NotifPanel = () => (
    <div className="a-fade" style={{
      position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.6)',
    }} onClick={() => setShowNotifs(false)}>
      <div className="a-slide-r" onClick={e => e.stopPropagation()} style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: 400,
        background: 'var(--bg-1)', borderLeft: '1px solid var(--border)', overflow: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, background: 'var(--bg-1)', zIndex: 2 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Notifications</h2>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button onClick={() => setNotifs(notifs.map(n => ({ ...n, read: true })))} style={{ background: 'none', border: 'none', color: 'var(--green)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Mark all read</button>
            <button onClick={() => setShowNotifs(false)} style={{ background: 'none', border: 'none', color: 'var(--tx-3)', cursor: 'pointer' }}>
              <Icons.x size={20} />
            </button>
          </div>
        </div>
        {notifs.map((n, i) => (
          <div key={n.id} className="a-up" style={{
            animationDelay: `${i * 30}ms`, padding: '14px 20px',
            borderBottom: '1px solid var(--border)',
            display: 'flex', gap: 12, alignItems: 'flex-start',
            background: n.read ? 'transparent' : 'var(--green-bg)',
            cursor: 'pointer',
          }}>
            <Avatar user={n.user} size={36} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, lineHeight: 1.5 }}>
                <span style={{ fontWeight: 600 }}>{n.user.displayName}</span>{' '}
                <span style={{ color: 'var(--tx-2)' }}>{n.content}</span>
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <span style={{
                  fontSize: 10, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.04em',
                  color: n.type === 'trade' ? 'var(--green)' : n.type === 'system' ? 'var(--blue)' : 'var(--tx-3)',
                }}>{n.type}</span>
                <span style={{ fontSize: 11, color: 'var(--tx-3)' }}>{n.timestamp}</span>
              </div>
            </div>
            {!n.read && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', marginTop: 6, flexShrink: 0 }} />}
          </div>
        ))}
      </div>
    </div>
  );

  /* ──────── COMPOSE MODAL ──────── */
  const ComposeModal = () => (
    <div className="a-fade" style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 60 }} onClick={() => setShowCompose(false)}>
      <div className="a-scale" onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg-2)', borderRadius: 20, width: '100%', maxWidth: 520, margin: '0 16px',
        border: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
          <button onClick={() => setShowCompose(false)} style={{ background: 'none', border: 'none', color: 'var(--tx-3)', cursor: 'pointer' }}>
            <Icons.x size={20} />
          </button>
          <button onClick={doPost} disabled={!composeText.trim()} style={{
            padding: '8px 20px', borderRadius: 10,
            background: composeText.trim() ? 'var(--green)' : 'var(--bg-4)',
            color: composeText.trim() ? '#050507' : 'var(--tx-3)',
            border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer',
            transition: 'all 0.15s',
          }}>Publish</button>
        </div>
        <div style={{ padding: 20, display: 'flex', gap: 14 }}>
          <Avatar user={currentUser} size={40} />
          <div style={{ flex: 1 }}>
            <textarea value={composeText} onChange={e => setComposeText(e.target.value)}
              placeholder="Share an update, trade, or insight..."
              autoFocus
              style={{
                width: '100%', minHeight: 140, background: 'transparent', border: 'none',
                color: 'var(--tx-1)', fontSize: 15, lineHeight: 1.6, resize: 'none', outline: 'none',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 8 }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {[Icons.img, Icons.tag, Icons.zap].map((Ic, i) => (
                  <button key={i} style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--bg-3)', border: 'none', color: 'var(--green)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Ic size={18} />
                  </button>
                ))}
              </div>
              <span style={{ fontSize: 12, color: 'var(--tx-3)', fontFamily: "'IBM Plex Mono', monospace" }}>{composeText.length}/500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ──────── POST CARD ──────── */
  const PostCard = ({ post, i }: { post: Post; i: number }) => (
    <article className="a-up" style={{
      animationDelay: `${i * 40}ms`, padding: '18px 20px',
      borderBottom: '1px solid var(--border)', cursor: 'pointer',
      transition: 'background 0.15s',
    }} onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-2)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
      <div style={{ display: 'flex', gap: 14 }}>
        <Avatar user={post.user} size={42} />
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>{post.user.displayName}</span>
            {post.user.verified && <Verified />}
            <span style={{ color: 'var(--tx-3)', fontSize: 13 }}>@{post.user.username}</span>
            <span style={{ color: 'var(--tx-3)', fontSize: 12 }}>· {post.timestamp}</span>
          </div>

          {/* Trade badge */}
          {post.type === 'trade' && post.tradeInfo && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 12px', borderRadius: 8, marginBottom: 10,
              background: 'var(--green-bg)', border: '1px solid rgba(16,185,129,0.15)',
            }}>
              <Icons.tag size={14} style={{ color: 'var(--green)' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--green)' }}>
                {post.tradeInfo.brand} {post.tradeInfo.amount}
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--green-l)', background: 'var(--green-bg2)', padding: '2px 6px', borderRadius: 4 }}>
                {post.tradeInfo.status}
              </span>
            </div>
          )}

          {/* Milestone badge */}
          {post.type === 'milestone' && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 8, marginBottom: 10,
              background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)',
            }}>
              <Icons.award size={14} style={{ color: 'var(--purple)' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#a78bfa' }}>Milestone</span>
            </div>
          )}

          {/* Content */}
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--tx-1)', whiteSpace: 'pre-wrap' as const }}>
            {post.content}
          </p>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 2, marginTop: 14, marginLeft: -8 }}>
            <button onClick={e => { e.stopPropagation(); doLike(post.id); }} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
              borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer',
              color: post.liked ? 'var(--red)' : 'var(--tx-3)', fontSize: 13, fontWeight: 500,
              transition: 'all 0.15s',
            }}>
              {post.liked ? <Icons.heartFill size={16} /> : <Icons.heart size={16} />}
              {fmt(post.likes)}
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--tx-3)', fontSize: 13, fontWeight: 500 }}>
              <Icons.comment size={16} /> {fmt(post.comments)}
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--tx-3)', fontSize: 13, fontWeight: 500 }}>
              <Icons.share size={16} /> {fmt(post.shares)}
            </button>
          </div>
        </div>
      </div>
    </article>
  );

  /* ──────── FEED PAGE ──────── */
  const FeedPage = () => (
    <>
      {/* Compose bar */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'center' }}>
        <Avatar user={currentUser} size={38} />
        <button onClick={() => setShowCompose(true)} style={{
          flex: 1, textAlign: 'left', padding: '10px 16px', borderRadius: 12,
          background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--tx-3)',
          fontSize: 14, cursor: 'pointer', transition: 'border-color 0.15s',
        }}>
          Share an update...
        </button>
      </div>

      {/* Platform stats bar */}
      <div className="hide-sb" style={{
        display: 'flex', gap: 8, padding: '12px 20px', overflowX: 'auto',
        borderBottom: '1px solid var(--border)',
      }}>
        {[
          { label: 'Active Traders', val: '4,218', icon: Icons.user },
          { label: 'Trades Today', val: '1,847', icon: Icons.zap },
          { label: 'In Escrow', val: '$127K', icon: Icons.lock },
        ].map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
            background: 'var(--bg-2)', borderRadius: 10, flexShrink: 0,
            border: '1px solid var(--border)',
          }}>
            <s.icon size={14} style={{ color: 'var(--green)' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', fontFamily: "'IBM Plex Mono', monospace" }}>{s.val}</span>
            <span style={{ fontSize: 11, color: 'var(--tx-3)' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {posts.map((p, i) => <PostCard key={p.id} post={p} i={i} />)}
      <div style={{ height: 80 }} />
    </>
  );

  /* ──────── MARKETPLACE ──────── */
  const MarketPage = () => (
    <>
      {/* Header */}
      <div style={{ padding: '20px 20px 0' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 }}>
          Marketplace
        </h1>
        <p style={{ fontSize: 13, color: 'var(--tx-3)', marginBottom: 16 }}>
          P2P gift card trading with escrow protection
        </p>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <Icons.search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--tx-3)' }} />
          <input value={marketSearch} onChange={e => setMarketSearch(e.target.value)}
            placeholder="Search cards..."
            style={{
              width: '100%', padding: '11px 14px 11px 40px', borderRadius: 12,
              background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--tx-1)',
              fontSize: 14, outline: 'none', transition: 'border-color 0.15s',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(16,185,129,0.3)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>

        {/* Categories */}
        <div className="hide-sb" style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 16 }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setMarketCat(cat)} style={{
              padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', transition: 'all 0.15s',
              background: marketCat === cat ? 'var(--green)' : 'var(--bg-3)',
              color: marketCat === cat ? '#050507' : 'var(--tx-2)',
            }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Sell CTA */}
      <div style={{ padding: '0 20px 16px' }}>
        <button style={{
          width: '100%', padding: 14, borderRadius: 14,
          border: '1px dashed rgba(16,185,129,0.25)', background: 'var(--green-bg)',
          color: 'var(--green)', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transition: 'all 0.15s',
        }}>
          <Icons.plus size={18} /> Sell a Gift Card
        </button>
      </div>

      {/* Cards grid */}
      <div style={{ padding: '0 20px 100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
        {filteredCards.map((card, i) => (
          <div key={card.id} className="a-up" style={{
            animationDelay: `${i * 50}ms`, background: 'var(--bg-2)', borderRadius: 16,
            border: '1px solid var(--border)', overflow: 'hidden', transition: 'border-color 0.2s',
          }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-h)'}
             onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>

            {/* Brand header */}
            <div style={{
              height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 16px', background: brandMeta[card.brand]?.gradient || 'var(--bg-3)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontWeight: 800, fontSize: 18, color: '#fff', opacity: 0.95 }}>
                  {card.brand}
                </span>
              </div>
              <span style={{
                background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)',
                padding: '3px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700, color: '#fff',
              }}>-{card.discount}%</span>
            </div>

            {/* Body */}
            <div style={{ padding: 16 }}>
              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 26, fontWeight: 800, color: 'var(--tx-1)', letterSpacing: '-0.03em', fontFamily: "'IBM Plex Mono', monospace" }}>
                  ${card.price}
                </span>
                <span style={{ fontSize: 14, color: 'var(--tx-3)', textDecoration: 'line-through' }}>
                  ${card.value}
                </span>
                <span style={{ fontSize: 12, color: 'var(--tx-3)' }}>{card.currency}</span>
              </div>

              {/* Seller */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: 10, borderRadius: 10,
                background: 'var(--bg-3)', marginBottom: 12,
              }}>
                <Avatar user={card.seller} size={32} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{card.seller.displayName}</span>
                    {card.seller.verified && <Verified s={12} />}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'var(--tx-3)' }}>
                      <Icons.star size={11} /> {card.rating}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--tx-3)' }}>{card.totalSales} trades</span>
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--tx-3)', background: 'var(--bg-3)', padding: '4px 8px', borderRadius: 6 }}>
                  <Icons.clock size={11} /> {card.responseTime}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--tx-3)', background: 'var(--bg-3)', padding: '4px 8px', borderRadius: 6 }}>
                  <Icons.shield size={11} /> Escrow
                </span>
                {card.paymentMethods.slice(0, 2).map(pm => (
                  <span key={pm} style={{ fontSize: 11, color: 'var(--tx-3)', background: 'var(--bg-3)', padding: '4px 8px', borderRadius: 6 }}>
                    {pm}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button style={{
                width: '100%', padding: '11px 0', borderRadius: 10, border: 'none',
                fontWeight: 700, fontSize: 14, cursor: 'pointer', transition: 'all 0.15s',
                background: card.available ? 'var(--green)' : 'var(--bg-4)',
                color: card.available ? '#050507' : 'var(--tx-3)',
              }}>
                {card.available ? 'Trade Now' : 'Sold Out'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  /* ──────── MESSAGES ──────── */
  const ChatPage = () => {
    if (activeChatId && activeConvo) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 56px - 64px)' }}>
          {/* Chat header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
            <button onClick={() => setActiveChatId(null)} style={{ background: 'none', border: 'none', color: 'var(--tx-2)', cursor: 'pointer' }}>
              <Icons.back size={20} />
            </button>
            <Avatar user={activeConvo.user} size={36} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{activeConvo.user.displayName}</span>
                {activeConvo.user.verified && <Verified s={12} />}
              </div>
              <span style={{ fontSize: 11, color: activeConvo.user.online ? 'var(--green)' : 'var(--tx-3)' }}>
                {activeConvo.user.online ? 'Online' : 'Offline'}
              </span>
            </div>
            {activeConvo.type === 'trade' && (
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green)', background: 'var(--green-bg)', padding: '4px 10px', borderRadius: 6 }}>
                TRADE
              </span>
            )}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px' }}>
            {activeConvo.messages.map(msg => (
              <div key={msg.id} style={{
                display: 'flex', justifyContent: msg.senderId === 'me' ? 'flex-end' : 'flex-start',
                marginBottom: 10,
              }}>
                <div style={{
                  maxWidth: '78%', padding: '10px 14px', borderRadius: 16,
                  ...(msg.senderId === 'me'
                    ? { background: 'var(--green)', color: '#050507', borderBottomRightRadius: 4 }
                    : { background: 'var(--bg-3)', color: 'var(--tx-1)', borderBottomLeftRadius: 4 }),
                }}>
                  <p style={{ fontSize: 14, lineHeight: 1.5 }}>{msg.text}</p>
                  <p style={{ fontSize: 10, marginTop: 4, opacity: 0.5 }}>{msg.timestamp}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div style={{ flexShrink: 0, padding: '12px 20px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && doSend()}
                placeholder="Type a message..."
                style={{
                  flex: 1, padding: '11px 16px', borderRadius: 14,
                  background: 'var(--bg-3)', border: '1px solid var(--border)',
                  color: 'var(--tx-1)', fontSize: 14, outline: 'none',
                }}
              />
              <button onClick={doSend} disabled={!chatInput.trim()} style={{
                width: 42, height: 42, borderRadius: 14, border: 'none',
                background: chatInput.trim() ? 'var(--green)' : 'var(--bg-3)',
                color: chatInput.trim() ? '#050507' : 'var(--tx-3)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s',
              }}>
                <Icons.send size={18} />
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div style={{ padding: '20px 20px 12px' }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>Messages</h1>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Icons.search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--tx-3)' }} />
            <input placeholder="Search conversations..."
              style={{
                width: '100%', padding: '11px 14px 11px 40px', borderRadius: 12,
                background: 'var(--bg-2)', border: '1px solid var(--border)',
                color: 'var(--tx-1)', fontSize: 14, outline: 'none',
              }}
            />
          </div>
        </div>

        {convos.map((c, i) => (
          <button key={c.id} className="a-up" onClick={() => setActiveChatId(c.id)} style={{
            animationDelay: `${i * 40}ms`, width: '100%', display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 20px', borderBottom: '1px solid var(--border)', background: 'none',
            border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s',
          }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
             onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <Avatar user={c.user} size={48} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--tx-1)' }}>{c.user.displayName}</span>
                  {c.user.verified && <Verified s={12} />}
                  {c.type === 'trade' && (
                    <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--green)', background: 'var(--green-bg)', padding: '2px 6px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Trade
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 11, color: 'var(--tx-3)', flexShrink: 0 }}>{c.timestamp}</span>
              </div>
              <p style={{ fontSize: 13, color: c.unread > 0 ? 'var(--tx-1)' : 'var(--tx-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: c.unread > 0 ? 500 : 400 }}>
                {c.lastMessage}
              </p>
            </div>
            {c.unread > 0 && (
              <span style={{
                minWidth: 22, height: 22, borderRadius: 11, background: 'var(--green)',
                color: '#050507', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center',
                justifyContent: 'center', padding: '0 6px', flexShrink: 0,
              }}>{c.unread}</span>
            )}
          </button>
        ))}
        <div style={{ height: 80 }} />
      </>
    );
  };

  /* ──────── PROFILE PAGE ──────── */
  const ProfilePage = () => {
    const u = currentUser;
    return (
      <>
        {/* Banner */}
        <div style={{
          height: 100,
          background: `linear-gradient(135deg, ${u.color}33, var(--bg-2), ${u.color}15)`,
          position: 'relative',
        }}>
          <button style={{
            position: 'absolute', top: 12, right: 16, width: 36, height: 36, borderRadius: 10,
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: 'none',
            color: 'var(--tx-1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Icons.settings size={18} /></button>
        </div>

        <div style={{ padding: '0 20px 20px', marginTop: -32 }}>
          {/* Avatar */}
          <div style={{ marginBottom: 14 }}>
            <Avatar user={u} size={64} ring />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <h1 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>{u.displayName}</h1>
                {u.verified && <Verified />}
              </div>
              <p style={{ fontSize: 13, color: 'var(--tx-3)' }}>@{u.username}</p>
            </div>
            <button style={{
              padding: '8px 20px', borderRadius: 10, border: '1px solid var(--border)',
              background: 'transparent', color: 'var(--tx-1)', fontWeight: 600, fontSize: 13,
              cursor: 'pointer',
            }}>Edit Profile</button>
          </div>

          <p style={{ fontSize: 14, color: 'var(--tx-2)', lineHeight: 1.5, marginBottom: 16 }}>{u.bio}</p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
            {[
              { label: 'Following', val: fmt(u.following) },
              { label: 'Followers', val: fmt(u.followers) },
              { label: 'Joined', val: u.joinDate },
            ].map((s, i) => (
              <div key={i}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{s.val}</span>
                <span style={{ color: 'var(--tx-3)', fontSize: 13, marginLeft: 4 }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Trade stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20 }}>
            {[
              { label: 'Trades', val: u.trades.toString(), icon: Icons.zap, color: 'var(--green)' },
              { label: 'Rating', val: u.rating.toFixed(1), icon: Icons.star, color: 'var(--amber)' },
              { label: 'Completion', val: `${u.completionRate}%`, icon: Icons.shield, color: 'var(--blue)' },
            ].map((s, i) => (
              <div key={i} style={{
                background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 14,
                padding: 14, textAlign: 'center',
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                  <s.icon size={18} style={{ color: s.color }} />
                </div>
                <p style={{ fontWeight: 800, fontSize: 18, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '-0.02em' }}>{s.val}</p>
                <p style={{ fontSize: 11, color: 'var(--tx-3)', marginTop: 2 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Profile tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', position: 'sticky', top: 56, background: 'var(--bg-0)', zIndex: 5 }}>
          {['Posts', 'Trades', 'Reviews'].map((t, i) => (
            <button key={t} style={{
              flex: 1, padding: '12px 0', fontSize: 14, fontWeight: 600,
              background: 'none', border: 'none', cursor: 'pointer',
              color: i === 0 ? 'var(--green)' : 'var(--tx-3)',
              borderBottom: i === 0 ? '2px solid var(--green)' : '2px solid transparent',
            }}>{t}</button>
          ))}
        </div>

        {/* User's posts (show some from feed) */}
        {posts.slice(0, 3).map((p, i) => <PostCard key={p.id} post={p} i={i} />)}
        <div style={{ height: 80 }} />
      </>
    );
  };

  /* ──────── RENDER ──────── */
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-0)', maxWidth: 680, margin: '0 auto', position: 'relative', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
      <TopBar />

      <main style={{ minHeight: 'calc(100vh - 56px - 64px)' }}>
        {tab === 'feed' && <FeedPage />}
        {tab === 'market' && <MarketPage />}
        {tab === 'chat' && <ChatPage />}
        {tab === 'profile' && <ProfilePage />}
      </main>

      <BottomNav />

      {showNotifs && <NotifPanel />}
      {showCompose && <ComposeModal />}
    </div>
  );
}
