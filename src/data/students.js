import { DEFAULT_AVATAR } from '../constants/avatarConstants'

const students = [
  {
    id: 's1',
    name: 'Rahman',
    college: 'State University',
    avatar: 'https://tse2.mm.bing.net/th/id/OIP.gjJJ7IaZbXsFTt8gzZyFcAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3',
    offered: ['React', 'JavaScript', 'Web Design'],
    wanted: ['Photoshop', 'UI/UX'],
    experience: 'Intermediate',
    rating: 4.7,
    availability: 'Weekends',
    bio: 'Passionate front-end dev teaching React and modern JS.',
    completed: 12,
    badges: ['Mentor', 'Top Rated'],
    contact: {
      email: 'rahman.skillswap@example.com',
      phone: '+1-555-210-4001',
      linkedin: 'https://www.linkedin.com/in/rahman-skill'
    }
  },
  {
    id: 's2',
    name: 'Sureshkumar',
    college: 'Art & Tech Institute',
    avatar:'https://png.pngtree.com/png-vector/20230903/ourmid/pngtree-man-avatar-isolated-png-image_9935818.png',
    offered: ['Photoshop', 'Illustrator', 'Branding'],
    wanted: ['React', 'TypeScript'],
    experience: 'Advanced',
    rating: 4.9,
    availability: 'Weekdays',
    bio: 'Designer focused on brand systems and product visuals.',
    completed: 24,
    badges: ['Designer', 'Pro'],
    contact: {
      email: 'sureshkumar.skillswap@example.com',
      phone: '+1-555-210-4002',
      linkedin: 'https://www.linkedin.com/in/sureshkumar-skill'
    }
  },
  {
    id: 's3',
    name: 'Aakash',
    college: 'Community College',
    avatar: 'https://static.vecteezy.com/system/resources/thumbnails/014/335/081/small_2x/man-with-dark-beard-icon-cartoon-style-vector.jpg',
    offered: ['Python', 'Data Analysis'],
    wanted: ['Video Editing', 'AI Tools'],
    experience: 'Beginner',
    rating: 4.5,
    availability: 'Evenings',
    bio: 'Learning data science, happy to teach Python basics.',
    completed: 5,
    badges: ['Learner'],
    contact: {
      email: 'aakash.skillswap@example.com',
      phone: '+1-555-210-4003',
      linkedin: 'https://www.linkedin.com/in/aakash-skill'
    }
  },
  {
    id: 's4',
    name: 'Priya',
    college: 'VIT Pune',
    avatar: 'https://img.freepik.com/premium-vector/default-female-user-profile-icon-vector-illustration_276184-169.jpg',
    offered: ['AI Tools', 'Prompt Engineering'],
    wanted: ['Marketing'],
    experience: 'Intermediate',
    rating: 4.8,
    availability: 'Flexible',
    bio: 'Exploring AI-assisted workflows and tools.',
    completed: 9,
    badges: ['AI Enthusiast'],
    contact: {
      email: 'priya.skillswap@example.com',
      phone: '+1-555-210-4004',
      linkedin: 'https://www.linkedin.com/in/priya-singh-skill'
    }
  },
  {
    id: 's5',
    name: 'Sweetha',
    college: 'NIT Trichy',
    avatar: 'https://tse2.mm.bing.net/th/id/OIP.s9D-E6sTsuMdA34N4AO8pgHaE8?w=750&h=500&rs=1&pid=ImgDetMain&o=7&rm=3',
    offered: ['Prompt Engineering'],
    wanted: ['Marketing'],
    experience: 'Intermediate',
    rating: 4.4,
    availability: 'Flexible',
    bio: 'Exploring training and tools.',
    completed: 9,
    badges: ['Best Prompt Engineer'],
    contact: {
      email: 'harini.skillswap@example.com',
      phone: '+1-555-210-4005',
      linkedin: 'https://www.linkedin.com/in/harini-skill'
    }
  },
  {
    id: 's6',
    name: 'Lakshmi',
    college: 'Anna University',
    avatar: 'https://img.freepik.com/free-vector/portrait-young-woman_23-2148807590.jpg',
    offered: ['HTML', 'CSS', 'Bootstrap'],
    wanted: ['React'],
    experience: 'Beginner',
    rating: 4.3,
    availability: 'Weekends',
    bio: 'Front-end learner from Tamil Nadu with a passion for clean UI.',
    completed: 7,
    badges: ['UI Builder'],
    contact: {
      email: 'lakshmi.skillswap@example.com',
      phone: '+91-44-555-210-6001',
      linkedin: 'https://www.linkedin.com/in/lakshmi-skill'
    }
  },
  {
    id: 's7',
    name: 'Harinii',
    college: 'IIT Madras',
    avatar: 'https://img.freepik.com/free-vector/young-man-profile-cartoon_18591-58475.jpg',
    offered: ['Python', 'Machine Learning'],
    wanted: ['Cloud'],
    experience: 'Advanced',
    rating: 4.9,
    availability: 'Flexible',
    bio: 'ML student ready to help peers with algorithms and data science.',
    completed: 18,
    badges: ['ML Mentor'],
    contact: {
      email: 'harinii.skillswap@example.com',
      phone: '+91-44-555-210-6002',
      linkedin: 'https://www.linkedin.com/in/harinii-skill'
    }
  },
  {
    id: 's8',
    name: 'Anjali',
    college: 'PSG College of Technology',
    avatar: 'https://img.freepik.com/free-vector/portrait-smiling-teenage-girl_23-2148807607.jpg',
    offered: ['UI/UX', 'Figma'],
    wanted: ['JavaScript'],
    experience: 'Intermediate',
    rating: 4.6,
    availability: 'Weekdays',
    bio: 'Design student from Coimbatore keen to collaborate on product ideas.',
    completed: 11,
    badges: ['Design Lead'],
    contact: {
      email: 'anjali.skillswap@example.com',
      phone: '+91-44-555-210-6003',
      linkedin: 'https://www.linkedin.com/in/anjali-skill'
    }
  },
  {
    id: 's9',
    name: 'Arun',
    college: 'SSN College of Engineering',
    avatar: 'https://img.freepik.com/free-vector/young-man-profile-cartoon_23-2148964200.jpg',
    offered: ['Java', 'Spring Boot'],
    wanted: ['React'],
    experience: 'Intermediate',
    rating: 4.5,
    availability: 'Evenings',
    bio: 'Backend developer focused on scalable services.',
    completed: 13,
    badges: ['Backend Pro'],
    contact: {
      email: 'arun.skillswap@example.com',
      phone: '+91-44-555-210-6004',
      linkedin: 'https://www.linkedin.com/in/arun-skill'
    }
  },
  {
    id: 's10',
    name: 'Meena',
    college: 'Thiagarajar College of Engineering',
    avatar: 'https://img.freepik.com/free-vector/happy-woman-avatar_53876-56507.jpg',
    offered: ['Digital Marketing', 'SEO'],
    wanted: ['Analytics'],
    experience: 'Intermediate',
    rating: 4.7,
    availability: 'Flexible',
    bio: 'Marketing student helping small teams grow online.',
    completed: 14,
    badges: ['Growth Partner'],
    contact: {
      email: 'meena.skillswap@example.com',
      phone: '+91-44-555-210-6005',
      linkedin: 'https://www.linkedin.com/in/meena-skill'
    }
  },
  {
    id: 's11',
    name: 'Nithya',
    college: 'Madras Christian College',
    avatar: 'https://img.freepik.com/free-vector/portrait-happy-young-woman_53876-56505.jpg',
    offered: ['Content Writing', 'Blogging'],
    wanted: ['SEO'],
    experience: 'Intermediate',
    rating: 4.5,
    availability: 'Weekends',
    bio: 'Creative communicator focused on storytelling and digital content.',
    completed: 10,
    badges: ['Content Creator'],
    contact: {
      email: 'nithya.skillswap@example.com',
      phone: '+91-44-555-210-6006',
      linkedin: 'https://www.linkedin.com/in/nithya-skill'
    }
  },
  {
    id: 's12',
    name: 'Vijay',
    college: 'Amrita Vishwa Vidyapeetham',
    avatar: 'https://img.freepik.com/free-vector/portrait-smiling-man_53876-56506.jpg',
    offered: ['C++', 'DSA'],
    wanted: ['Web Dev'],
    experience: 'Advanced',
    rating: 4.8,
    availability: 'Flexible',
    bio: 'Computer science student mentoring peers in algorithms and coding.',
    completed: 20,
    badges: ['Code Coach'],
    contact: {
      email: 'vijay.skillswap@example.com',
      phone: '+91-44-555-210-6007',
      linkedin: 'https://www.linkedin.com/in/vijay-skill'
    }
  },
  {
    id: 's13',
    name: 'MadhumithaBI',
    college: 'KMCH Institute of Science and Technology',
    avatar: 'https://img.freepik.com/free-vector/portrait-young-woman_53876-56508.jpg',
    offered: ['React', 'Frontend'],
    wanted: ['Figma'],
    experience: 'Intermediate',
    rating: 4.6,
    availability: 'Evenings',
    bio: 'Frontend developer who loves building interactive web apps.',
    completed: 12,
    badges: ['React Runner'],
    contact: {
      email: 'madhumithabi.skillswap@example.com',
      phone: '+91-44-555-210-6008',
      linkedin: 'https://www.linkedin.com/in/madhumithabi-skill'
    }
  },
  {
    id: 's14',
    name: 'Karthik',
    college: 'Madras Institute of Technology',
    avatar: 'https://img.freepik.com/free-vector/portrait-young-man_53876-56509.jpg',
    offered: ['Android', 'Kotlin'],
    wanted: ['UI/UX'],
    experience: 'Intermediate',
    rating: 4.4,
    availability: 'Weekdays',
    bio: 'App developer focused on mobile-first experiences.',
    completed: 9,
    badges: ['App Builder'],
    contact: {
      email: 'karthik.skillswap@example.com',
      phone: '+91-44-555-210-6009',
      linkedin: 'https://www.linkedin.com/in/karthik-skill'
    }
  },
  {
    id: 's15',
    name: 'Geetha',
    college: 'Bharathidasan University',
    avatar: 'https://img.freepik.com/free-vector/portrait-woman-avatar_53876-56511.jpg',
    offered: ['Analytics', 'Excel'],
    wanted: ['Python'],
    experience: 'Intermediate',
    rating: 4.7,
    availability: 'Flexible',
    bio: 'Student analyst helping teams turn data into action.',
    completed: 13,
    badges: ['Data Partner'],
    contact: {
      email: 'geetha.skillswap@example.com',
      phone: '+91-44-555-210-6010',
      linkedin: 'https://www.linkedin.com/in/geetha-skill'
    }
  },
  {
    id: 's16',
    name: 'Saravanan',
    college: 'Government College of Engineering, Salem',
    avatar: 'https://img.freepik.com/free-vector/portrait-young-man_53876-56510.jpg',
    offered: ['DevOps', 'Docker'],
    wanted: ['AWS'],
    experience: 'Intermediate',
    rating: 4.6,
    availability: 'Flexible',
    bio: 'Infrastructure student helping peers deploy and automate services.',
    completed: 11,
    badges: ['Ops Specialist'],
    contact: {
      email: 'saravanan.skillswap@example.com',
      phone: '+91-44-555-210-6011',
      linkedin: 'https://www.linkedin.com/in/saravanan-skill'
    }
  }
]

export default students
