import React, { useState, useEffect } from 'react'
import { find, range } from 'lodash'
import Modal from './modal'

export default ({ onCancel, onContinue }) => {
  const keyPressed = ({ key }) => {
    if (key === '-' || key === '0' || key === 'Backspace') onCancel()
    if (key === 'Enter' || key === '1') onContinue()
  }

  useEffect(() => {
    window.addEventListener('keypress', keyPressed)
    return () => {
      window.removeEventListener('keypress', keyPressed)
    }
  })

  return (
    <Modal heading="Want a receipt?">
      <p>
        <span>0</span> for no, <span>1</span> for yes
      </p>
      <style jsx>{`
        span {
          padding: 0.25em 0.5em;
          background-color: #e42d42;
          color: #fff;
        }
        p:first-of-type {
          color: #aaa;
          font-size: 1.5rem;
          margin-bottom: 0;
        }
      `}</style>
    </Modal>
  )
}
