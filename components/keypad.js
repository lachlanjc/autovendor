import React, { useState, useEffect } from 'react'
import { find, range } from 'lodash'

const Keypad = ({ onSelect }) => {
  const [number, setNumber] = useState('')
  const addNum = n => {
    setNumber(i => {
      let next = [i, Number(n)].join('').replace(/NaN/g, '')
      if (next.length > 3) next = next.slice(next.length - 1, 3)
      return next
    })
  }
  const clear = () => setNumber('')
  const select = () => onSelect(Number(number))

  const keyPressed = ({ key }) => {
    if (typeof Number(key) === 'number') addNum(key)
    if (key === 'x' || key === 'Backspace') setNumber('')
    if (key === 'Enter') select()
  }

  useEffect(() => {
    window.addEventListener('keyup', keyPressed)
    return () => {
      window.removeEventListener('keyup', keyPressed)
    }
  })

  return (
    <aside>
      <header>{number.length === 0 ? '---' : number}</header>
      <article>
        {range(0, 10).map(i => (
          <button
            onClick={e => {
              addNum(i)
            }}
            key={i}
            children={i}
          />
        ))}
        <button className="clear" onClick={clear}>
          x
        </button>
        <button className="accept" onClick={select}>
          →
        </button>
      </article>
      <style jsx>{`
        aside {
          font-size: 2rem;
          user-select: none;
        }
        header {
          padding: 2rem 4rem 2rem 0;
          text-align: right;
          font-size: 4rem;
          line-height: 1;
          position: fixed;
          top: 16vh;
          right: 0;
          width: 25vw;
        }
        article {
          display: grid;
          grid-template-columns: repeat(3, 6rem);
          grid-gap: 0;
          border-radius: 1rem;
          overflow: hidden;
        }
        button {
          background: #111;
          box-sizing: border-box;
          border: 0;
          border-radius: 0;
          font-size: inherit;
          font-family: inherit;
          display: inline-block;
          margin: 0;
          vertical-align: baseline;
          appearance: none;
          cursor: pointer;
          height: 4rem;
          display: flex;
          place-content: center;
          color: #fff;
          -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
        }
        button.clear {
          background: #555;
        }
        button.accept {
          background: #363;
        }
      `}</style>
    </aside>
  )
}

export default Keypad
