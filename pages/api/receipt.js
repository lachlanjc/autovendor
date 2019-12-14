const twilio = require('twilio')(
  'ACd2f0d2761422ef7e43d3de6a6a388e9f',
  process.env.TWILIO_AUTH
)

export default (req, res) => {
  const { to, text = 'Testing receipts' } = req.query
  console.log('SENDING', to, text)
  if (!to) res.status(422).json({ error: 'Missing to phone number' })
  const dt = new Date()
  dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset() - 300)

  const content =
    text === 'null'
      ? ''
      : `“${text}”
`
  const body = `AUTOVENDOR @ NYU IMA
${content}${dt.toLocaleString()}`

  twilio.messages
    .create({ body, to: `+1${to}`, from: '+18649736177' })
    .then(message => {
      const { date_sent, status } = message
      res.json({ date_sent, status, body })
    })
    .catch(error => console.error(error))
}
