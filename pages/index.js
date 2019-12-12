import React, { useState } from 'react'
import { find, capitalize, sample } from 'lodash'
import Showcase from '../components/showcase'
import Keypad from '../components/keypad'
import Player from '../components/player'
import Confirm from '../components/confirm'
import Receipt from '../components/receipt'
import Head from 'next/head'

const products = [
  {
    name: 'coffee',
    num: 1,
    resting:
      'https://d2wkqk610zk1ag.cloudfront.net/items/1f2K0Q1Q1v411W2x3b1W/Coffee_R.mp4',
    variants: [
      {
        name: 'self-consuming',
        url:
          'https://cdn.glitch.com/852bc403-854b-4211-8864-b85747c19f7f%2FCoffee_C.mp4?v=1576053922595',
        receipt: 'lklkfjasklf'
      },
      {
        name: 'matcha',
        url:
          'https://cdn.glitch.com/852bc403-854b-4211-8864-b85747c19f7f%2FCoffee_Matcha.mp4?v=1576053925309',
        receipt: 'sfdsalkdfads'
      },
      {
        name: 'fruit',
        url:
          'https://cdn.glitch.com/852bc403-854b-4211-8864-b85747c19f7f%2FCoffee_Fruit.mp4?v=1576053923958',
        receipt: 'sfdsalkdfads'
      }
    ]
  },
  {
    name: 'chips',
    num: 2,
    resting:
      'https://d2wkqk610zk1ag.cloudfront.net/items/1g0g2X2n2n2Z1K0A1q11/Chips_R.mp4',
    variants: [
      {
        name: 'self-consuming',
        url:
          'https://cdn.glitch.com/852bc403-854b-4211-8864-b85747c19f7f%2FChips_C.mp4?v=1576053699764',
        receipt: 'self-consmings chips'
      },
      {
        name: 'nail',
        url:
          'https://cdn.glitch.com/852bc403-854b-4211-8864-b85747c19f7f%2FChip_Nail.mp4?v=1576053698779',
        receipt: 'potatopoooo'
      },
      {
        name: 'winter show',
        url:
          'https://d2wkqk610zk1ag.cloudfront.net/items/2R383w0M2q3p0J2f0r1B/Chip_Cushed%20By%20ITP%3AIMA.mp4',
        receipt: ''
      }
    ]
  },
  {
    name: 'bar',
    num: 3,
    resting:
      'https://d2wkqk610zk1ag.cloudfront.net/items/1o1d20343p2o3V3W3R3G/Bars_R.mp4',
    variants: [
      {
        name: 'self-consuming',
        url:
          'https://cdn.glitch.com/852bc403-854b-4211-8864-b85747c19f7f%2FBars_C.mp4?v=1576053645242',
        receipt: 'go eat it, barheads'
      },
      {
        name: 'sit-ups',
        url:
          'https://cdn.glitch.com/852bc403-854b-4211-8864-b85747c19f7f%2FBar_Situps.mp4?v=1576053642552',
        receipt: 'choconononononooooo'
      },
      {
        name: 'cheerleading',
        url:
          'https://cdn.glitch.com/852bc403-854b-4211-8864-b85747c19f7f%2FBar_Cheerleading.mp4?v=1576053639131',
        receipt: ''
      }
    ]
  }
]

export default () => {
  const [variant, setVariant] = useState(null)
  const [stage, setStage] = useState('showcase')

  const onSelect = num => {
    if (Number(num) > products.length || Number(num) === 0) return
    console.log(products, num)
    const product = find(products, ['num', Number(num)])
    const selected = sample(product.variants)
    setVariant(selected)
    setStage('variant')
    // alert(capitalize(product.name))
    setTimeout(() => {
      setStage('confirm')
    }, 8000)
  }

  return (
    <>
      <Head>
        <title>Autovendor</title>
        <style>{`
          @font-face {
            font-family: 'Press Start';
            font-weight: 400;
            src: url('https://cdn.glitch.com/852bc403-854b-4211-8864-b85747c19f7f%2FPressStart2P.ttf?v=1575689646385')
              format('truetype');
            font-display: swap;
          }
        `}</style>
      </Head>
      {/* <h1>Autovendor</h1> */}
      <main>
        <Showcase products={products} />
        {stage === 'showcase' ? <Keypad onSelect={onSelect} /> : <aside />}
      </main>
      {stage === 'variant' && <Player url={variant.url} />}
      {stage === 'confirm' && (
        <Confirm
          onCancel={() => setStage('showcase')}
          onContinue={() => setStage('receipt')}
        />
      )}
      {stage === 'receipt' && (
        <Receipt
          text={variant ? variant.receipt : 'test'}
          onComplete={() => setStage('showcase')}
        />
      )}
      <style jsx>{`
        h1 {
          font-size: 4rem;
          color: #e42d42;
          margin: 0;
          position: absolute;
          top: 2rem;
          left: 6rem;
        }
        main aside {
          width: 288px;
          height: 288px;
        }
      `}</style>
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        body {
          background-color: #000;
          color: #fff;
          font-family: 'Press Start', 'SF Mono', Menlo, monospace;
          line-height: 1.66;
          text-transform: uppercase;
          margin: 0;
          min-height: 100vh;
        }
        main {
          width: 100%;
          height: 100vh;
          padding-bottom: 15vh;
          display: grid;
          grid-template-columns: 1fr auto;
          grid-gap: 10vw;
          justify-content: center;
          align-items: end;
        }
      `}</style>
    </>
  )
}
