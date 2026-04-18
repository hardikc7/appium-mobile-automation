export class GestureUtils {

    async swipeLeftOnElement(selector: string): Promise<void> {
        const el = await $(selector)
        await el.waitForDisplayed({ timeout: 15000 })

        const location = await el.getLocation()
        const size = await el.getSize()

        const startX = Math.round(location.x + size.width * 0.8)
        const startY = Math.round(location.y + size.height / 2)
        const endX = Math.round(location.x + size.width * 0.2)

        await browser.action('pointer', {
            parameters: { pointerType: 'touch' }
        })
        .move({ x: startX, y: startY })
        .down()
        .move({ x: endX, y: startY, duration: 300 })
        .up()
        .perform()
    }

}