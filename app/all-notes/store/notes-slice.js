import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    isNoteEditorOpen: false,
    noteTitle: "Untitled Note",
  },
  reducers: {
    // Open note editor with untitled note
    openNoteEditor: (state, action) => {
      if (action.payload === "open") {
        state.isNoteEditorOpen = true;
      } else {
        state.isNoteEditorOpen = false;
      }

      state.noteTitle = "Untitled Note";
    },
    // Update note title
    updateNoteTitle: (state, action) => {
      state.noteTitle = action.payload;
    },
  },
});

export const { openNoteEditor, updateNoteTitle } = notesSlice.actions;
export default notesSlice.reducer;
