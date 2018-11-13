const express = require('express')
const next = require('next')
const path = require('path')
const sm = require('sitemap')
const config = require('./config/config.js')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const sitemap = sm.createSitemap({
  hostname: process.env.BASE_URL,
  cacheTime: 600000,
  urls: [
    { url: '/', changefreq: 'weekly', priority: 1 }
  ]
})

if (config.contact.active) sitemap.add({ url: '/contacts', changefreq: 'yearly', priority: 0.5 })
if (config.press.active) sitemap.add({ url: '/espace-presse', changefreq: 'yearly', priority: 0.5 })
if (config.legals.active) sitemap.add({ url: '/mentions-legales', changefreq: 'yearly', priority: 0.5 })
if (config.recruit.active) sitemap.add({ url: '/recrutement', changefreq: 'yearly', priority: 0.5 })

app.prepare()
  .then(() => {
    const server = express()

    server.get('/robots.txt', (req, res) => {
      res.type('text/plain')
      res.send(`User-agent: *\nDisallow:\nSitemap: ${process.env.BASE_URL}/sitemap.xml`)
    })

    server.get('/sitemap.xml', function (req, res) {
      sitemap.toXML(function (err, xml) {
        if (err) {
          return res.status(500).end()
        }
        res.header('Content-Type', 'application/xml')
        res.send(xml)
      })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
