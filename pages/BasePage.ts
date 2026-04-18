import type { ChainablePromiseElement } from 'webdriverio'

export class BasePage {

    protected async waitForElement(selector: string,timeout = 15000): Promise<ChainablePromiseElement> {
        const el = $(selector)
        await el.waitForDisplayed({ timeout })
        return el
      }
    
    protected async tap(selector: string): Promise<void>{
        const el = await this.waitForElement(selector)
        await el.click()
    }
    protected async typeText(selector: string, text:string): Promise<void>{
        const el = await this.waitForElement(selector)
        await el.clearValue()
        await el.setValue(text)
    }
    protected async getText(selector: string): Promise<string>{
        const el = await this.waitForElement(selector)
        return el.getText()
    }
    protected async isDisplayed(selector: string, timeout = 5000): Promise<boolean>{
        try {
            await this.waitForElement(selector, timeout)
            return true
          } catch {
            return false
          }
        
    }
    protected async isEnabled(selector: string): Promise<boolean>{
        const el = await this.waitForElement(selector)
        return el.isEnabled()
    }
    protected async isSelected(selector: string): Promise<boolean>{
        const el = await this.waitForElement(selector)
        return el.isSelected()
    }
    
    protected async assertExists(selector: string, timeout = 5000): Promise<void> {
        const el = $(selector)
        await el.waitForExist({
            timeout,
            timeoutMsg: `Element not found: ${selector}`,
    })
}
    protected async isExists(selector: string, timeout = 5000): Promise<boolean> {
        try {
            const el = $(selector)
            await el.waitForExist({ timeout })
            return true
        } catch {
            return false
        }
    }
    protected async scroll(direction: 'up' | 'down' | 'left' | 'right' = 'down'): Promise<void> {
        await browser.execute('mobile: scroll', { direction })
      }
}
