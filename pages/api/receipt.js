const twilio = require('twilio')(
  'ACd2f0d2761422ef7e43d3de6a6a388e9f',
  process.env.TWILIO_AUTH
)

export default (req, res) => {
  const { to, text } = req.query
  console.log('SENDING', to, text)
  if (!to) res.status(422).json({ error: 'Missing to phone number' })

  let dt = new Date()
  dt = dt.getTime() + dt.getTimezoneOffset() * 60000
  const et = new Date(dt - 300 * 60 * 1000)

  const content = text
    ? `“${text}”
`
    : ''
  const body = `AUTOVENDOR @ NYU IMA
${content}${et.toLocaleString()}`

  twilio.messages
    .create({ body, to: `+1${to}`, from: '+18649736177' })
    .then(message => {
      const { date_sent, status } = message
      res.json({ date_sent, status, body })
    })
    .catch(error => {
      console.error(error)
      res.status(422).json({ error: error.message })
    })
}
