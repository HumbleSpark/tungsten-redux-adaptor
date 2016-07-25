# Tungsten Redux Adaptor

Connect Redux & Tungsten!

BUGS/TODO:
- [x] ```this.options.context.view``` won't work. Always references initial view context. Edit item, save it, then edit again to reproduce the error.
- [x] Actually pull over adaptor from Tungsten fork branch (edited adaptor inline).
- [ ] Selector API or something.
- [ ] Would be nice to inherit from a Tungsten base view rather than the backbone view adaptor (needs Tungsten work to do so).
- [ ] There is probably a lot in Tungsten Adaptors that's not implemented.
- [ ] See about improving adaptor documentation.
