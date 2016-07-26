# Tungsten Redux Adaptor

##BETA

Connects Redux & Tungsten!

To see TODO MVC demo, clone repo and `npm i && npm start`

Relies on changes to Tungsten core https://github.com/wayfair/tungstenjs/pull/251 - uses temp scoped npm module `@ndreckshage/tungstenjs`.

BUGS/TODO:
- [x] ```this.options.context.view``` won't work. Always references initial view context. Edit item, save it, then edit again to reproduce the error.
- [x] Actually pull over adaptor from Tungsten fork branch (edited adaptor inline).
- [ ] Remove scoped module when Tungsten core pr merged (npm directory issue)
- [ ] Publish to npm
- [ ] Selector API or something.
- [ ] Would be nice to inherit from a Tungsten base view rather than the backbone view adaptor (needs Tungsten work to do so).
- [ ] There is probably a lot in Tungsten Adaptors that's not implemented.
- [ ] See about improving adaptor documentation.
