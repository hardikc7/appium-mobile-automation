import { NotesListPage } from '../pages/NotesListPage';
import { NoteEditorPage } from '../pages/NoteEditorPage';
import { notesData } from '../test-data/notes.data';

describe('Notes App', () => {
    let notesListPage: NotesListPage
    let noteEditorPage: NoteEditorPage

    beforeEach(async () => {
        notesListPage = new NotesListPage();
        noteEditorPage = new NoteEditorPage();
        await notesListPage.waitForScreen();
    })

    // it('should display notes list screen', async () => {
    //     await notesListPage.waitForScreen()
    // })
    // it('should create a new note', async () => {
    //     await notesListPage.tapNewNote()
    //     await noteEditorPage.waitForScreen()
    //     await noteEditorPage.typeNote(notesData.newNote.body)
    //     await noteEditorPage.tapBackButton()
    //     await notesListPage.waitForScreen()
    //     const isVisible = await notesListPage.isNoteVisible(notesData.newNote.body)
    //     expect(isVisible).toBe(true)
    //     // delete the note
    //     await notesListPage.deleteNote(notesData.newNote.body);
    // })

    // it('should search for an existing note', async () => {
    //     await notesListPage.tapNewNote()
    //     await noteEditorPage.waitForScreen()
    //     await noteEditorPage.typeNote(notesData.newNote.body)
    //     await noteEditorPage.tapBackButton()
    //     await notesListPage.waitForScreen()

    //     await notesListPage.searchNote(notesData.searchNote.query)
    //     const exists = await notesListPage.isNoteExisting(notesData.searchNote.query)
    //     expect(exists).toBe(true)
    //     await notesListPage.closeSearchBar()

    //     // delete the note
    //     await notesListPage.deleteNote(notesData.newNote.body);
    // })

    // it('delete an existing note', async () => {
    //     await notesListPage.tapNewNote()
    //     await noteEditorPage.waitForScreen()
    //     await noteEditorPage.typeNote(notesData.newNote.body)
    //     await noteEditorPage.tapBackButton()
    //     await notesListPage.waitForScreen()

    //     await notesListPage.deleteNote(notesData.newNote.body)
    //     const exists = await notesListPage.isNoteExisting(notesData.newNote.body)
    //     expect(exists).toBe(false)

    // })

    it('edit an existing note', async () => {
        await notesListPage.tapNewNote()
        await noteEditorPage.waitForScreen()
        await noteEditorPage.typeNote(notesData.newNote.body)
        await noteEditorPage.tapBackButton()
        await notesListPage.waitForScreen()

        await notesListPage.tapNote(notesData.newNote.body)
        await noteEditorPage.waitForScreen()
        await noteEditorPage.typeNote(notesData.editNote.body)
        await noteEditorPage.tapBackButton()
        await notesListPage.waitForScreen()

        // verify edited note appears
        const exists = await notesListPage.isNoteExisting(notesData.editNote.body)
        expect(exists).toBe(true)
        await notesListPage.deleteNote(notesData.editNote.body);

    })
})
