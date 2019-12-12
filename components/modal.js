import React from 'react'

export default ({ heading, children, ...props }) => (
  <article {...props}>
    <h1>{heading}</h1>
    {children}
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
    `}</style>
  </article>
)
