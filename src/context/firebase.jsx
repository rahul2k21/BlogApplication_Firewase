
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword ,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth";

const dummyBlogs = [
  {
    id: 1,
    title: "First Blog Post",
    coverImage: "https://picsum.photos/seed/blog1/600/400",
    description: "This is a long description for the first blog post...",
    content: "Full content of the first blog post goes here...",
  },
  {
    id: 2,
    title: "Second Blog Post",
    coverImage: "https://picsum.photos/seed/blog2/600/400",
    description: "Second blog's summary appears here...",
    content: "This is the complete write-up of the second blog post...",
  },
  {
    id: 3,
    title: "Third Blog Post",
    coverImage: "https://picsum.photos/seed/blog3/600/400",
    description: "A brief look into the third blog topic...",
    content: "Here's everything about the third blog post...",
  },
  {
    id: 4,
    title: "Fourth Blog Post",
    coverImage: "https://picsum.photos/seed/blog4/600/400",
    description: "Intro to the fourth blog in the series...",
    content: "Detailed explanation in the fourth blog post...",
  },
  {
    id: 5,
    title: "Fifth Blog Post",
    coverImage: "https://picsum.photos/seed/blog5/600/400",
    description: "Summary of the fifth blog post topic...",
    content: "Expanded content for the fifth blog post...",
  },
  {
    id: 6,
    title: "Sixth Blog Post",
    coverImage: "https://picsum.photos/seed/blog6/600/400",
    description: "What's inside the sixth blog...",
    content: "The sixth blog brings you new insights...",
  },
  {
    id: 7,
    title: "Seventh Blog Post",
    coverImage: "https://picsum.photos/seed/blog7/600/400",
    description: "Explore this seventh blog snippet...",
    content: "All details of the seventh blog post...",
  },
  {
    id: 8,
    title: "Eighth Blog Post",
    coverImage: "https://picsum.photos/seed/blog8/600/400",
    description: "The eighth blog post discusses...",
    content: "This blog dives deep into the topic...",
  },
  {
    id: 9,
    title: "Ninth Blog Post",
    coverImage: "https://picsum.photos/seed/blog9/600/400",
    description: "Highlights from the ninth post...",
    content: "Ninth blog post elaborates on the theme...",
  },
  {
    id: 10,
    title: "Tenth Blog Post",
    coverImage: "https://picsum.photos/seed/blog10/600/400",
    description: "Tenth blog preview and thoughts...",
    content: "Everything you need to know in this post...",
  },
  {
    id: 11,
    title: "First Blog Post",
    coverImage: "https://picsum.photos/seed/blog1/600/400",
    description: "This is a long description for the first blog post...",
    content: "Full content of the first blog post goes here...",
  },
  {
    id: 12,
    title: "Second Blog Post",
    coverImage: "https://picsum.photos/seed/blog2/600/400",
    description: "Second blog's summary appears here...",
    content: "This is the complete write-up of the second blog post...",
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