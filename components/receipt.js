import React, { useState, useEffect } from 'react'
import { find, range } from 'lodash'
import Modal from './modal'

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
          margin-bottom: 1rem;
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
  const [sending, setSending] = useState(false)
  const param = text ? `&text=${encodeURIComponent(text)}` : ''
  const send = number => {
    setSending(true)
    fetch(`/api/receipt?to=${number}${param}`)
      .then(res => res.json())
      .then(() => {
        setSending(false)
        onComplete()
      })
      .catch(() => {
        onComplete()
      })
  }
  return (
    <Modal heading="Get your receipt">
      <p>Phone number</p>
      <Keypad onSubmit={send} onExit={onComplete} />
      <p>{sending ? 'Sending…' : 'Press "-" to cancel'}</p>
      <style jsx>{`
        p:first-of-type {
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
    </Modal>
  )
}
