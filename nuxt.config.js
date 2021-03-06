import alias from './configuration/alias.js'
// import apollo from './configuration/apollo/'
import axios from './configuration/axios.js'
import build from './configuration/build.js'
import buildModules from './configuration/buildModules.js'
import buildDir from './configuration/buildDir.js'
import cli from './configuration/cli.js'
import components from './configuration/components.js'
import css from './configuration/css.js'
import dev from './configuration/dev.js'
import dir from './configuration/dir.js'
import extendPlugins from './configuration/extendPlugins.js'
import env from './configuration/env.js'
import generate from './configuration/generate.js'
import globalName from './configuration/globalName.js'
import gtm from './configuration/google-tag-manager.js'
import hooks from './configuration/hooks.js'
import head from './configuration/head/'
// import i18n from './configuration/i18n.js'
import image from './configuration/image.js'
import loading from './configuration/loading.js'
import loadingIndicator from './configuration/loadingIndicator.js'
import mode from './configuration/mode.js'
import modules from './configuration/modules.js'
import modulesDir from './configuration/modulesDir.js'
import pageTransition from './configuration/pageTransition.js'
import plugins from './configuration/plugins.js'
import pwa from './configuration/pwa.js'
import render from './configuration/render.js'
import rootDir from './configuration/rootDir.js'
import router from './configuration/router.js'
import runtimeConfig from './configuration/runtimeConfig.js'
// import seo from './configuration/seo.js'
import server from './configuration/server.js'
import serverMiddelware from './configuration/serverMiddelware.js'
import sitemap from './configuration/sitemap.js'
import srcDir from './configuration/srcDir.js'
import ssr from './configuration/ssr.js'
import styleResources from './configuration/styleResources.js'
import storyblok from './configuration/storyblok.js'
import svgSprite from './configuration/svgSprite.js'
import target from './configuration/target.js'
import telemetry from './configuration/telemetry.js'
import vueConfig from './configuration/vueConfig.js'
import watch from './configuration/watch.js'
import watchers from './configuration/watchers.js'
import tailwind from './configuration/tailwind.js'
require('dotenv').config()

export default {
  ...alias,
  // ...apollo,
  ...axios,
  ...build,
  ...buildModules,
  ...buildDir,
  ...cli,
  ...components,
  ...css,
  ...dev,
  ...dir,
  ...extendPlugins,
  ...env,
  ...generate,
  ...globalName,
  ...gtm,
  ...head,
  ...hooks,
  // ...i18n,
  ...image,
  ...loading,
  ...loadingIndicator,
  ...mode,
  ...modules,
  ...modulesDir,
  ...pageTransition,
  ...plugins,
  ...pwa,
  ...render,
  ...rootDir,
  ...router,
  ...runtimeConfig,
  // ...seo,
  ...server,
  ...serverMiddelware,
  ...sitemap,
  ...srcDir,
  ...ssr,
  ...styleResources,
  ...storyblok,
  ...svgSprite,
  ...target,
  ...telemetry,
  ...vueConfig,
  ...watch,
  ...watchers,
  ...tailwind,
}
