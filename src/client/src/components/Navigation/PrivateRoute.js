import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from '../Authentication/AuthDetails';

import Calendar from '../Calendar';
import Statistics from '../Statistics';
import Discussion from '../Discussion';
import Matching from '../Matching';
import Landing from '../Landing';
import Contact from '../Contact';
import Settings from '../Settings';
import FAQ from '../FAQ';
import Search from '../Search';
import Profile from '../Profile';
import QA from '../QA';
import Similar from "../Similar";

const ProtectedRoute = ({ children }) => {
  const { authUser, loading } = useContext(AuthContext);
  console.log('--- PROTECTED ROUTE CHECK ---', { hasUser: !!authUser, loading });
  
  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>Loading...</div>;
  }
  
  if (!authUser) {
    console.log('--- REDIRECTING TO LANDING (NOT AUTHENTICATED) ---');
    return <Navigate to="/" replace />;
  }
  return children;
};

export default function AppRoutes() {
  console.log('--- APPROUTES RENDERING ---', window.location.pathname);
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/Calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
      <Route path="/Statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
      <Route path="/Discussion" element={<ProtectedRoute><Discussion /></ProtectedRoute>} />
      <Route path="/Matching" element={<ProtectedRoute><Matching /></ProtectedRoute>} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/FAQ" element={<FAQ />} />
      <Route path="/Search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
      <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/QA" element={<ProtectedRoute><QA /></ProtectedRoute>} />
      <Route path="/Similar" element={<ProtectedRoute><Similar /></ProtectedRoute>} />
    </Routes>
  );
}