export interface User {
  id: string;
  username: string;
  displayName: string;
  initials: string;
  color: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  verified: boolean;
  online: boolean;
  joinDate: string;
  trades: number;
  rating: number;
  completionRate: number;
  avatar?: string;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  liked?: boolean;
  type?: 'text' | 'trade' | 'milestone';
  tradeInfo?: { brand: string; amount: string; status: string };
}

export interface GiftCard {
  id: string;
  seller: User;
  brand: string;
  value: number;
  price: number;
  discount: number;
  currency: string;
  category: string;
  available: boolean;
  rating: number;
  totalSales: number;
  responseTime: string;
  paymentMethods: string[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: Message[];
  type: 'trade' | 'personal';
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'trade' | 'system';
  user: User;
  content: string;
  timestamp: string;
  read: boolean;
}

const palette = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
  '#f97316', '#eab308', '#22c55e', '#14b8a6',
  '#06b6d4', '#3b82f6', '#a855f7', '#e11d48',
];

export const users: User[] = [
  {
    id: 'u1', username: 'damola_fx', displayName: 'Damola Adeyemi', initials: 'DA',
    color: palette[0], bio: 'Professional gift card trader. 300+ verified trades. Instant payout guaranteed.',
    followers: 12400, following: 340, posts: 892, verified: true, online: true,
    joinDate: 'Jan 2024', trades: 312, rating: 4.95, completionRate: 99.2,
  },
  {
    id: 'u2', username: 'amara_trades', displayName: 'Amara Okonkwo', initials: 'AO',
    color: palette[4], bio: 'Top-rated seller. Amazon, Steam, iTunes specialist. Fast response.',
    followers: 8200, following: 512, posts: 443, verified: true, online: true,
    joinDate: 'Mar 2024', trades: 210, rating: 4.88, completionRate: 98.5,
  },
  {
    id: 'u3', username: 'kchukwu', displayName: 'Kelechi Chukwu', initials: 'KC',
    color: palette[8], bio: 'Building wealth one trade at a time.',
    followers: 3400, following: 180, posts: 234, verified: false, online: false,
    joinDate: 'Jun 2024', trades: 67, rating: 4.5, completionRate: 95.0,
  },
  {
    id: 'u4', username: 'temi.cards', displayName: 'Temi Bakare', initials: 'TB',
    color: palette[6], bio: 'Verified seller since Day 1. Best rates. No delays. Escrow only.',
    followers: 15800, following: 220, posts: 1102, verified: true, online: true,
    joinDate: 'Dec 2023', trades: 540, rating: 4.97, completionRate: 99.8,
  },
  {
    id: 'u5', username: 'chi_crypto', displayName: 'Chidera Nnamdi', initials: 'CN',
    color: palette[2], bio: 'Crypto to gift cards. Bridging the gap.',
    followers: 6700, following: 890, posts: 567, verified: true, online: false,
    joinDate: 'Feb 2024', trades: 120, rating: 4.72, completionRate: 96.3,
  },
  {
    id: 'u6', username: 'ify.plug', displayName: 'Ifeoma Eze', initials: 'IE',
    color: palette[10], bio: 'Your plug for all gift card needs. DM for bulk rates.',
    followers: 4500, following: 300, posts: 320, verified: false, online: true,
    joinDate: 'May 2024', trades: 89, rating: 4.61, completionRate: 94.0,
  },
  {
    id: 'u7', username: 'wale_big', displayName: 'Adewale Ogundimu', initials: 'AO',
    color: palette[3], bio: 'High-volume trader. Enterprise deals welcome.',
    followers: 22000, following: 150, posts: 1500, verified: true, online: true,
    joinDate: 'Nov 2023', trades: 780, rating: 4.98, completionRate: 99.9,
  },
  {
    id: 'u8', username: 'ada.verified', displayName: 'Adaeze Okoli', initials: 'AK',
    color: palette[7], bio: 'Verified trader. iTunes, Google Play, Amazon. 24/7 available.',
    followers: 9100, following: 440, posts: 670, verified: true, online: false,
    joinDate: 'Jan 2024', trades: 190, rating: 4.85, completionRate: 97.8,
  },
];

export const currentUser: User = {
  id: 'me', username: 'new_trader', displayName: 'Your Name', initials: 'YN',
  color: palette[6], bio: 'New to the platform. Ready to trade.',
  followers: 124, following: 89, posts: 12, verified: false, online: true,
  joinDate: 'Apr 2026', trades: 3, rating: 5.0, completionRate: 100,
};

export const posts: Post[] = [
  {
    id: 'p1', user: users[0],
    content: 'Just completed trade #312. The escrow system on this platform is seamless — funds released in under 30 seconds after verification. This is how P2P trading should work.',
    likes: 342, comments: 67, shares: 45, timestamp: '2m ago', type: 'text',
  },
  {
    id: 'p2', user: users[1],
    content: 'Amazon $100 cards available at competitive rates. Check my marketplace listing — verified seller with 210+ completed trades and 4.88 rating.',
    likes: 128, comments: 89, shares: 34, timestamp: '18m ago', type: 'trade',
    tradeInfo: { brand: 'Amazon', amount: '$100', status: 'Available' },
  },
  {
    id: 'p3', user: users[3],
    content: 'Milestone: 500+ trades completed with a 99.8% completion rate. Thank you to everyone who has trusted me with their trades. We keep building.',
    likes: 567, comments: 123, shares: 89, timestamp: '1h ago', liked: true, type: 'milestone',
  },
  {
    id: 'p4', user: users[4],
    content: 'The bridge between crypto and gift cards is getting stronger. Completed 5 BTC-to-giftcard swaps today through the platform. The future of value exchange is here.',
    likes: 234, comments: 45, shares: 23, timestamp: '2h ago', type: 'text',
  },
  {
    id: 'p5', user: users[6],
    content: 'Pro tip: Always check the seller\'s completion rate before initiating a trade. A high completion rate means reliability. Look for 95%+ with at least 50 trades.',
    likes: 891, comments: 234, shares: 156, timestamp: '3h ago', type: 'text',
  },
  {
    id: 'p6', user: users[7],
    content: 'New payment method added to my listings — I now accept bank transfer, crypto, and mobile money. Flexibility is key in this market.',
    likes: 178, comments: 56, shares: 32, timestamp: '5h ago', type: 'text',
  },
  {
    id: 'p7', user: users[2],
    content: 'Steam Winter Sale cards going fast. Secured 3 trades in the last hour. If you need gaming cards, now is the time to check the marketplace.',
    likes: 98, comments: 34, shares: 12, timestamp: '6h ago', type: 'trade',
    tradeInfo: { brand: 'Steam', amount: '$50', status: 'Limited' },
  },
  {
    id: 'p8', user: users[5],
    content: 'First month on the platform and I\'ve already completed 89 trades. The community here is different — professional, reliable, and transparent.',
    likes: 245, comments: 67, shares: 43, timestamp: '8h ago', type: 'milestone',
  },
];

export const giftCards: GiftCard[] = [
  { id: 'gc1', seller: users[1], brand: 'Amazon', value: 100, price: 85, discount: 15, currency: 'USD', category: 'Shopping', available: true, rating: 4.88, totalSales: 210, responseTime: '< 2 min', paymentMethods: ['Bank Transfer', 'Crypto'] },
  { id: 'gc2', seller: users[3], brand: 'Steam', value: 50, price: 40, discount: 20, currency: 'USD', category: 'Gaming', available: true, rating: 4.97, totalSales: 540, responseTime: '< 1 min', paymentMethods: ['Bank Transfer', 'Mobile Money'] },
  { id: 'gc3', seller: users[6], brand: 'iTunes', value: 200, price: 168, discount: 16, currency: 'USD', category: 'Entertainment', available: true, rating: 4.98, totalSales: 780, responseTime: 'Instant', paymentMethods: ['Crypto', 'Bank Transfer'] },
  { id: 'gc4', seller: users[7], brand: 'Google Play', value: 50, price: 41, discount: 18, currency: 'USD', category: 'Entertainment', available: true, rating: 4.85, totalSales: 190, responseTime: '< 3 min', paymentMethods: ['Bank Transfer'] },
  { id: 'gc5', seller: users[4], brand: 'Nike', value: 100, price: 78, discount: 22, currency: 'USD', category: 'Shopping', available: true, rating: 4.72, totalSales: 120, responseTime: '< 5 min', paymentMethods: ['Crypto'] },
  { id: 'gc6', seller: users[5], brand: 'Sephora', value: 75, price: 60, discount: 20, currency: 'USD', category: 'Lifestyle', available: true, rating: 4.61, totalSales: 89, responseTime: '< 5 min', paymentMethods: ['Bank Transfer', 'Mobile Money'] },
  { id: 'gc7', seller: users[0], brand: 'Xbox', value: 100, price: 81, discount: 19, currency: 'USD', category: 'Gaming', available: true, rating: 4.95, totalSales: 312, responseTime: '< 1 min', paymentMethods: ['Crypto', 'Bank Transfer'] },
  { id: 'gc8', seller: users[2], brand: 'PlayStation', value: 50, price: 42, discount: 16, currency: 'USD', category: 'Gaming', available: true, rating: 4.5, totalSales: 67, responseTime: '< 5 min', paymentMethods: ['Bank Transfer'] },
  { id: 'gc9', seller: users[3], brand: 'Netflix', value: 30, price: 25, discount: 17, currency: 'USD', category: 'Entertainment', available: true, rating: 4.97, totalSales: 540, responseTime: '< 1 min', paymentMethods: ['Crypto', 'Mobile Money'] },
  { id: 'gc10', seller: users[6], brand: 'Spotify', value: 60, price: 48, discount: 20, currency: 'USD', category: 'Entertainment', available: true, rating: 4.98, totalSales: 780, responseTime: 'Instant', paymentMethods: ['Bank Transfer', 'Crypto'] },
  { id: 'gc11', seller: users[1], brand: 'eBay', value: 200, price: 166, discount: 17, currency: 'USD', category: 'Shopping', available: true, rating: 4.88, totalSales: 210, responseTime: '< 2 min', paymentMethods: ['Bank Transfer'] },
  { id: 'gc12', seller: users[0], brand: 'Walmart', value: 150, price: 127, discount: 15, currency: 'USD', category: 'Shopping', available: false, rating: 4.95, totalSales: 312, responseTime: '< 1 min', paymentMethods: ['Crypto'] },
];

export const conversations: Conversation[] = [
  {
    id: 'c1', user: users[1], lastMessage: 'Escrow initiated. Please confirm the card details on your end.', timestamp: '2m ago', unread: 3, type: 'trade',
    messages: [
      { id: 'm1', senderId: 'me', text: 'Hi, I\'d like to buy the $100 Amazon card from your listing.', timestamp: '12m ago', read: true },
      { id: 'm2', senderId: 'u2', text: 'Available! I can do $85. Shall I initiate escrow?', timestamp: '10m ago', read: true },
      { id: 'm3', senderId: 'me', text: 'Yes, let\'s proceed with escrow.', timestamp: '6m ago', read: true },
      { id: 'm4', senderId: 'u2', text: 'Escrow initiated. Please confirm the card details on your end.', timestamp: '2m ago', read: false },
      { id: 'm5', senderId: 'u2', text: 'The card code has been uploaded to escrow. You can verify it now.', timestamp: '1m ago', read: false },
    ],
  },
  {
    id: 'c2', user: users[3], lastMessage: 'Trade completed successfully. Thanks for the smooth transaction!', timestamp: '1h ago', unread: 0, type: 'trade',
    messages: [
      { id: 'm6', senderId: 'me', text: 'Need a $50 Steam card. Available?', timestamp: '3h ago', read: true },
      { id: 'm7', senderId: 'u4', text: '$40 through escrow. Ready when you are.', timestamp: '2h ago', read: true },
      { id: 'm8', senderId: 'me', text: 'Confirmed. Funds sent to escrow.', timestamp: '2h ago', read: true },
      { id: 'm9', senderId: 'u4', text: 'Card uploaded. Please verify and release.', timestamp: '1h ago', read: true },
      { id: 'm10', senderId: 'me', text: 'Verified. Funds released.', timestamp: '1h ago', read: true },
      { id: 'm11', senderId: 'u4', text: 'Trade completed successfully. Thanks for the smooth transaction!', timestamp: '1h ago', read: true },
    ],
  },
  {
    id: 'c3', user: users[6], lastMessage: 'I have bulk iTunes and Xbox cards. What quantities do you need?', timestamp: '3h ago', unread: 1, type: 'personal',
    messages: [
      { id: 'm12', senderId: 'me', text: 'Hi, interested in bulk purchases. What do you have?', timestamp: '4h ago', read: true },
      { id: 'm13', senderId: 'u7', text: 'I have bulk iTunes and Xbox cards. What quantities do you need?', timestamp: '3h ago', read: false },
    ],
  },
  {
    id: 'c4', user: users[4], lastMessage: 'Welcome! Happy to help you get started with your first trade.', timestamp: '1d ago', unread: 0, type: 'personal',
    messages: [
      { id: 'm14', senderId: 'u5', text: 'Welcome! Happy to help you get started with your first trade.', timestamp: '1d ago', read: true },
      { id: 'm15', senderId: 'me', text: 'Thanks! Any advice for a new trader?', timestamp: '1d ago', read: true },
      { id: 'm16', senderId: 'u5', text: 'Always use escrow, check seller ratings, and start with smaller amounts. You\'ll build your reputation quickly.', timestamp: '1d ago', read: true },
    ],
  },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'trade', user: users[1], content: 'initiated an escrow trade with you', timestamp: '1m ago', read: false },
  { id: 'n2', type: 'like', user: users[3], content: 'liked your post', timestamp: '5m ago', read: false },
  { id: 'n3', type: 'follow', user: users[6], content: 'started following you', timestamp: '12m ago', read: false },
  { id: 'n4', type: 'system', user: users[0], content: 'Your trade #003 has been completed', timestamp: '1h ago', read: false },
  { id: 'n5', type: 'comment', user: users[4], content: 'commented on your post', timestamp: '2h ago', read: true },
  { id: 'n6', type: 'trade', user: users[7], content: 'sent you a trade offer', timestamp: '3h ago', read: true },
  { id: 'n7', type: 'like', user: users[2], content: 'liked your marketplace listing', timestamp: '5h ago', read: true },
  { id: 'n8', type: 'system', user: users[0], content: 'Your account verification is complete', timestamp: '1d ago', read: true },
];

export const brandMeta: Record<string, { icon: string; gradient: string }> = {
  Amazon: { icon: 'A', gradient: 'linear-gradient(135deg, #FF9900, #e88b00)' },
  Steam: { icon: 'S', gradient: 'linear-gradient(135deg, #1b2838, #2a475e)' },
  iTunes: { icon: 'i', gradient: 'linear-gradient(135deg, #fc3c44, #d63384)' },
  'Google Play': { icon: 'G', gradient: 'linear-gradient(135deg, #01875f, #34a853)' },
  Nike: { icon: 'N', gradient: 'linear-gradient(135deg, #111, #333)' },
  Sephora: { icon: 'S', gradient: 'linear-gradient(135deg, #111, #444)' },
  Xbox: { icon: 'X', gradient: 'linear-gradient(135deg, #107C10, #1a9f1a)' },
  PlayStation: { icon: 'P', gradient: 'linear-gradient(135deg, #003087, #0050c8)' },
  Netflix: { icon: 'N', gradient: 'linear-gradient(135deg, #E50914, #b81d24)' },
  Spotify: { icon: 'S', gradient: 'linear-gradient(135deg, #1DB954, #169c46)' },
  eBay: { icon: 'e', gradient: 'linear-gradient(135deg, #E53238, #f5af02)' },
  Walmart: { icon: 'W', gradient: 'linear-gradient(135deg, #0071CE, #004c91)' },
};

export function fmt(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}
