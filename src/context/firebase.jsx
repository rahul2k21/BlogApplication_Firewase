
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword ,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth";

const dummyBlogs = [
  {
    id: 1,
    title: "Exploring the Magic of Morning Routines",
    coverImage: "https://picsum.photos/seed/blog1/600/400",
    description:
      "Discover how a powerful morning routine can set the tone for your entire day.",
    content: "Full content of the first blog post goes here...",
  },
  {
    id: 2,
    title: "The Power of Consistency in Daily Habits",
    coverImage: "https://picsum.photos/seed/blog2/600/400",
    description:
      "Small daily habits compound into massive success—here’s how to stay consistent.",
    content: "This is the complete write-up of the second blog post...",
  },
  {
    id: 3,
    title: "Mindful Tech: Balancing Screens and Sanity",
    coverImage: "https://picsum.photos/seed/blog3/600/400",
    description:
      "Tips and tools to stay productive and sane in a digital-first world.",
    content: "Here's everything about the third blog post...",
  },
  {
    id: 4,
    title: "The Beginner’s Guide to Journaling",
    coverImage: "https://picsum.photos/seed/blog4/600/400",
    description:
      "Unleash your thoughts, goals, and creativity through journaling.",
    content: "Detailed explanation in the fourth blog post...",
  },
  {
    id: 5,
    title: "Why Everyone is Talking About Plant-Based Living",
    coverImage: "https://picsum.photos/seed/blog5/600/400",
    description: "Explore the benefits of switching to a plant-based diet.",
    content: "Expanded content for the fifth blog post...",
  },
  {
    id: 6,
    title: "A Deep Dive into Minimalist Lifestyles",
    coverImage: "https://picsum.photos/seed/blog6/600/400",
    description: "Less clutter, more clarity—what minimalism really means.",
    content: "The sixth blog brings you new insights...",
  },
  {
    id: 7,
    title: "7 Productivity Hacks You Need to Try Today",
    coverImage: "https://picsum.photos/seed/blog7/600/400",
    description: "Get more done in less time with these practical hacks.",
    content: "All details of the seventh blog post...",
  },
  {
    id: 8,
    title: "Mastering the Art of Saying No",
    coverImage: "https://picsum.photos/seed/blog8/600/400",
    description:
      "Boundaries matter. Learn how to protect your time and energy.",
    content: "This blog dives deep into the topic...",
  },
  {
    id: 9,
    title: "Digital Detox: Reclaiming Your Focus",
    coverImage: "https://picsum.photos/seed/blog9/600/400",
    description:
      "Your brain deserves a break—why and how to take a digital detox.",
    content: "Ninth blog post elaborates on the theme...",
  },
  {
    id: 10,
    title: "How Travel Changes Your Perspective",
    coverImage: "https://picsum.photos/seed/blog10/600/400",
    description: "From culture to creativity, how new places spark new ideas.",
    content: "Everything you need to know in this post...",
  },
  {
    id: 11,
    title: "The Science Behind Better Sleep",
    coverImage: "https://picsum.photos/seed/blog11/600/400",
    description:
      "Simple science-backed strategies to improve your sleep quality.",
    content: "Full content of the first blog post goes here...",
  },
  {
    id: 12,
    title: "Financial Freedom: Getting Started with Budgeting",
    coverImage: "https://picsum.photos/seed/blog12/600/400",
    description:
      "Money management 101—how to start saving smart and spending wisely.",
    content: "This is the complete write-up of the second blog post...",
  },
  {
    id: 13,
    title: "Unlocking the Secrets of the Digital Nomad Life",
    coverImage: "https://picsum.photos/seed/blog13/600/400",
    description:
      "A glimpse into the exciting lifestyle of remote work and world travel...",
    content:
      "From choosing the right destinations to managing time zones and productivity, this blog explores what it truly means to live as a digital nomad in 2025.",
  },
];



const FirebaseContext=createContext(null);
 


const firebaseConfig = {
    apiKey: "AIzaSyDPdbmCz8XluNHIxUmG2HnOyi5MRHqcvSM",
    authDomain: "blogapp-90cba.firebaseapp.com",
    projectId: "blogapp-90cba",
    storageBucket: "blogapp-90cba.firebasestorage.app",
    messagingSenderId: "229464043190",
    appId: "1:229464043190:web:133f5db9a518f44394c017",
    measurementId: "G-6C31EW65F6"
};

export const useFirebase = () =>useContext(FirebaseContext);

const firebaseApp=initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);


const googleProvider= new GoogleAuthProvider();


export const FirebaseProvider=(props)=>{
    const[user,setUser]=useState(null);
       const [blogs, setBlogs] = useState(dummyBlogs);
    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,(user)=>{
            if(user)setUser(user);
            else setUser(null);
            console.log("User",user);
        })
    })

    const signupUserWithEmailPassword=(email,password)=>createUserWithEmailAndPassword(firebaseAuth, email,password);
    const signinUserWithEmailPassword=(email,password)=>signInWithEmailAndPassword(firebaseAuth, email,password);
    const signinWithGoogle=()=>signInWithPopup(firebaseAuth,googleProvider)
    const isLoggedIn =user ? true : false;
     const logout = () => signOut(firebaseAuth);
    const deleteBlog = (id) => {setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id))
       toast.success("Blog deleted successfully!");
    };

   const addBlog = (newBlog) => {
     const blogWithId = { ...newBlog, id: Date.now() }; // or use uuid
     setBlogs((prevBlogs) => [blogWithId, ...prevBlogs]);
     toast.success("Blog added successfully!");
   };

   const updateBlog = (updatedBlog) => {
     setBlogs((prevBlogs) =>
       prevBlogs.map((blog) =>
         blog.id === updatedBlog.id ? { ...blog, ...updatedBlog } : blog
       )
     );
   };


    return (
      <FirebaseContext.Provider
        value={{
          signupUserWithEmailPassword,
          signinUserWithEmailPassword,
          signinWithGoogle,
          isLoggedIn,
          logout,
          blogs,
          deleteBlog,
          addBlog,
          updateBlog,
        }}
      >
        {props.children}
      </FirebaseContext.Provider>
    );
}