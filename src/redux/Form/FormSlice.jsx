import { createSlice } from "@reduxjs/toolkit";

const FormSlice = createSlice({
  name: "form",
  initialState: {
    headerOne: {
      name: "",
      email: "",
      number: "",
      address: "",
    },
    social:{
      linkedin:'',
      github:'',
      portfolio:"",
      leetcode:''
    },
    summary: "",
    workExperience: [],
    skill: [],
    project: [],
    course: [],
    education: [],
    certification: [],
    otherInfomation:[]
  },
  reducers: {
    setHeaderOne: (state, action) => {
      // console.log(state)
      // console.log(action.payload)
      return { ...state, headerOne: action.payload }; // Merges new values into the existing state
    },
    setSummaryState: (state, action) => {
      // console.log(stat)
      return { ...state, summary: action.payload.summary };
    },
    setWorkExperienceStateAll: (state, action) => {
      return { ...state, workExperience: action.payload };
    },
    setSkillStateAll: (s, a) => {
      return { ...s, skill: a.payload };
    },
    setProjectStateAll: (s, a) => {
      return { ...s, project: a.payload };
    },
    setCourseStateAll: (s, a) => {
      return { ...s, course: a.payload };
    },
    setEducationStateAll: (s, a) => {
      return { ...s, education: a.payload };
    },
    setCertificationStateAll: (s, a) => {
      return { ...s, certification: a.payload };
    },
    setOtherCertificationStateAll:(s,a)=>{
        return {...s,otherInfomation:a.payload}
    },
    setSocialStateAll:(s,a)=>{
      // console.log(a.payload)
      return {...s,social:a.payload}
    },
    setInitial:(s,a)=>{
      return {...a.payload}
    }
  },
});

// Correct ESM export syntax
export const {
  setHeaderOne,
  setSummaryState,
  setWorkExperienceStateAll,
  setSkillStateAll,
  setProjectStateAll,
  setCourseStateAll,
  setEducationStateAll,
  setCertificationStateAll,
  setOtherCertificationStateAll,
  setSocialStateAll,
  setInitial
} = FormSlice.actions;
export default FormSlice.reducer;
