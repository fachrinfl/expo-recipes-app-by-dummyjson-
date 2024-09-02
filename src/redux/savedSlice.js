import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getFirestore, addDoc, collection, getDocs, deleteDoc, doc, query, where} from 'firebase/firestore';
import app from '../../firebaseConfig';

const db = getFirestore(app);


export const fetchSaved = createAsyncThunk('recipes/fetchSaved', async () => {
  const querySnapshot = await getDocs(collection(db, "saved"));
  const saved = querySnapshot.docs.map(doc => {
    return { 
      docId: doc.id,
      ...doc.data(), 
  }
  });
  return saved;
});

export const addSaved = createAsyncThunk('recipes/addSaved', async (content, {dispatch}) => {
  await addDoc(collection(db, "saved"), content);
  dispatch(fetchSaved());
});

export const deleteSaved = createAsyncThunk('recipes/deleteSaved', async (savedId, { dispatch }) => {
    await deleteDoc(doc(collection(db, "saved"), savedId));
    dispatch(fetchSaved());
    return null;
});

export const fetchSavedById = async (id) => {
  try {
    const q = query(collection(db, "saved"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const saved = querySnapshot.docs.map(doc => {
      return { 
        docId: doc.id,
        ...doc.data(), 
    }
    });
    return saved.length ? saved[0] : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const savedSlice = createSlice({
  name: "saved",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchSaved.fulfilled, (state, action) => action.payload)
        .addCase(addSaved.fulfilled, (state, action) => state)
        .addCase(deleteSaved.fulfilled, (state, action) => state)
},
});

export default savedSlice.reducer;