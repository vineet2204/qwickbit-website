// app/blogs/page.tsx
"use client"

import { PolicyLayout } from "@/components/policy-layout"
import { useState, useEffect, JSX } from "react"
import { $firestoreUrl } from '@/components/http'

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
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
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
function BlogCard({ blog, vertical = false, delay = 0 }: BlogCardProps) {
  const defaultImage = `https://picsum.photos/seed/picsum/300/200`
  
  return (
    <Appear
      delay={delay}
      className={`flex ${vertical ? 'md:flex-col' : 'md:h-32'} border rounded-lg md:bg-indigo-500 shadow-md
        cursor-pointer hover:translate-x-2 hover:-translate-y-2 
        transition-transform hover:shadow-lg overflow-hidden
        h-36 md:h-auto`}
      onClick={() => {
        const link = blog.link
        const pageLink = (blog.content && `blogs/${getSlugName(blog)}`) || link || '/blogs'
        if (pageLink) {
          window.location.href = pageLink
        }
      }}
      style={{
        background: `linear-gradient(to bottom, #7430e1, #7430e177), url(${blog.photoURL || defaultImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <img
        src={blog.photoURL || defaultImage}
        alt="blog image"
        className={`${vertical ? 'md:w-full md:h-44 w-32 h-36 hidden md:block' : 'md:h-full'} object-cover bg-white`}
      />
      <div className={`relative flex flex-col flex-grow p-2 pb-8
        md:bg-gradient-to-t from-indigo-500 to-middle`}
      >
        <p className={`text-md text-left mt-2 px-3 font-medium mb-3 text-white ${vertical ? '' : 'mt-auto'}`}>
          {truncate(blog.title, 36)}
        </p>
        <p className="text-sm text-white opacity-80 mb-auto px-3">
          {truncate(blog.description, 60)}
        </p>

        <div className="flex space-x-1  -mt-6 items-center px-3">
          {(blog.tags || '').split(',').filter(Boolean).map(p => (
            <div
              className="rounded-3xl  text-xs font-medium uppercase
                text-black px-3 p-1 bg-white bg-opacity-20 scale-90"
              key={p}
            >
              {p}
            </div>
          ))}
          <p className="text-white opacity-75 flex-grow text-right text-xs">
            {prettyDate(blog.date)}
          </p>
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
    const newTags = blog.tags?.split(',') || []
    allTags.push(...newTags.filter(t => !allTags.includes(t) && !!t))
  })
  allTags = allTags.sort()

  // Filter blogs based on search and tags
  const noFilter = !tags.length
  const filteredBlogs = blogs
    .filter(blog => noFilter || blog.tags?.split(',').some(t => tags.includes(t)))
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
        
        {/* Header Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Qwickbit <span className="text-indigo-500">Blog</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, tutorials, and updates from our team. Stay informed about the latest in web development, 
            mobile apps, and technology trends.
          </p>
        </section>

        {/* Search Bar */}
        <section className="mb-8">
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full p-4 pl-6 rounded-lg shadow-md border-2 border-gray-200 
                focus:outline-none focus:border-indigo-400 focus:placeholder-indigo-400
                transition-colors"
              placeholder="Search blogs by title..."
            />
          </div>
        </section>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <section className="mb-12">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0">
              <p className="mr-4 font-medium text-gray-700">Filter by tags:</p>
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
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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

      

        {/* CTA Section */}
  

      </div>
    </PolicyLayout>
  )
}