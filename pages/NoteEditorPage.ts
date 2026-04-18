import { BasePage } from './BasePage';

export class NoteEditorPage extends BasePage {

    private noteBody    = '~Note'
    private backButton  = '~BackButton'
    private navBar      = '~ICTK2NoteEditorView'

    async waitForScreen(): Promise<void> {
        await this.isExists(this.navBar)
    }

    async typeNote(text: string): Promise<void> {
        await this.typeText(this.noteBody, text)
    }

    async tapBackButton(): Promise<void> {
        await this.tap(this.backButton)
    }
    async getNoteText(): Promise<string> {
        return this.getText(this.noteBody)
    }

}
