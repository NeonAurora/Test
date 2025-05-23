import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Layout from "./components/Layout/Layout";
import AdminLayout from "./components/Layout/AdminLayout";
import Site from "./pages/Site";
import Properties from "./pages/Properties/Properties";
import Property from "./pages/Property/Property";
import Offer from "./components/Offer/Offer";
import AddProperty from "./pages/AddProperty/AddProperty";
import { UserProvider } from "./utils/UserContext";
import { AuthProvider } from "./utils/AuthContext";
import EditProperty from "./pages/EditProperty/EditProperty";
import DFW from "./pages/DFW/DFW";
import Austin from "./pages/Austin/Austin";
import Houston from "./pages/Houston/Houston";
import SanAntonio from "./pages/SanAntonio/SanAntonio";
import OtherLands from "./pages/OtherLands/OtherLands";
import Financing from "./pages/Financing/Financing";
import AboutUs from "./pages/AboutUs/AboutUs";
import Support from "./pages/Support/Support";
import Search from "./components/Search/Search";
import Admin from "./pages/Admin/Admin";
import OfferTable from "./components/OfferTable/OfferTable";
import CreateUser from "./pages/CreateUser/CreateUser";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Sell from "./pages/Sell/Sell";
import Qualify from "./pages/Qualify/Qualify";
import QualificationsDashboard from "./components/QualificationsDashboard/QualificationsDashboard";
import Subscription from "./pages/Subscription/Subscription";
import VipSignupForm from "./pages/Subscription/VipSignupForm";
import AdminUsers from "./pages/AdminUsers/AdminUsers";
import UserDetail from "./components/UserDetail/UserDetail";
import AdminBuyers from "./pages/AdminBuyers/AdminBuyers";
import BuyerDetail from "./components/BuyerDetail/BuyerDetail";
import CreateBuyer from "./components/CreateBuyer/CreateBuyer";
import EditBuyer from "./components/EditBuyer/EditBuyer";
import BuyerOffers from "./components/BuyerOffers/BuyerOffers";
import BuyerLists from "./components/BuyerLists/BuyerLists";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* Main site routes with standard layout */}
                <Route element={<Layout />}>
                  <Route path="/" element={<Site />} />
                  <Route path="/properties">
                    <Route index element={<Properties />} />
                    <Route path=":propertyId" element={<Property />} />
                    <Route path=":propertyId/offers" element={<OfferTable />} />
                    <Route path=":propertyId/qualify" element={<Qualify />} />
                  </Route>
                  <Route path="/sell" element={<Sell />} />
                  <Route path="/financing" element={<Financing />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/subscription" element={<Subscription />} />
                  <Route path="/vip-signup" element={<VipSignupForm />} />
                  <Route path="/DFW" element={<DFW />} />
                  <Route path="/Austin" element={<Austin />} />
                  <Route path="/Houston" element={<Houston />} />
                  <Route path="/SanAntonio" element={<SanAntonio />} />
                  <Route path="/OtherLands" element={<OtherLands />} />
                  <Route path="/qualify" element={<Qualify />} />
                  <Route path="/CreateUservbtwP44jbX0FKKYUdHBGGCcYqenvNlYdH1Sj7K1dSD3kRo1Pib5VXQWb59a7CkQZ4DiQuu5r1t9I0uXVUbYjvvj4E1djRIkXRh40Uvbz2jSz6PZKguOjGhi7avF1b" element={<CreateUser />} />
                </Route>

                {/* Admin routes with AdminLayout */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Admin />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="users/:userId" element={<UserDetail />} />
                  <Route path="buyers" element={<AdminBuyers />} />
                  <Route path="buyers/create" element={<CreateBuyer />} />
                  <Route path="buyers/:buyerId" element={<BuyerDetail />} />
                  <Route path="buyers/:buyerId/edit" element={<EditBuyer />} />
                  <Route path="buyers/:buyerId/offers" element={<BuyerOffers />} />
                  <Route path="buyer-lists" element={<BuyerLists />} />
                  <Route path="qualifications" element={<QualificationsDashboard />} />
                  <Route path="add-property" element={<AddProperty />} />
                  <Route path="edit-property/:propertyId" element={<EditProperty />} />
                  <Route path="financing/applications" element={<OfferTable />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
          <ToastContainer />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;