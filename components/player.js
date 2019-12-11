export default ({ url }) => (
  <article>
    <video muted autoPlay src={url} />
    <style jsx>{`
      article {
        width: 100vw;
        height: 100vh;
        box-shadow: 0 0 0 100vh rgba(0, 0, 0, 1);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        background-color: #000;
      }
      video {
        background-color: #000;
        width: 80%;
      }
    `}</style>
  </article>
)
