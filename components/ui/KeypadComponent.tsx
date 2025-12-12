"use client"

import { useState, useEffect, useRef } from 'react'

interface KeyConfig {
  id: string
  text: string
  travel: number
  hue: number
  saturation: number
  brightness: number
  key: string
  position: 'single-left' | 'single-right' | 'double'
}

export default function KeypadComponent() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const keys: KeyConfig[] = [
    {
      id: 'one',
      text: 'ok',
      travel: 26,
      hue: 114,
      saturation: 1.4,
      brightness: 1.2,
      key: 'o',
      position: 'single-left'
    },
    {
      id: 'two',
      text: 'go',
      travel: 26,
      hue: 0,
      saturation: 0,
      brightness: 1.4,
      key: 'g',
      position: 'single-right'
    },
    {
      id: 'three',
      text: 'create.',
      travel: 18,
      hue: 0,
      saturation: 0,
      brightness: 0.4,
      key: 'Enter',
      position: 'double'
    }
  ]

  useEffect(() => {
    audioRef.current = new Audio('https://cdn.freesound.org/previews/378/378085_6260145-lq.mp3')
    audioRef.current.volume = 0.3
  }, [])

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  const handleKeyDown = (keyId: string) => {
    setPressedKeys(prev => new Set(prev).add(keyId))
    playSound()
  }

  const handleKeyUp = (keyId: string) => {
    setPressedKeys(prev => {
      const newSet = new Set(prev)
      newSet.delete(keyId)
      return newSet
    })
  }

  useEffect(() => {
    const handleKeyboardDown = (e: KeyboardEvent) => {
      const key = keys.find(k => k.key === e.key)
      if (key && !pressedKeys.has(key.id)) {
        handleKeyDown(key.id)
      }
    }

    const handleKeyboardUp = (e: KeyboardEvent) => {
      const key = keys.find(k => k.key === e.key)
      if (key) {
        handleKeyUp(key.id)
      }
    }

    window.addEventListener('keydown', handleKeyboardDown)
    window.addEventListener('keyup', handleKeyboardUp)

    return () => {
      window.removeEventListener('keydown', handleKeyboardDown)
      window.removeEventListener('keyup', handleKeyboardUp)
    }
  }, [pressedKeys])

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="relative w-full max-w-[400px] aspect-[400/310]">
        {/* Base */}
        <div className="absolute bottom-0 w-full">
          <img 
            src="https://assets.codepen.io/605876/keypad-base.png?format=auto&quality=86" 
            alt="" 
            className="w-full"
          />
        </div>

        {/* Keys */}
        {keys.map((keyConfig) => (
          <button
            key={keyConfig.id}
            className={`
              absolute cursor-pointer border-0 bg-transparent p-0 outline-none
              transition-transform duration-100 ease-out
              ${keyConfig.position === 'single-left' ? 'w-[40.5%] h-[46%] left-[29.3%] bottom-[54.2%]' : ''}
              ${keyConfig.position === 'single-right' ? 'w-[40.5%] h-[46%] left-[54%] bottom-[36%]' : ''}
              ${keyConfig.position === 'double' ? 'w-[64%] h-[65%] left-[6%] bottom-[17.85%]' : ''}
            `}
            style={{
              maskImage: keyConfig.position === 'double' 
                ? `url(https://assets.codepen.io/605876/keypad-double.png?format=auto&quality=86)`
                : `url(https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86)`,
              maskSize: '100% 100%',
              maskPosition: '50% 50%',
              WebkitMaskImage: keyConfig.position === 'double' 
                ? `url(https://assets.codepen.io/605876/keypad-double.png?format=auto&quality=86)`
                : `url(https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86)`,
              WebkitMaskSize: '100% 100%',
              WebkitMaskPosition: '50% 50%',
            }}
            onPointerDown={() => handleKeyDown(keyConfig.id)}
            onPointerUp={() => handleKeyUp(keyConfig.id)}
            onPointerLeave={() => handleKeyUp(keyConfig.id)}
          >
            <span className="inline-block w-full h-full">
              <span 
                className="inline-block w-full h-full transition-transform duration-100 ease-out relative"
                style={{
                  transform: pressedKeys.has(keyConfig.id) 
                    ? `translateY(${keyConfig.travel}%)` 
                    : 'translateY(0)'
                }}
              >
                {/* Text */}
                <span 
                  className={`
                    absolute z-20 text-white/95 text-left p-2
                    ${keyConfig.position === 'double' ? 'w-[86%] h-[46%] top-[5%] left-[8%] text-[12cqw]' : ''}
                    ${keyConfig.position !== 'double' ? 'w-[52%] h-[62%] text-[18cqw]' : ''}
                  `}
                  style={{
                    transform: 'rotateX(36deg) rotateY(45deg) rotateX(-90deg)',
                    translate: keyConfig.position === 'double' ? '8% 10%' : '45% -16%',
                    containerType: 'inline-size',
                    fontSize: keyConfig.position === 'double' ? '12cqw' : '18cqw'
                  }}
                >
                  {keyConfig.text}
                </span>
                
                {/* Key Image */}
                <img 
                  src={keyConfig.position === 'double' 
                    ? "https://assets.codepen.io/605876/keypad-double.png?format=auto&quality=86"
                    : "https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86"
                  }
                  alt="" 
                  className="absolute top-0 left-1/2 -translate-x-1/2 translate-y-[1%] opacity-100 transition-transform duration-100 ease-out"
                  style={{
                    width: keyConfig.position === 'double' ? '99%' : '96%',
                    filter: `hue-rotate(${keyConfig.hue}deg) saturate(${keyConfig.saturation}) brightness(${keyConfig.brightness})`
                  }}
                />
              </span>
            </span>
          </button>
        ))}

        {/* Keyboard hints */}
        <div className="absolute -bottom-12 left-0 right-0 text-center">
          <p className="text-xs text-foreground/60 font-mono">
            Press O, G, or Enter
          </p>
        </div>
      </div>

      <style jsx global>{`
        @supports (container-type: inline-size) {
          .cqi-text {
            font-size: 12cqi;
          }
        }
      `}</style>
    </div>
  )
}