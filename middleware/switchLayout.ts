/**
 * @description Switch layout depending on the device
 * @see https://www.npmjs.com/package/@nuxtjs/device
 */

export default ctx => {
    ctx.layout = ctx.$device.isDesktop ? 'desktop' : 'default'
}
