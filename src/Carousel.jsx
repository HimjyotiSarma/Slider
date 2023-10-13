import { useState } from 'react'
import { shortList, list, longList } from './data.js'
import { FaQuoteRight } from 'react-icons/fa'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useEffect } from 'react'
export default function Carousel() {
  const [people, setPeople] = useState(longList)
  const [currentSlide, setCurrentSlide] = useState(0)
  let interval
  const prevSlide = () => {
    clearInterval(interval)
    setCurrentSlide((oldState) => {
      const result = (oldState - 1 + people.length) % people.length
      return result
    })
  }
  const nextSlide = () => {
    clearInterval(interval)
    setCurrentSlide((oldState) => {
      const result = (oldState + 1) % people.length
      return result
    })
  }
  const autoplaySlides = () => {
    interval = setInterval(() => {
      setCurrentSlide((oldState) => {
        const result = (oldState + 1) % people.length
        return result
      })
    }, 3000)
  }
  useEffect(() => {
    autoplaySlides()
    return () => clearInterval(interval)
  }, [currentSlide])

  return (
    <section className="slider-container">
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person
        return (
          <article
            className="slide"
            key={id}
            style={{
              transform: `translateX(${100 * (personIndex - currentSlide)}%)`,
              transition: 'transform 0.5s ease-in-out',
              opacity: personIndex == currentSlide ? 1 : 0,
              visibility: personIndex == currentSlide ? 'visible' : 'hidden',
            }}
          >
            <img src={image} alt={name} className="person-img" />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        )
      })}
      <button type="button" className="prev" onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button type="button" className="next" onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  )
}
