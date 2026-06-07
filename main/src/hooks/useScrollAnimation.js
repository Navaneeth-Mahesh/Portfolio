import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollAnimation — attaches a GSAP ScrollTrigger to an element.
 * @param {Object} fromVars - initial state
 * @param {Object} toVars - target state
 * @param {Object} options - ScrollTrigger options
 */
export function useScrollAnimation(fromVars = {}, toVars = {}, options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          ...options,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return ref
}

/**
 * usePinSection — pins a section during scroll
 */
export function usePinSection(duration = '200%') {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top top',
        end: `+=${duration}`,
        pin: true,
        pinSpacing: true,
      })
    })

    return () => ctx.revert()
  }, [duration])

  return ref
}

export default useScrollAnimation
