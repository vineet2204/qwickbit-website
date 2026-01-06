"use client"

import { useState, useEffect } from "react"

const allowLocal = !true
const devMode = process.env.NEXT_PUBLIC_DEV_MODE
const isLocal = allowLocal && devMode

export const $firestoreUrl = isLocal ? `http://localhost:8079/v1` : `https://firestore.googleapis.com/v1`

interface Client {
  name: string
  photoURL: string
  link: string
}

export default function TrustedClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchClients() {
      const projectId = `qwickbit-18382`
      const url = `${$firestoreUrl}/projects/${projectId}/databases/(default)/documents/clients`
      
      try {
        const response = await fetch(url)
        const data = await response.json()
        
        if (data.documents) {
          // Parse Firestore data
          const parsedClients = data.documents.map((doc: any) => {
            const fields = doc.fields
            return {
              name: fields.name?.stringValue || '',
              photoURL: fields.photoURL?.stringValue || '',
              link: fields.link?.stringValue || 'https://qwickbit.com',
            }
          })
          
          setClients(parsedClients)
        }
      } catch (error) {
        console.error('Error fetching clients:', error)
        // Fallback to default clients if API fails
        setClients([
          {
            name: "NaviRisk",
            photoURL: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
            link: "https://example.com",
          },
          {
            name: "Franklin Wireless",
            photoURL: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
            link: "https://example.com",
          },
          {
            name: "MobileForce",
            photoURL: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&h=200&fit=crop",
            link: "https://example.com",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  // Duplicate clients for seamless loop
  const duplicatedClients = [...clients, ...clients]

  if (loading) {
    return (
      <section className="w-full py-16 bg-transparent overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
            Loading clients...
          </h2>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-16 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-sans tracking-tight md:text-5xl font-light text-center mb-12 text-white">
          Trusted by awesome clients
        </h2>

        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24  z-10 pointer-events-none" />

          <div className="slider-container">
            <div className="slider-track group">
              {duplicatedClients.map((client, index) => (
                <a
                  key={`${client.name}-${index}`}
                  href={client.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slider-item flex-shrink-0 w-48 h-32 mx-4 relative rounded-xl overflow-hidden border border-gray-700  hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="relative w-full h-full">
                      <img
                        src={client.photoURL || "/placeholder.svg"}
                        alt={client.name}
                        className="w-full h-full object-contain transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0 mt-10 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <p className="text-white text-base font-medium text-center truncate">
                      {client.name}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider-container {
          width: 100%;
          overflow: hidden;
        }

        .slider-track {
          display: flex;
          width: fit-content;
          animation: scroll 30s linear infinite;
        }

        .slider-track:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .slider-track {
            animation-duration: 20s;
          }
        }
      `}</style>
    </section>
  )
}