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

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string; // Full-time, Part-time, etc.
  postedAgo: string;
  description: string;
  requirements: string[];
  benefits: string[];
  logoColor: string;
  applied: boolean;
}

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
  type: "cheer" | "comment" | "view" | "job" | "connection";
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
  jobs: Job[];
  connections: Connection[];
  threads: ChatThread[];
  notifications: NotificationItem[];
  
  // Actions
  addPost: (content: string, image?: string, recipe?: Recipe) => void;
  cheerPost: (postId: string) => void;
  sharePost: (postId: string) => void;
  addComment: (postId: string, commentText: string) => void;
  applyToJob: (jobId: string) => void;
  toggleConnection: (id: string) => void;
  sendMessage: (threadId: string, text: string) => void;
  markNotificationsAsRead: () => void;
  updateProfile: (updatedProfile: Partial<UserProfile>) => void;
}

export const useDrinkedInStore = create<DrinkedInState>((set) => ({
  profile: {
    name: "Marcus Vane",
    title: "Beverage Director & Award-Winning Mixologist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop",
    location: "London, England, United Kingdom",
    connectionsCount: 842,
    profileViews: 147,
    postImpressions: 3420,
    about: "Passionate beverage architect with 10+ years of experience curating world-class cocktail programs and training elite bar staff. Specializing in molecular mixology, culinary-driven cocktails, and zero-waste bar programs. Certified Sommelier and spirits educator.",
    skills: [
      "Molecular Mixology",
      "Menu Engineering",
      "Spirits Education",
      "Bar Management & Inventory",
      "Zero-Waste Programs",
      "Staff Training",
      "Flavor Pairing"
    ],
    experience: [
      {
        id: "exp-1",
        role: "Beverage Director",
        company: "The Velvet Shaker Lounge",
        duration: "2023 - Present",
        description: "Directing the beverage operations for an upscale Soho lounge. Curated an 18-drink signature cocktail menu focusing on local botanicals, resulting in a 24% increase in spirit sales. Leading a team of 12 bartenders and 4 barbacks.",
        location: "London, UK"
      },
      {
        id: "exp-2",
        role: "Head Mixologist",
        company: "Neon Distillery & Bar",
        duration: "2020 - 2023",
        description: "Pioneered a zero-waste cocktail menu that repurposed bar prep scraps into bitters, cordials, and garnishes. Awarded 'Best New Cocktail Program' in London Spirit Awards 2022.",
        location: "London, UK"
      }
    ],
    education: [
      {
        id: "edu-1",
        school: "Wine & Spirit Education Trust (WSET)",
        degree: "Level 3 Award in Spirits",
        duration: "2019 - 2020"
      },
      {
        id: "edu-2",
        school: "University of London",
        degree: "Bachelor of Science in Food Science & Chemistry",
        duration: "2015 - 2018"
      }
    ]
  },
  
  posts: [
    {
      id: "post-1",
      authorName: "Elena Rostova",
      authorTitle: "Master Sommelier & Wine Consultant",
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
          authorTitle: "Cellar Master at Le Bristol",
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
      authorTitle: "Head Brewer at Sakura Craft Brewery",
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
      authorTitle: "Beverage Director & Award-Winning Mixologist",
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
          authorTitle: "Global Brand Ambassador | Gin de France",
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
      authorTitle: "Talent Acquisition Lead | Liquid Hospitality Group",
      authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
      timeAgo: "2d",
      content: "We are expanding! Liquid Hospitality is seeking a passionate Head Mixologist to lead the team at our newest secret venue, 'The Copper Still', opening soon in Soho. If you have a flair for menu development, team leadership, and creative presentations, let's talk! Check out the Jobs tab to apply directly.",
      likes: 56,
      commentsCount: 4,
      comments: [],
      shares: 9,
      cheered: false
    }
  ],
  
  jobs: [
    {
      id: "job-1",
      title: "Head Mixologist & Bar Manager",
      company: "The Copper Still (Liquid Hospitality)",
      location: "Soho, London, UK",
      salary: "£42,000 - £48,000 / year + service charge",
      type: "Full-time",
      postedAgo: "2 days ago",
      description: "We are seeking an innovative Head Mixologist to lead our cocktail program. You will be responsible for creating quarterly seasonal menus, maintaining a 21% beverage cost, managing supplier relationships, and leading a dynamic team of 8 bartenders. Experience in high-volume, high-end cocktail bars is a must.",
      requirements: [
        "Minimum 3 years in a Head Bartender or Bar Manager role.",
        "Proven menu engineering experience with visual portfolio.",
        "Strong knowledge of inventory management systems and cost control.",
        "Passion for mentorship and staff development."
      ],
      benefits: [
        "Excellent gratuity package (TRONC).",
        "28 days paid holiday.",
        "Supplier masterclasses and international education trips.",
        "Generous staff discount across all 6 group venues."
      ],
      logoColor: "bg-amber-600",
      applied: false
    },
    {
      id: "job-2",
      title: "Spirits Brand Ambassador",
      company: "Juniper & Co. Distillers",
      location: "London (Remote/Field)",
      salary: "£38,000 - £42,000 / year + bonus + travel allowance",
      type: "Full-time",
      postedAgo: "4 days ago",
      description: "Grow the footprint of our award-winning dry gin and botanical rum portfolios in London's premier establishments. You will conduct masterclasses, organize activation events, support bar teams with menu placements, and act as the local face of our brand.",
      requirements: [
        "Previous experience in spirits brand advocacy or high-end bartending.",
        "Excellent communication, presentation, and networking skills.",
        "Flexible schedule (includes evening activations and tastings).",
        "WSET Level 2 or 3 in Spirits is highly desirable."
      ],
      benefits: [
        "Uncapped performance bonus based on account acquisitions.",
        "Company laptop, phone, and unlimited tasting samples.",
        "Work from home flexibility.",
        "Fully funded WSET Level 3/Diploma courses."
      ],
      logoColor: "bg-emerald-700",
      applied: false
    },
    {
      id: "job-3",
      title: "Assistant Sommelier",
      company: "The Grand Grapes Restaurant (Michelin * )",
      location: "Mayfair, London, UK",
      salary: "£32,000 - £35,000 / year + tips",
      type: "Full-time",
      postedAgo: "1 week ago",
      description: "Work alongside our Head Sommelier to manage a cellar of over 1,200 references. You will advise guests on pairings, ensure optimal storage temperatures, manage inventory, and assist in curating our premium wine-by-the-glass program.",
      requirements: [
        "Certified Sommelier status (Court of Master Sommeliers or equivalent).",
        "Experience in fine dining or Michelin-starred environments.",
        "Impeccable table service etiquette and customer relations.",
        "Willingness to learn and grow within an elite wine team."
      ],
      benefits: [
        "Share of service charge.",
        "Regular tastings with global winemakers.",
        "Uniform provided and dry-cleaned.",
        "Clear path to Senior Sommelier role."
      ],
      logoColor: "bg-purple-800",
      applied: false
    },
    {
      id: "job-4",
      title: "Craft Cider Specialist & Assistant Brewer",
      company: "Hops & Apples Orchard Co.",
      location: "Bristol, UK",
      salary: "£28,000 - £31,000 / year",
      type: "Full-time",
      postedAgo: "5 days ago",
      description: "Join our fermentation team! Responsible for operating pressing equipment, monitoring fermentation temperatures, logging density metrics, preparing kegging runs, and developing experimental fruit-infused ciders.",
      requirements: [
        "General Certificate in Brewing or Cider-making.",
        "Physical stamina (ability to lift 25kg kegs).",
        "Experience with chemical sanitation protocols (CIP).",
        "Keen sensory palate and fermentation curiosity."
      ],
      benefits: [
        "Free cider allocation (1 case/month).",
        "Overtime opportunities at time-and-a-half.",
        "Private healthcare cover.",
        "On-site gym and parking."
      ],
      logoColor: "bg-red-700",
      applied: false
    }
  ],
  
  connections: [
    {
      id: "conn-1",
      name: "Claire Dupont",
      title: "Global Brand Ambassador | Gin de France",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      mutualConnections: 18,
      status: "connected"
    },
    {
      id: "conn-2",
      name: "Arthur Pendelton",
      title: "Cellar Master at Le Bristol",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      mutualConnections: 5,
      status: "connected"
    },
    {
      id: "conn-3",
      name: "Danielle Vance",
      title: "Whisky Distillery Manager at GlenCairn",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      mutualConnections: 31,
      status: "none"
    },
    {
      id: "conn-4",
      name: "Vikram Mehta",
      title: "Consultant Mixologist & Bar Consultant",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
      mutualConnections: 12,
      status: "none"
    },
    {
      id: "conn-5",
      name: "Sofia Gatti",
      title: "Italian Craft Beer Distributor",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      mutualConnections: 8,
      status: "pending"
    },
    {
      id: "conn-6",
      name: "Robert 'Rusty' Miller",
      title: "Flair Bartending Champion & Performer",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
      mutualConnections: 45,
      status: "none"
    }
  ],
  
  threads: [
    {
      id: "chat-1",
      partnerName: "Claire Dupont",
      partnerTitle: "Global Brand Ambassador | Gin de France",
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
      partnerTitle: "Cellar Master at Le Bristol",
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
      text: "Liquid Hospitality Group recruiters viewed your profile. They are hiring mixologists in Soho!",
      time: "1d ago",
      read: true,
      link: "/jobs"
    },
    {
      id: "n-4",
      type: "connection",
      actorName: "Sofia Gatti",
      actorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      text: "sent you a connection request.",
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
  
  applyToJob: (jobId) => set((state) => ({
    jobs: state.jobs.map((job) => 
      job.id === jobId ? { ...job, applied: true } : job
    )
  })),
  
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
