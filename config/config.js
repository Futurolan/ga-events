let config = {
  title: 'Gamers Assembly',
  logo: `/static/img/logo.png`,
  description: 'La Gamers assembly est un ensemble de LANs organisées par l\'association Futurolan',
  metaImage: `${process.env.BASE_URL}/static/img/logo.png`,
  gaTrackingId: 'UA-128777022-1',
  recruit: {
    active: true,
    title: 'Recrutement',
    description: 'Devenir bénévole pour la Gamers Assembly, c\'est par ici !!!',
    formUrl: 'https://goo.gl/forms/84pHQfSp50RcuUel2'
  },
  contact: {
    active: true,
    pageId: 6
  },
  press: {
    active: true,
    pageId: 7
  },
  legals: {
    active: true,
    pageId: 8
  },
  social: {
    twitter: 'https://twitter.com/GamersAssembly',
    facebook: 'https://www.facebook.com/GamersAssembly',
    twitch: 'https://twitch.tv/gamers_assembly',
    youtube: 'https://www.youtube.com/channel/UCbfhRIAsc4xdRACnDUwRfRw',
    flickr: 'https://www.flickr.com/photos/futurolan'
  }
}

module.exports = config
