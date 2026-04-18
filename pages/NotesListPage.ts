import { BasePage } from './BasePage';
import { GestureUtils } from '../utils/GestureUtils';

export class NotesListPage extends BasePage {
    private newNoteButton = '~New note'
    private searchBar     = '~Search'
    private notesList     = '~ICNoteBrowseCollectionView'
    private closeSearch   = '~close'
    private deleteButton = '~Delete note'

  private noteCell(title: string): string {
    return `-ios predicate string:type == "XCUIElementTypeCell" AND name CONTAINS "${title}"`
  }
  private actionButton(title: string): string {
    return `-ios predicate string:type == "XCUIElementTypeButton" AND name CONTAINS "${title}"`
  }

    async waitForScreen(): Promise<void> {
        await this.assertExists(this.notesList)
    }

    async tapNewNote(): Promise<void> {
        await this.tap(this.newNoteButton)
    }

    async tapSearchBar(): Promise<void> {
        await this.tap(this.searchBar)
    }

    async tapNote(title: string): Promise<void> {
        await this.tap(this.noteCell(title))
    }

    async isNoteVisible(title: string): Promise<boolean> {
        return this.isDisplayed(this.noteCell(title))
    }

    async searchNote(query: string): Promise<void> {
        await this.tap(this.searchBar)
        await this.typeText(this.searchBar, query)
    }
    
    async closeSearchBar(): Promise<void> {
        await this.tap(this.closeSearch)
    }

    async isNoteExisting(title: string): Promise<boolean> {
        return this.isExists(this.noteCell(title))
    }

    async isActionButtonVisible(title: string): Promise<boolean> {
        return this.isDisplayed(this.actionButton(title))
    }

    async deleteNote(title: string): Promise<void> {
        const gestureUtils = new GestureUtils()
        await gestureUtils.swipeLeftOnElement(this.noteCell(title))
        await this.tap(this.deleteButton)
    }
}
