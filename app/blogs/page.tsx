// app/blogs/page.tsx
"use client"

import { PolicyLayout } from "@/components/policy-layout"
import { useState, useEffect, JSX } from "react"
import { $firestoreUrl } from '@/components/http'
import { Search } from "lucide-react"

// Types
interface FirestoreField {
  stringValue?: string
  integerValue?: string
  doubleValue?: number
  booleanValue?: boolean
  timestampValue?: string
  arrayValue?: { values: any[] }
  mapValue?: { fields: Record<string, FirestoreField> }
}

interface FirestoreDocument {
  fields: Record<string, FirestoreField>
}

interface Blog {
  title: string
  name?: string
  description: string
  photoURL?: string
  link?: string
  content?: string
  tags?: string
  date: string
  priority?: number
}

interface BlogCardProps {
  blog: Blog
  vertical?: boolean
  delay?: number
}

interface AppearProps {
  children: React.ReactNode
  delay?: number
  className?: string
  component?: keyof JSX.IntrinsicElements
  onClick?: () => void
  style?: React.CSSProperties
}

// Manual Firestore parser function
function parseFirestoreDocument(doc: FirestoreDocument): any {
  const fields = doc.fields
  const parsed: Record<string, any> = {}
  
  for (const key in fields) {
    const field = fields[key]
    
    if (field.stringValue !== undefined) {
      parsed[key] = field.stringValue
    } else if (field.integerValue !== undefined) {
      parsed[key] = parseInt(field.integerValue)
    } else if (field.doubleValue !== undefined) {
      parsed[key] = parseFloat(field.doubleValue.toString())
    } else if (field.booleanValue !== undefined) {
      parsed[key] = field.booleanValue
    } else if (field.timestampValue !== undefined) {
      parsed[key] = field.timestampValue
    } else if (field.arrayValue !== undefined) {
      parsed[key] = field.arrayValue.values || []
    } else if (field.mapValue !== undefined) {
      parsed[key] = parseFirestoreDocument({ fields: field.mapValue.fields })
    }
  }
  
  return parsed
}

// Sort by date function
function sortByDate(a: Blog, b: Blog): number {
  const dateScore = (item: Blog): number => {
    const millis = new Date(item.date).getTime()
    return millis
  }
  return dateScore(b) - dateScore(a)
}

// Truncate text helper
function truncate(text: string, length: number): string {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

// Get slug name helper
function getSlugName(blog: Blog): string {
  return (blog.title || blog.name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Pretty date formatter
function prettyDate(dateString: string): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const date = new Date(dateString)
  const dayOfMonth = date.getDate()
  const day = dayOfMonth % 10
  const suffix = day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'
  const month = months[date.getMonth()]
  
  return `${dayOfMonth}${suffix} ${month} ${date.getFullYear()}`
}

// Appear animation component
function Appear({ 
  children, 
  delay = 0, 
  className = '', 
  component = 'div',
  ...props 
}: AppearProps) {
  const [isVisible, setIsVisible] = useState(false)
  const Component = component as any

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <Component
      className={`transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

// BlogCard Component
function BlogCard({ blog, delay = 0 }: BlogCardProps) {
  const defaultImage = `https://picsum.photos/seed/${blog.title}/400/300`
  
  return (
    <Appear
      delay={delay}
      className="flex flex-col bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => {
        const link = blog.link
        const pageLink = (blog.content && `blogs/${getSlugName(blog)}`) || link || '/blogs'
        if (pageLink) {
          window.location.href = pageLink
        }
      }}
    >
      {/* Image Container */}
      <div className="w-full h-64 bg-zinc-700 overflow-hidden">
        <img
          src={blog.photoURL || defaultImage}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="pr-6 pb-10 flex bg-black flex-col flex-grow">
        {/* Date */}
        <p className="text-xs text-zinc-500  mt-3">
          {prettyDate(blog.date)}
        </p>

        {/* Title */}
        <p className="text-xl font-semibold -mt-4 text-white ">
          {truncate(blog.title, 50)}
        </p>

        {/* Description */}
        {/* <p className="text-sm text-zinc-400 mb-3 flex-grow">
          {truncate(blog.description, 100)}
        </p> */}

        {/* Tags */}
        {blog.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.split(',').filter(Boolean).slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium uppercase bg-zinc-700 text-zinc-300 rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Read More Link */}
        <div className="flex items-center text-white group">
          <span className="text-sm font-medium border-b-2 border-white pb-1">
            Read More
          </span>
          <svg 
            className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 8l4 4m0 0l-4 4m4-4H3" 
            />
          </svg>
        </div>
      </div>
    </Appear>
  )
}

// Main Page Component
export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])

  // Fetch blogs from Firestore
  useEffect(() => {
    async function fetchBlogs() {
      const projectId = `qwickbit-18382`
      const url = `${$firestoreUrl}/projects/${projectId}/databases/(default)/documents/blogs`

      try {
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch blogs: ${response.status}`)
        }

        const json = await response.json()
        
        // Parse Firestore documents manually
        const fetchedBlogs: Blog[] = json.documents
          ?.map((doc: FirestoreDocument) => parseFirestoreDocument(doc))
          .sort(sortByDate) || []

        setBlogs(fetchedBlogs)
      } catch (error) {
        console.error('Error fetching blogs:', error)
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  // Extract all unique tags from blogs
  let allTags: string[] = []
  blogs.forEach(blog => {
    const newTags = blog.tags?.split(',').map(t => t.trim()) || []
    allTags.push(...newTags.filter(t => !allTags.includes(t) && !!t))
  })
  allTags = allTags.sort()

  // Filter blogs based on search and tags
  const noFilter = !tags.length
  const filteredBlogs = blogs
    .filter(blog => {
      const blogTags = blog.tags?.split(',').map(t => t.trim()) || []
      return noFilter || blogTags.some(t => tags.includes(t))
    })
    .filter(blog => 
      (blog.title || blog.name || '').toLowerCase().includes(filter.toLowerCase())
    )

  if (loading) {
    return (
      <PolicyLayout title="Our Blog">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
        </div>
      </PolicyLayout>
    )
  }

  return (
    <PolicyLayout title="Our Blog">
      <div className="space-y-8">
        
        {/* Hero Section with Search */}
        <section className="bg-black text-white py-20 md:-mt-28 px-6 rounded-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Blog
            </h1>
            <p className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto">
              Insights, tutorials, and updates from our team. Stay informed about the latest in web development, 
              mobile apps, and technology trends.
            </p>
            
            {/* Search Bar */}
            <div className="flex items-center gap-3 mt-14 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full py-4 pl-12 pr-6 rounded-full bg-gray-800/50 border border-gray-700
                    text-white placeholder-gray-500
                    focus:outline-none focus:border-gray-600 focus:bg-gray-800
                    transition-all"
                  placeholder="Search"
                />
              </div>
              <button 
                className="px-8 py-4 bg-white text-gray-900 font-medium rounded-full
                  hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
              >
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <section className="mb-12 -mt-18">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0">
              <p className="mr-4 font-medium text-center justify-center items-center mt-4 text-gray-700">Filter by tags:</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {allTags.map((tag, i) => {
                  const isActive = tags.includes(tag)
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        if (isActive) {
                          setTags(tags.filter(t => t !== tag))
                        } else {
                          setTags([...tags, tag])
                        }
                      }}
                      className={`
                        px-4 py-2 rounded-full text-sm font-medium uppercase
                        transition-all hover:scale-105 active:scale-95
                        ${isActive 
                          ? 'bg-indigo-500 text-white' 
                          : 'bg-black text-white border border-white hover:text-black hover:bg-gray-200'
                        }
                      `}
                    >
                      {tag}
                    </button>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Blog Cards Grid */}
        <section>
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBlogs.map((blog, i) => (
                <BlogCard 
                  blog={blog} 
                  key={i} 
                  delay={i * 100} 
                  vertical 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-xl text-gray-400">
                No posts matching your search
              </p>
              <button
                onClick={() => {
                  setFilter('')
                  setTags([])
                }}
                className="mt-6 px-6 py-3 bg-indigo-500 text-white rounded-lg 
                  hover:bg-indigo-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

      </div>
    </PolicyLayout>
  )
}