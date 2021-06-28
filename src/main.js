import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import {I18N, TCustomAttribute} from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
    .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
      let aliases = ['t', 'i18n'];

      TCustomAttribute.configureAliases(aliases);
      instance.i18next.use(Backend);
      return instance.setup({
        backend: {
          loadPath: './locales/{{lng}}/{{ns}}.json',
        },
        attributes: aliases,
        lng: 'de',
        fallbackLng: 'en',
        whitelist: ['en', 'de', 'it', 'fr'],
        preload: ['en', 'de', 'it', 'fr'],
        debug: false
      });
    });

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
