# Tungsten Redux Adaptor

##BETA

Connects Redux & Tungsten!

To see TODO MVC demo, clone repo and `npm i && npm start`

Relies on changes to Tungsten core https://github.com/wayfair/tungstenjs/pull/251 - uses temp scoped npm module `@ndreckshage/tungstenjs`.

BUGS/TODO:
- [x] ```this.options.context.view``` won't work. Edit item, save it, then edit again to reproduce the error.
- [x] Pull over adaptor from Tungsten fork branch (edited adaptor inline).
- [x] Publish to npm
- [ ] Remove scoped module when Tungsten core pr merged (npm directory issue)
- [ ] There is probably a lot in Tungsten Adaptors that's not implemented. See about improving adaptor documentation.

General Tungsten API improvement ideas:
- Set adaptor `Tungsten.setAdaptor(require('tungten-redux-adaptor'));`
- Borrow from React to kickstart app `Tungsten.render()`
- Import view from Tungsten instead of adaptor. 
- Tungsten core should own the view. Copy over backbone view and give me ES6 classes etc. `export default class extends Tungsten.View`
- Model & collection stuff entirely outside of Tungsten core? Backbone adaptor. Router as well, etc.
- `tungsten-loader` as a standalone npm module
- Selector API for Tungsten view. Rather than derived models. Can be used by multiple adaptors.
