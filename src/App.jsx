import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy loaded components
const Home = lazy(() => import('./page/Home'));
const Resume = lazy(() => import('./page/Resume'));
const ResumeFormat = lazy(() => import('./page/ResumeFormat'));

function App() {
  console.log({
    owner: "Azimuddeen Khan",
    portfolio: "https://everazim.vercel.app/",
    contact: '7678084267',
  });

  const Loader = <div className="p-10 text-center text-xl">Loading...</div>;

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={Loader}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/resume"
          element={
            <Suspense fallback={Loader}>
              <Resume />
            </Suspense>
          }
        />
        <Route
          path="/resume-format"
          element={
            <Suspense fallback={Loader}>
              <ResumeFormat />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
