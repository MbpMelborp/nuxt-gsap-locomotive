// https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate
const fs = require('fs')
const axios = require('axios')

export default {
  generate: {
    fallback: true,
    routes: (callback) => {
      const token =
        process.env.NODE_ENV === 'production'
          ? process.env.STORYBLOK_PROD
          : process.env.STORYBLOK_DEV
      const version = 'published'
      let cacheVersion = 0

      axios
        .get(`https://api.storyblok.com/v2/cdn/spaces/me?token=${token}`)
        .then((spaceRes) => {
          cacheVersion = spaceRes.data.space.version

          axios
            .get(
              `https://api.storyblok.com/v2/cdn/links?token=${token}&version=${version}&cv=${cacheVersion}&per_page=100`
            )
            .then((res) => {
              // console.log('LINKS DATA', res.data)
              const seos = []
              const seosInfo = {}
              const routes = []
              Object.keys(res.data.links).forEach((key) => {
                const slug = res.data.links[key].slug
                const url = `https://api.storyblok.com/v2/cdn/stories/${slug}?cv=${cacheVersion}&token=${token}&version=published`
                seos.push(axios.get(url))
              })
              Promise.all(seos).then(function (stories) {
                // console.log('🏷️ SEO ->', 'GENERATED URLS', stories.length)
                stories.forEach((story) => {
                  const routeInfo = {
                    route:
                      story.data.story.full_slug !== 'home'
                        ? '/' + story.data.story.full_slug
                        : '/',
                    // payload: story,
                    title: story.data.story.name,
                    meta: [
                      {
                        hid: 'description',
                        name: 'description',
                        content: story.data.story.content.seo.description,
                      },
                      {
                        hid: 'hello',
                        name: 'hello',
                        content: story.data.story.name,
                      },
                      // {
                      //   hid: `productPageKeywords-${product.id}`,
                      //   name: 'keywords',
                      //   content: product.keywords,
                      // },
                    ],
                  }
                  routes.push(routeInfo)
                  seosInfo[story.data.story.slug.split('/').join('')] =
                    story.data.story.content.seo
                })
                // console.log('STORIES', seosInfo)
                const file = 'dist/seo.json'
                setTimeout(() => {
                  if (fs) {
                    if (fs.existsSync('dist')) {
                      fs.writeFile(
                        file,
                        JSON.stringify(seosInfo),
                        function (err) {
                          if (err) {
                            return console.error(err)
                          }
                          console.log('🏷️ SEO ->', 'FILE SAVED', file)
                        }
                      )
                    } else {
                      console.error('🏷️ SEO ->', 'FILE NOT SAVED', file)
                    }
                  }
                }, 4000)

                // console.log('ROUTES', routes)
                callback(null, routes)
              })
            })
        })
      return ['/']
    },
  },
}

// https://api.storyblok.com/v2/cdn/stories/home&cv=1644592177&token=aS3TGOJExVyKLIUrtyiIeAtt&version=published
// https://api.storyblok.com/v2/cdn/stories/home?cv=1644592177&token=aS3TGOJExVyKLIUrtyiIeAtt&version=published
