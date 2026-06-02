import { create } from "zustand";

export interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  glass?: string;
  garnish?: string;
}

export interface PostComment {
  id: string;
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  content: string;
  time: string;
}

export interface Post {
  id: string;
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  image?: string;
  recipe?: Recipe;
  likes: number;
  commentsCount: number;
  comments: PostComment[];
  shares: number;
  cheered: boolean;
  shared?: boolean;
}

// Job interfaces removed as careers are disabled

export interface Connection {
  id: string;
  name: string;
  title: string;
  avatar: string;
  mutualConnections: number;
  status: "none" | "pending" | "connected";
}

export interface ChatMessage {
  id: string;
  senderId: "me" | "them";
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  partnerName: string;
  partnerTitle: string;
  partnerAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  messages: ChatMessage[];
  unread: boolean;
}

export interface NotificationItem {
  id: string;
  type: "cheer" | "comment" | "view" | "connection";
  actorName?: string;
  actorAvatar?: string;
  text: string;
  time: string;
  read: boolean;
  link?: string;
}

export interface UserProfile {
  name: string;
  title: string;
  avatar: string;
  coverPhoto: string;
  location: string;
  connectionsCount: number;
  profileViews: number;
  postImpressions: number;
  about: string;
  skills: string[];
  experience: {
    id: string;
    role: string;
    company: string;
    duration: string;
    description: string;
    location: string;
  }[];
  education: {
    id: string;
    school: string;
    degree: string;
    duration: string;
  }[];
}

interface DrinkedInState {
  profile: UserProfile;
  posts: Post[];
  connections: Connection[];
  threads: ChatThread[];
  notifications: NotificationItem[];
  
  // Actions
  addPost: (content: string, image?: string, recipe?: Recipe) => void;
  cheerPost: (postId: string) => void;
  sharePost: (postId: string) => void;
  addComment: (postId: string, commentText: string) => void;
  toggleConnection: (id: string) => void;
  sendMessage: (threadId: string, text: string) => void;
  markNotificationsAsRead: () => void;
  updateProfile: (updatedProfile: Partial<UserProfile>) => void;
}

export const useDrinkedInStore = create<DrinkedInState>((set) => ({
  profile: {
    name: "Marcus Vane",
    title: "3-Second Pint Chugger & Tuesday Hangover Legend",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop",
    location: "London, England, United Kingdom",
    connectionsCount: 842,
    profileViews: 147,
    postImpressions: 3420,
    about: "Passionate table climber with 10+ years of high-volume liver destruction. Specializing in convincing bartenders to pour free shots, midnight karaoke, and surviving morning meetings on 2 hours of sleep. Doctorate in Liver Tolerance and spirits consumption.",
    skills: [
      "Dry Gulping",
      "Spelling while wasted",
      "Confronting Exes",
      "Finding Lost Keys",
      "Convincing others to buy rounds",
      "Sneaking out of bad dates",
      "Table Dancing"
    ],
    experience: [
      {
        id: "exp-1",
        role: "Chief Pint Exec (CPE)",
        company: "The Golden Beer Mug Pub",
        duration: "2023 - Present",
        description: "Successfully chugged 5 Guinness pints in under 20 seconds. Led a team of 4 lightweight buddies home safely without losing anyone's shoes.",
        location: "London, UK"
      },
      {
        id: "exp-2",
        role: "Vodka Shot Coordinator",
        company: "The Double Spill Lounge",
        duration: "2020 - 2023",
        description: "Convinced the head bartender to pour 12 rounds of free Tequila shots. Survived the subsequent Wednesday morning budget presentation.",
        location: "London, UK"
      }
    ],
    education: [
      {
        id: "edu-1",
        school: "University of Hard Knocks",
        degree: "Doctorate in Liver Tolerance",
        duration: "2019 - Present"
      },
      {
        id: "edu-2",
        school: "Local Irish Pub Academy",
        degree: "Master of Rum & Regrets",
        duration: "2015 - 2018"
      }
    ]
  },
  
  posts: [
    {
      id: "post-1",
      authorName: "Elena Rostova",
      authorTitle: "Wine Chugging Champion & Box Wine Connoisseur",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      timeAgo: "2h",
      content: "Thrilled to share my latest article on pairing high-acid white wines with modern fusion dishes. In particular, German Dry Rieslings can cut through rich, spicy flavor profiles like nothing else. What are your thoughts on pairing Rieslings with modern Sichuan cuisine?",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop",
      likes: 42,
      commentsCount: 8,
      comments: [
        {
          id: "c-1",
          authorName: "Arthur Pendelton",
          authorTitle: "Grape Juice Enthusiast & Cellar Robber",
          authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
          content: "Completely agree, Elena! The residual sugar and high acidity balance the Sichuan peppercorn heat beautifully.",
          time: "1h ago"
        }
      ],
      shares: 3,
      cheered: false
    },
    {
      id: "post-2",
      authorName: "Kenji Sato",
      authorTitle: "Homebrew Disaster Maker & Yeast Informant",
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
      timeAgo: "5h",
      content: "After months of experimenting, our Yuzu-infused Hazy IPA is finally in the barrels! Brewed with Citra and Mosaic hops and fresh organic yuzu peel sourced directly from Kochi Prefecture. Clean, citrus-forward, with a velvety mouthfeel. Launching next Friday in the taproom!",
      image: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?q=80&w=800&auto=format&fit=crop",
      likes: 89,
      commentsCount: 15,
      comments: [],
      shares: 12,
      cheered: true
    },
    {
      id: "post-3",
      authorName: "Marcus Vane",
      authorTitle: "3-Second Pint Chugger & Tuesday Hangover Legend",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      timeAgo: "1d",
      content: "Just finalized the new signature cocktail for the Summer Solstice menu: The Smoked Apricot Sour. The secret is grilling the apricots over oak wood before pureeing. Here is the recipe for anyone looking to try this behind their own bar. Feedback welcome!",
      recipe: {
        name: "Smoked Apricot Sour",
        ingredients: [
          "50ml Barrel-aged Gin (or Bourbon)",
          "25ml Fresh Lemon Juice",
          "20ml Grilled Apricot Puree",
          "15ml Smoked Rosemary Honey Syrup",
          "1 Egg White (or Aquafaba)",
          "2 dashes Cardamom Bitters"
        ],
        instructions: [
          "Add all ingredients to a shaker and dry shake (without ice) to emulsify the egg white.",
          "Add ice and wet shake vigorously until chilled.",
          "Double strain into a coupe glass.",
          "Garnish with a sprig of charred rosemary and a pinch of smoked sea salt."
        ],
        glass: "Coupe Glass",
        garnish: "Charred Rosemary Sprig & Smoked Salt"
      },
      likes: 124,
      commentsCount: 22,
      comments: [
        {
          id: "c-2",
          authorName: "Claire Dupont",
          authorTitle: "Gin-Induced Existentialist | Happy Hour Organizer",
          authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
          content: "Wow, Marcus! The honey rosemary syrup is a brilliant touch. I must try this with our barrel-reserve botanical gin.",
          time: "18h ago"
        }
      ],
      shares: 18,
      cheered: false
    },
    {
      id: "post-4",
      authorName: "Clara O'Connor",
      authorTitle: "Pub Crawler Coordinator & Drunk Text Enabler",
      authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
      timeAgo: "2d",
      content: "Last night was an absolute disaster at Midway Bar. Lost my left shoe, somehow ended up with a traffic cone in my living room, and sent 15 Drunk Texts to my ex. Anyone else ready for round 2 tonight?",
      likes: 56,
      commentsCount: 4,
      comments: [],
      shares: 9,
      cheered: false
    }
  ],
  

  
  connections: [
    {
      id: "conn-1",
      name: "Claire Dupont",
      title: "Gin-Induced Existentialist | Happy Hour Organizer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      mutualConnections: 18,
      status: "connected"
    },
    {
      id: "conn-2",
      name: "Arthur Pendelton",
      title: "Grape Juice Enthusiast & Cellar Robber",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      mutualConnections: 5,
      status: "connected"
    },
    {
      id: "conn-3",
      name: "Danielle Vance",
      title: "Whisky Guzzler & Fire-breather",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      mutualConnections: 31,
      status: "none"
    },
    {
      id: "conn-4",
      name: "Vikram Mehta",
      title: "Overpriced Water Seller & Cocktail Disapprover",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
      mutualConnections: 12,
      status: "none"
    },
    {
      id: "conn-5",
      name: "Sofia Gatti",
      title: "Pizza and Peroni Consumer | Bad Decisions Coordinator",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      mutualConnections: 8,
      status: "pending"
    },
    {
      id: "conn-6",
      name: "Robert 'Rusty' Miller",
      title: "Flair Glass Spiller & Bottle Dropper",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
      mutualConnections: 45,
      status: "none"
    }
  ],
  
  threads: [
    {
      id: "chat-1",
      partnerName: "Claire Dupont",
      partnerTitle: "Gin-Induced Existentialist | Happy Hour Organizer",
      partnerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      lastMessage: "Let's definitely schedule a tasting for next Thursday! Let me know if that works.",
      lastMessageTime: "Yesterday",
      unread: true,
      messages: [
        {
          id: "m-1",
          senderId: "them",
          text: "Hi Marcus, loved your post on the Smoked Apricot Sour. It looks spectacular!",
          timestamp: "Yesterday 2:30 PM"
        },
        {
          id: "m-2",
          senderId: "me",
          text: "Thanks Claire! It's been a big hit at the lounge. The wood notes really pair well with gin.",
          timestamp: "Yesterday 2:45 PM"
        },
        {
          id: "m-3",
          senderId: "them",
          text: "Let's definitely schedule a tasting for next Thursday! Let me know if that works.",
          timestamp: "Yesterday 3:02 PM"
        }
      ]
    },
    {
      id: "chat-2",
      partnerName: "Arthur Pendelton",
      partnerTitle: "Grape Juice Enthusiast & Cellar Robber",
      partnerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      lastMessage: "I will check with my distributor and let you know if we can ship a case.",
      lastMessageTime: "May 28",
      unread: false,
      messages: [
        {
          id: "m-4",
          senderId: "me",
          text: "Hi Arthur, do you have any of the 2015 Bordeaux reserves left in stock?",
          timestamp: "May 28 10:15 AM"
        },
        {
          id: "m-5",
          senderId: "them",
          text: "Let me check... yes, we have about two cases left in the cellar.",
          timestamp: "May 28 10:30 AM"
        },
        {
          id: "m-6",
          senderId: "me",
          text: "Perfect, could you set one aside? I have a regular guest requesting it next week.",
          timestamp: "May 28 10:32 AM"
        },
        {
          id: "m-7",
          senderId: "them",
          text: "I will check with my distributor and let you know if we can ship a case.",
          timestamp: "May 28 11:00 AM"
        }
      ]
    }
  ],
  
  notifications: [
    {
      id: "n-1",
      type: "cheer",
      actorName: "Elena Rostova",
      actorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      text: "cheered your Smoky Apricot Sour recipe post.",
      time: "2h ago",
      read: false,
      link: "/"
    },
    {
      id: "n-2",
      type: "comment",
      actorName: "Claire Dupont",
      actorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      text: "commented on your post: 'Wow, Marcus! The honey rosemary syrup is a...'",
      time: "18h ago",
      read: false,
      link: "/"
    },
    {
      id: "n-3",
      type: "view",
      text: "A group of drinkers at Midway Bar & Restaurant viewed your profile. They heard you can chug a pint in 3 seconds!",
      time: "1d ago",
      read: true,
      link: "/"
    },
    {
      id: "n-4",
      type: "connection",
      actorName: "Sofia Gatti",
      actorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      text: "sent you a bad influence alert.",
      time: "3d ago",
      read: true,
      link: "/network"
    }
  ],
  
  addPost: (content, image, recipe) => set((state) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorName: state.profile.name,
      authorTitle: state.profile.title,
      authorAvatar: state.profile.avatar,
      timeAgo: "Just now",
      content,
      image,
      recipe,
      likes: 0,
      commentsCount: 0,
      comments: [],
      shares: 0,
      cheered: false
    };
    return {
      posts: [newPost, ...state.posts],
      profile: {
        ...state.profile,
        postImpressions: state.profile.postImpressions + 50 // tiny gamification bump
      }
    };
  }),
  
  cheerPost: (postId) => set((state) => ({
    posts: state.posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.cheered ? post.likes - 1 : post.likes + 1,
          cheered: !post.cheered
        };
      }
      return post;
    })
  })),
  
  sharePost: (postId) => set((state) => ({
    posts: state.posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          shares: post.shared ? post.shares - 1 : post.shares + 1,
          shared: !post.shared
        };
      }
      return post;
    })
  })),
  
  addComment: (postId, commentText) => set((state) => {
    const newComment: PostComment = {
      id: `comment-${Date.now()}`,
      authorName: state.profile.name,
      authorTitle: state.profile.title,
      authorAvatar: state.profile.avatar,
      content: commentText,
      time: "Just now"
    };
    return {
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            commentsCount: post.commentsCount + 1,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    };
  }),
  
  toggleConnection: (id) => set((state) => {
    let connectionsCountDiff = 0;
    const nextConnections = state.connections.map((conn) => {
      if (conn.id === id) {
        let newStatus: "none" | "pending" | "connected" = "none";
        if (conn.status === "none") {
          newStatus = "pending";
        } else if (conn.status === "pending") {
          newStatus = "connected";
          connectionsCountDiff = 1;
        } else if (conn.status === "connected") {
          newStatus = "none";
          connectionsCountDiff = -1;
        }
        return { ...conn, status: newStatus };
      }
      return conn;
    });
    return {
      connections: nextConnections,
      profile: {
        ...state.profile,
        connectionsCount: state.profile.connectionsCount + connectionsCountDiff
      }
    };
  }),
  
  sendMessage: (threadId, text) => set((state) => ({
    threads: state.threads.map((thread) => {
      if (thread.id === threadId) {
        const newMsg: ChatMessage = {
          id: `msg-${Date.now()}`,
          senderId: "me",
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        return {
          ...thread,
          lastMessage: text,
          lastMessageTime: "Just now",
          messages: [...thread.messages, newMsg]
        };
      }
      return thread;
    })
  })),
  
  markNotificationsAsRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, read: true }))
  })),
  
  updateProfile: (updatedProfile) => set((state) => ({
    profile: { ...state.profile, ...updatedProfile }
  }))
}));
