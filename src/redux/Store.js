import { configureStore } from "@reduxjs/toolkit"
import  FormSlice from './Form/FormSlice'
const Store = configureStore({
    reducer:{FormSlice}
})

export default Store