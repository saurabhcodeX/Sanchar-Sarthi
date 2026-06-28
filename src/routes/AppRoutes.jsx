import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "../services/auth";

import MainLayout       from "../layouts/MainLayout";
import Home             from "../pages/Home";
import LoginRegister    from "../pages/LoginRegister";
import Results          from "../pages/Results";
import Bookings         from "../pages/Bookings";
import PassengerDetails from "../pages/PassengerDetails";
import Payment          from "../pages/Payment";
import Ticket           from "../pages/Ticket";
import Profile          from "../pages/Profile";
import Wallet           from "../pages/Wallet";
import Notifications    from "../pages/Notifications";
import TrainDetails     from "../pages/TrainDetails";
import Contact          from "../pages/Contact";
import Support          from "../pages/Support";
import PNRStatus        from "../pages/PNRStatus";
import LiveStatus       from "../pages/LiveStatus";
import NotFound         from "../pages/NotFound";

function ProtectedRoute({ children }) {
  return auth.isLoggedIn()
    ? children
    : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"     element={<Home />} />
      <Route path="/login" element={<LoginRegister />} />

      <Route path="/results" element={
        <MainLayout><Results /></MainLayout>
      } />
      <Route path="/train/:trainId" element={
        <MainLayout><TrainDetails /></MainLayout>
      } />
      <Route path="/contact" element={
        <MainLayout><Contact /></MainLayout>
      } />
      <Route path="/support" element={
        <MainLayout><Support /></MainLayout>
      } />
      <Route path="/pnr-status" element={
        <MainLayout><PNRStatus /></MainLayout>
      } />
      <Route path="/live-status" element={
        <MainLayout><LiveStatus /></MainLayout>
      } />

      <Route path="/bookings" element={
        <ProtectedRoute><MainLayout><Bookings /></MainLayout></ProtectedRoute>
      } />
      <Route path="/passengers" element={
        <ProtectedRoute><MainLayout><PassengerDetails /></MainLayout></ProtectedRoute>
      } />
      <Route path="/payment" element={
        <ProtectedRoute><MainLayout><Payment /></MainLayout></ProtectedRoute>
      } />
      <Route path="/ticket" element={
        <ProtectedRoute><MainLayout><Ticket /></MainLayout></ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>
      } />
      <Route path="/wallet" element={
        <ProtectedRoute><MainLayout><Wallet /></MainLayout></ProtectedRoute>
      } />
      <Route path="/notifications" element={
        <ProtectedRoute><MainLayout><Notifications /></MainLayout></ProtectedRoute>
      } />

      <Route path="*" element={
        <MainLayout><NotFound /></MainLayout>
      } />
    </Routes>
  );
}