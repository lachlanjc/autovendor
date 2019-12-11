import React, { useState, useEffect } from 'react'
import { find, range } from 'lodash'

const Keypad = ({ onSubmit, onExit }) => {
  const [number, setNumber] = useState('')
  const addNum = n =>
    setNumber(i => [i, Number(n)].join('').replace(/NaN/g, ''))
  const clear = () => setNumber('')
  const backspace = () => setNumber(number.slice(0, number.length - 1))

  const keyPressed = ({ key }) => {
    if (typeof Number(key) === 'number') addNum(key)
    if (key === '-') onExit()
    if (key === 'Backspace') backspace()
    if (key === 'Enter') onSubmit(number)
  }

  useEffect(() => {
    window.addEventListener('keypress', keyPressed)
    return () => {
      window.removeEventListener('keypress', keyPressed)
    }
  })

  return (
    <aside>
      <header>{number.length === 0 ? '---' : number}</header>
      <style jsx>{`
        aside {
          font-size: 2rem;
          margin-bottom: 1rem
        }
        header {
          background: #333;
          padding: 1rem;
          line-height: 1;
          overflow: hidden;
          max-width: 100%;
        }
      `}</style>
    </aside>
  )
}

export default ({ text, onComplete }) => {
  const send = number =>
    fetch(`/api/receipt?to=${number}&text=${encodeURIComponent(text)}`)
      .then(res => res.json())
      // .then(json => alert(JSON.stringify(json)))
      .then(() => onComplete())
  return (
    <article>
      <h1>Send a receipt</h1>
      <p>Phone number</p>
      <Keypad onSubmit={send} onExit={onComplete} />
      <p>Press "-" to cancel</p>
      <style jsx>{`
        article {
          width: 100%;
          max-width: 64rem;
          position: fixed;
          background-color: #000;
          padding: 3rem;
          top: 25vh;
          left: 10vw;
          border: 0.5rem solid #fff;
          box-shadow: 1rem 1rem 0 rgba(255, 255, 255, 0.5);
        }
        h1 {
          margin-top: 0;
          margin-bottom: 0;
          font-size: 3rem;
          color: #e42d42;
        }
        h1 + p {
          font-size: 1.5rem;
          margin-bottom: 0;
        }
        p:last-of-type {
          color: #aaa;
          font-size: 1rem;
          margin-top: 2rem;
          margin-bottom: 0;
        }
      `}</style>
    </article>
  )
}
