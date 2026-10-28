import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

function getStorageKey(userId) {
  return `lumeora-mood-${userId}`
}

export const loadMoodHistory = createAsyncThunk('mood/loadHistory', async (userId) => {
  const savedMoods = localStorage.getItem(getStorageKey(userId))
  return { userId, history: savedMoods ? JSON.parse(savedMoods) : [] }
})

export const saveMoodEntry = createAsyncThunk('mood/saveEntry', async ({ userId, mood }) => {
  const savedMoods = localStorage.getItem(getStorageKey(userId))
  const history = savedMoods ? JSON.parse(savedMoods) : []
  const updatedHistory = [
    { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, mood, createdAt: new Date().toISOString() },
    ...history,
  ].slice(0, 10)

  localStorage.setItem(getStorageKey(userId), JSON.stringify(updatedHistory))
  return { userId, history: updatedHistory }
})

const moodSlice = createSlice({
  name: 'mood',
  initialState: { history: [], userId: null, loading: false, saving: false, error: '' },
  reducers: {
    clearMoodState(state) {
      state.history = []
      state.userId = null
      state.loading = false
      state.saving = false
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMoodHistory.pending, (state, action) => {
        state.loading = true
        state.error = ''
        state.userId = action.meta.arg
        state.history = []
      })
      .addCase(loadMoodHistory.fulfilled, (state, action) => {
        if (state.userId !== action.payload.userId) return
        state.history = action.payload.history
        state.loading = false
      })
      .addCase(loadMoodHistory.rejected, (state, action) => {
        if (state.userId !== action.meta.arg) return
        state.loading = false
        state.error = 'Mood history could not be loaded from this browser.'
      })
      .addCase(saveMoodEntry.pending, (state, action) => {
        state.saving = true
        state.error = ''
        state.userId = action.meta.arg.userId
      })
      .addCase(saveMoodEntry.fulfilled, (state, action) => {
        if (state.userId !== action.payload.userId) return
        state.history = action.payload.history
        state.saving = false
      })
      .addCase(saveMoodEntry.rejected, (state, action) => {
        if (state.userId !== action.meta.arg.userId) return
        state.saving = false
        state.error = 'Your mood could not be saved. Please check browser storage.'
      })
  },
})

export const { clearMoodState } = moodSlice.actions
export default moodSlice.reducer
