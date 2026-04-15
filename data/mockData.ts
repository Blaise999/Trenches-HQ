export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  verified: boolean;
  online: boolean;
  joinDate: string;
  trades: number;
  rating: number;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  reposts: number;
  timestamp: string;
  liked?: boolean;
  reposted?: boolean;
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
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'trade' | 'mention' | 'repost';
  user: User;
  content: string;
  timestamp: string;
  read: boolean;
  postId?: string;
}

const avatarSeeds = [
  'Felix', 'Aneka', 'Buster', 'Luna', 'Sasha', 'Milo', 'Zara', 'Kai', 'Nia', 'Leo',
  'Maya', 'Tunde', 'Chioma', 'Emeka', 'Aisha', 'Kola', 'Funke', 'Segun', 'Bola', 'Ade',
];

export const users: User[] = [
  {
    id: 'u1',
    username: 'trenchking',
    displayName: 'Trench King 👑',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeeds[0]}`,
    bio: 'Building in the trenches. Gift card OG. 100+ successful trades.',
    followers: 12400,
    following: 340,
    posts: 892,
    verified: true,
    online: true,
    joinDate: 'Jan 2024',
    trades: 156,
    rating: 4.9,
  },
  {
    id: 'u2',
    username: 'cardqueen_ng',
    displayName: 'Card Queen 💳',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeeds[1]}`,
    bio: 'Your plug for Amazon & Steam cards. Fast delivery. DM for rates 📩',
    followers: 8200,
    following: 512,
    posts: 443,
    verified: true,
    online: true,
    joinDate: 'Mar 2024',
    trades: 210,
    rating: 4.8,
  },
  {
    id: 'u3',
    username: 'hustler_vibes',
    displayName: 'Hustler Vibes 💰',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeeds[2]}`,
    bio: 'Making moves. Trading cards since day 1.',
    followers: 3400,
    following: 180,
    posts: 234,
    verified: false,
    online: false,
    joinDate: 'Jun 2024',
    trades: 67,
    rating: 4.5,
  },
  {
    id: 'u4',
    username: 'naija_trader',
    displayName: 'Naija Trader 🇳🇬',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeeds[3]}`,
    bio: 'Best rates in the game. Verified seller. No scam zone.',
    followers: 15800,
    following: 220,
    posts: 1102,
    verified: true,
    online: true,
    joinDate: 'Dec 2023',
    trades: 340,
    rating: 4.95,
  },
  {
    id: 'u5',
    username: 'crypto_chi',
    displayName: 'CryptoChi ⚡',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeeds[4]}`,
    bio: 'Crypto + Gift Cards = Freedom. Let\'s trade!',
    followers: 6700,
    following: 890,
    posts: 567,
    verified: true,
    online: false,
    joinDate: 'Feb 2024',
    trades: 120,
    rating: 4.7,
  },
  {
    id: 'u6',
    username: 'gift_plug',
    displayName: 'The Gift Plug 🔌',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeeds[5]}`,
    bio: 'Your number one plug for gift cards. All brands available.',
    followers: 4500,
    following: 300,
    posts: 320,
    verified: false,
    online: true,
    joinDate: 'May 2024',
    trades: 89,
    rating: 4.6,
  },
  {
    id: 'u7',
    username: 'bigwale',
    displayName: 'Big Wale 🐋',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeeds[6]}`,
    bio: 'Whale moves only. Big trades, big wins.',
    followers: 22000,
    following: 150,
    posts: 1500,
    verified: true,
    online: true,
    joinDate: 'Nov 2023',
    trades: 500,
    rating: 4.98,
  },
  {
    id: 'u8',
    username: 'tradewithada',
    displayName: 'Ada Trades 💎',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeeds[7]}`,
    bio: 'Verified trader. Fast and reliable. iTunes, Google Play, Amazon.',
    followers: 9100,
    following: 440,
    posts: 670,
    verified: true,
    online: false,
    joinDate: 'Jan 2024',
    trades: 190,
    rating: 4.85,
  },
  {
    id: 'u9',
    username: 'streetz_og',
    displayName: 'Streetz OG 🔥',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeeds[8]}`,
    bio: 'From the trenches to the top. Content creator & trader.',
    followers: 18000,
    following: 620,
    posts: 2100,
    verified: true,
    online: true,
    joinDate: 'Oct 2023',
    trades: 78,
    rating: 4.3,
  },
  {
    id: 'u10',
    username: 'moneymoves_',
    displayName: 'Money Moves 💵',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeeds[9]}`,
    bio: 'All about the paper. Trading gift cards & building wealth.',
    followers: 5400,
    following: 310,
    posts: 412,
    verified: false,
    online: true,
    joinDate: 'Apr 2024',
    trades: 45,
    rating: 4.4,
  },
];

export const currentUser: User = {
  id: 'me',
  username: 'trenches_user',
  displayName: 'You',
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser`,
  bio: 'Welcome to the Trenches. New trader looking to make moves.',
  followers: 124,
  following: 89,
  posts: 12,
  verified: false,
  online: true,
  joinDate: 'Apr 2026',
  trades: 3,
  rating: 5.0,
};

export const posts: Post[] = [
  {
    id: 'p1',
    user: users[0],
    content: '🔥 Just completed my 150th trade on Trenches HQ! This platform is different. The escrow system is solid and I\'ve never had a single issue. If you\'re not trading here, you\'re missing out fr.',
    likes: 342,
    comments: 67,
    reposts: 45,
    timestamp: '2m ago',
    liked: false,
  },
  {
    id: 'p2',
    user: users[1],
    content: '📢 FLASH SALE! Amazon gift cards at 85% rate for the next 2 hours. DM me or check my marketplace listing. Limited stock! First come first served 🏃‍♀️💨',
    likes: 128,
    comments: 89,
    reposts: 34,
    timestamp: '15m ago',
  },
  {
    id: 'p3',
    user: users[3],
    content: 'The trust system on Trenches HQ is actually genius. You can see everyone\'s trade history, ratings, and reviews before you even start negotiating. No more getting scammed by random traders. This is what we needed! 💯',
    likes: 567,
    comments: 123,
    reposts: 89,
    timestamp: '1h ago',
    liked: true,
  },
  {
    id: 'p4',
    user: users[8],
    content: 'New to the platform and I\'m already impressed. Made 3 trades in my first week, all smooth. The chat system makes negotiation so easy. Big ups to the team building this 🙌',
    image: 'https://picsum.photos/seed/trade1/600/400',
    likes: 234,
    comments: 45,
    reposts: 23,
    timestamp: '2h ago',
  },
  {
    id: 'p5',
    user: users[4],
    content: 'Hot take: Gift card trading is going to be bigger than crypto in Africa. The demand is insane and platforms like Trenches HQ are making it accessible to everyone. Watch this space 👀🚀',
    likes: 891,
    comments: 234,
    reposts: 156,
    timestamp: '3h ago',
    reposted: true,
  },
  {
    id: 'p6',
    user: users[6],
    content: 'Just sold $5,000 worth of Steam cards in under 30 minutes. The liquidity on this platform is unmatched. Whale approved 🐋✅',
    likes: 1200,
    comments: 340,
    reposts: 210,
    timestamp: '4h ago',
  },
  {
    id: 'p7',
    user: users[7],
    content: 'Tips for new traders on Trenches HQ:\n\n1. Always verify the card before trading\n2. Use the escrow system\n3. Check seller ratings\n4. Start with small trades\n5. Build your reputation\n\nStay safe out there! 🛡️',
    likes: 456,
    comments: 78,
    reposts: 112,
    timestamp: '5h ago',
    liked: true,
  },
  {
    id: 'p8',
    user: users[5],
    content: 'Who needs iTunes cards? I got $100, $200, and $500 denominations. Best rates guaranteed. Check my reviews - 89 successful trades and counting! 📱🎵',
    likes: 98,
    comments: 56,
    reposts: 12,
    timestamp: '6h ago',
  },
  {
    id: 'p9',
    user: users[9],
    content: 'The Trenches HQ community is growing fast! Went from 500 to 10K users in just 2 months. Early adopters are eating good rn. Get in while it\'s still early 📈',
    likes: 678,
    comments: 190,
    reposts: 87,
    timestamp: '8h ago',
  },
  {
    id: 'p10',
    user: users[2],
    content: 'Finally a platform where I don\'t have to worry about getting scammed. The escrow system holds funds until both parties confirm. This is how trading should be done. Period. 🔒',
    likes: 345,
    comments: 67,
    reposts: 43,
    timestamp: '12h ago',
  },
];

export const giftCards: GiftCard[] = [
  {
    id: 'gc1',
    seller: users[1],
    brand: 'Amazon',
    value: 100,
    price: 85,
    discount: 15,
    currency: 'USD',
    category: 'Shopping',
    available: true,
    rating: 4.8,
    totalSales: 210,
  },
  {
    id: 'gc2',
    seller: users[3],
    brand: 'Steam',
    value: 50,
    price: 40,
    discount: 20,
    currency: 'USD',
    category: 'Gaming',
    available: true,
    rating: 4.9,
    totalSales: 340,
  },
  {
    id: 'gc3',
    seller: users[6],
    brand: 'iTunes',
    value: 200,
    price: 170,
    discount: 15,
    currency: 'USD',
    category: 'Entertainment',
    available: true,
    rating: 4.98,
    totalSales: 500,
  },
  {
    id: 'gc4',
    seller: users[7],
    brand: 'Google Play',
    value: 50,
    price: 42,
    discount: 16,
    currency: 'USD',
    category: 'Entertainment',
    available: true,
    rating: 4.85,
    totalSales: 190,
  },
  {
    id: 'gc5',
    seller: users[4],
    brand: 'Nike',
    value: 100,
    price: 80,
    discount: 20,
    currency: 'USD',
    category: 'Shopping',
    available: true,
    rating: 4.7,
    totalSales: 120,
  },
  {
    id: 'gc6',
    seller: users[5],
    brand: 'Sephora',
    value: 75,
    price: 60,
    discount: 20,
    currency: 'USD',
    category: 'Beauty',
    available: true,
    rating: 4.6,
    totalSales: 89,
  },
  {
    id: 'gc7',
    seller: users[0],
    brand: 'Xbox',
    value: 100,
    price: 82,
    discount: 18,
    currency: 'USD',
    category: 'Gaming',
    available: true,
    rating: 4.9,
    totalSales: 156,
  },
  {
    id: 'gc8',
    seller: users[2],
    brand: 'Walmart',
    value: 150,
    price: 130,
    discount: 13,
    currency: 'USD',
    category: 'Shopping',
    available: false,
    rating: 4.5,
    totalSales: 67,
  },
  {
    id: 'gc9',
    seller: users[8],
    brand: 'PlayStation',
    value: 50,
    price: 42,
    discount: 16,
    currency: 'USD',
    category: 'Gaming',
    available: true,
    rating: 4.3,
    totalSales: 78,
  },
  {
    id: 'gc10',
    seller: users[9],
    brand: 'Netflix',
    value: 30,
    price: 25,
    discount: 17,
    currency: 'USD',
    category: 'Entertainment',
    available: true,
    rating: 4.4,
    totalSales: 45,
  },
  {
    id: 'gc11',
    seller: users[3],
    brand: 'eBay',
    value: 200,
    price: 168,
    discount: 16,
    currency: 'USD',
    category: 'Shopping',
    available: true,
    rating: 4.95,
    totalSales: 340,
  },
  {
    id: 'gc12',
    seller: users[6],
    brand: 'Spotify',
    value: 60,
    price: 48,
    discount: 20,
    currency: 'USD',
    category: 'Entertainment',
    available: true,
    rating: 4.98,
    totalSales: 500,
  },
];

export const conversations: Conversation[] = [
  {
    id: 'c1',
    user: users[1],
    lastMessage: 'Sure, I can do $85 for the $100 Amazon card. Sending details now...',
    timestamp: '2m ago',
    unread: 3,
    messages: [
      { id: 'm1', senderId: 'me', text: 'Hey! I saw your Amazon card listing. Is it still available?', timestamp: '10m ago', read: true },
      { id: 'm2', senderId: 'u2', text: 'Yes it is! $100 Amazon card. What rate are you offering?', timestamp: '8m ago', read: true },
      { id: 'm3', senderId: 'me', text: 'I can do $85. Is that cool?', timestamp: '5m ago', read: true },
      { id: 'm4', senderId: 'u2', text: 'Sure, I can do $85 for the $100 Amazon card. Sending details now...', timestamp: '2m ago', read: false },
      { id: 'm5', senderId: 'u2', text: 'I\'ve initiated the escrow. Please confirm on your end 🔒', timestamp: '1m ago', read: false },
      { id: 'm6', senderId: 'u2', text: 'Let me know when you\'re ready!', timestamp: 'just now', read: false },
    ],
  },
  {
    id: 'c2',
    user: users[3],
    lastMessage: 'Trade completed! Thanks for the smooth transaction 🤝',
    timestamp: '1h ago',
    unread: 0,
    messages: [
      { id: 'm7', senderId: 'me', text: 'Hey Naija Trader, I need a Steam card', timestamp: '3h ago', read: true },
      { id: 'm8', senderId: 'u4', text: 'Got you fam! $50 Steam at $40. Interested?', timestamp: '2h ago', read: true },
      { id: 'm9', senderId: 'me', text: 'Deal! Let\'s go through escrow', timestamp: '2h ago', read: true },
      { id: 'm10', senderId: 'u4', text: 'Escrow initiated. Card details sent.', timestamp: '1h ago', read: true },
      { id: 'm11', senderId: 'me', text: 'Card verified. Releasing funds now.', timestamp: '1h ago', read: true },
      { id: 'm12', senderId: 'u4', text: 'Trade completed! Thanks for the smooth transaction 🤝', timestamp: '1h ago', read: true },
    ],
  },
  {
    id: 'c3',
    user: users[6],
    lastMessage: 'I have iTunes, Steam, and Xbox cards. What do you need?',
    timestamp: '3h ago',
    unread: 1,
    messages: [
      { id: 'm13', senderId: 'me', text: 'Hey Big Wale! What cards do you have available?', timestamp: '4h ago', read: true },
      { id: 'm14', senderId: 'u7', text: 'I have iTunes, Steam, and Xbox cards. What do you need?', timestamp: '3h ago', read: false },
    ],
  },
  {
    id: 'c4',
    user: users[8],
    lastMessage: 'Yo! Welcome to the Trenches! Let me know if you need any help getting started 💪',
    timestamp: '1d ago',
    unread: 0,
    messages: [
      { id: 'm15', senderId: 'u9', text: 'Yo! Welcome to the Trenches! Let me know if you need any help getting started 💪', timestamp: '1d ago', read: true },
      { id: 'm16', senderId: 'me', text: 'Thanks! Appreciate the welcome. Any tips for a newbie?', timestamp: '1d ago', read: true },
      { id: 'm17', senderId: 'u9', text: 'Start small, build your rating, and always use escrow. You\'ll be fine!', timestamp: '1d ago', read: true },
    ],
  },
  {
    id: 'c5',
    user: users[4],
    lastMessage: 'The crypto market is wild today. Gift cards are the safer play rn 😂',
    timestamp: '2d ago',
    unread: 0,
    messages: [
      { id: 'm18', senderId: 'u5', text: 'Hey, you trading today?', timestamp: '2d ago', read: true },
      { id: 'm19', senderId: 'me', text: 'Maybe, what\'s the market like?', timestamp: '2d ago', read: true },
      { id: 'm20', senderId: 'u5', text: 'The crypto market is wild today. Gift cards are the safer play rn 😂', timestamp: '2d ago', read: true },
    ],
  },
];

export const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'like',
    user: users[3],
    content: 'liked your post about trading tips',
    timestamp: '1m ago',
    read: false,
  },
  {
    id: 'n2',
    type: 'follow',
    user: users[6],
    content: 'started following you',
    timestamp: '5m ago',
    read: false,
  },
  {
    id: 'n3',
    type: 'trade',
    user: users[1],
    content: 'wants to trade a $100 Amazon card with you',
    timestamp: '10m ago',
    read: false,
  },
  {
    id: 'n4',
    type: 'comment',
    user: users[8],
    content: 'commented on your post: "Great advice for beginners!"',
    timestamp: '30m ago',
    read: false,
  },
  {
    id: 'n5',
    type: 'mention',
    user: users[4],
    content: 'mentioned you in a post about new traders',
    timestamp: '1h ago',
    read: true,
  },
  {
    id: 'n6',
    type: 'repost',
    user: users[7],
    content: 'reposted your marketplace listing',
    timestamp: '2h ago',
    read: true,
  },
  {
    id: 'n7',
    type: 'like',
    user: users[9],
    content: 'liked your comment on gift card rates',
    timestamp: '3h ago',
    read: true,
  },
  {
    id: 'n8',
    type: 'trade',
    user: users[5],
    content: 'completed a trade with you — leave a review!',
    timestamp: '5h ago',
    read: true,
  },
  {
    id: 'n9',
    type: 'follow',
    user: users[2],
    content: 'started following you',
    timestamp: '1d ago',
    read: true,
  },
  {
    id: 'n10',
    type: 'like',
    user: users[0],
    content: 'liked your profile update',
    timestamp: '2d ago',
    read: true,
  },
];

export const trendingTopics = [
  { tag: '#AmazonDeals', posts: '2.4K' },
  { tag: '#SteamSale', posts: '1.8K' },
  { tag: '#GiftCardTrading', posts: '5.1K' },
  { tag: '#TrenchesHQ', posts: '12K' },
  { tag: '#P2PTrading', posts: '890' },
  { tag: '#CryptoToCards', posts: '3.2K' },
  { tag: '#SecureTrading', posts: '1.1K' },
  { tag: '#iTunesCards', posts: '760' },
];

export const brandColors: Record<string, string> = {
  Amazon: '#FF9900',
  Steam: '#1b2838',
  iTunes: '#EA4CC0',
  'Google Play': '#01875f',
  Nike: '#111111',
  Sephora: '#000000',
  Xbox: '#107C10',
  Walmart: '#0071CE',
  PlayStation: '#003087',
  Netflix: '#E50914',
  eBay: '#E53238',
  Spotify: '#1DB954',
};

export const brandIcons: Record<string, string> = {
  Amazon: '📦',
  Steam: '🎮',
  iTunes: '🎵',
  'Google Play': '▶️',
  Nike: '👟',
  Sephora: '💄',
  Xbox: '🎯',
  Walmart: '🏪',
  PlayStation: '🕹️',
  Netflix: '🎬',
  eBay: '🛒',
  Spotify: '🎧',
};

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}
