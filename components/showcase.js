export default ({ products }) => (
  <article>
    {products.map(product => (
      <section key={product.num}>
        <video autoPlay loop src={product.resting} width={512} />
        <p>00{product.num}</p>
      </section>
    ))}
    <style jsx>{`
      article {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
      }
      section {
        overflow: hidden;
        position: relative;
        height: 66vh;
      }
      video {
        width: auto;
        height: 100%;
        transform: translate(-33%);
      }
      p {
        width: 100%;
        text-align: center;
        font-size: 2rem;
        font-weight: bold;
        color: #ccc;
        position: absolute;
        bottom: -3rem;
        left: 0;
        right: 0;
      }
    `}</style>
  </article>
)
