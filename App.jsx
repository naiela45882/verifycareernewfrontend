import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./LandingPage";
import Settings from "./Settings";
import ProtectedRoute from "./ProtectedRoute";
import AppShell from "./components/layout/AppShell";
import { AuthModalProvider } from "./landing/context/AuthModalContext";

import DashboardPage from "./pages/DashboardPage";
import JourneyPage from "./pages/JourneyPage";
import JourneyTargetPage from "./pages/JourneyTargetPage";
import JourneyRoadmapPage from "./pages/JourneyRoadmapPage";
import JourneyProgressPage from "./pages/JourneyProgressPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import ApplicationDetailPage from "./pages/ApplicationDetailPage";
import ResumeBuilderPage from "./pages/resume/ResumeBuilderPage";
import PrimaryResumePage from "./pages/resume/PrimaryResumePage";
import ResumeVersionsPage from "./pages/resume/ResumeVersionsPage";
import TailorToJobPage from "./pages/resume/TailorToJobPage";
import ResumeFeedbackPage from "./pages/resume/ResumeFeedbackPage";
import OfferLetterPage from "./pages/verification/OfferLetterPage";
import RecruiterPage from "./pages/verification/RecruiterPage";
import HistoryPage from "./pages/verification/HistoryPage";
import ScanDetailPage from "./pages/verification/ScanDetailPage";
import CompanyLookupPage from "./pages/trust/CompanyLookupPage";
import CompanyTrustDetailPage from "./pages/trust/CompanyTrustDetailPage";
import SafeSignalsPage from "./pages/community/SafeSignalsPage";
import SignalDetailPage from "./pages/community/SignalDetailPage";
import ScamReportsPage from "./pages/community/ScamReportsPage";
import ScamReportDetailPage from "./pages/community/ScamReportDetailPage";
import DiscussionsPage from "./pages/community/DiscussionsPage";
import DiscussionDetailPage from "./pages/community/DiscussionDetailPage";
import SafeCompanyDetailPage from "./pages/community/SafeCompanyDetailPage";

function App() {
  return (
    <BrowserRouter>
      <AuthModalProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Navigate to="/?auth=sign-in" replace />} />
          <Route
            path="/forgot-password"
            element={<Navigate to="/?auth=sign-in" replace />}
          />

          <Route element={<ProtectedRoute />}>
            <Route element={<AppShell />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/resume" element={<ResumeBuilderPage />} />
              <Route path="/resume/plain" element={<PrimaryResumePage />} />
              <Route path="/resume/versions" element={<ResumeVersionsPage />} />
              <Route path="/resume/tailor" element={<TailorToJobPage />} />
              <Route path="/resume/feedback" element={<ResumeFeedbackPage />} />
              <Route path="/compare" element={<Navigate to="/resume/tailor" replace />} />
              <Route path="/journey" element={<JourneyPage />} />
              <Route path="/journey/target" element={<JourneyTargetPage />} />
              <Route path="/journey/roadmap" element={<JourneyRoadmapPage />} />
              <Route path="/journey/progress" element={<JourneyProgressPage />} />
              <Route path="/applications" element={<ApplicationsPage />} />
              <Route path="/applications/:id" element={<ApplicationDetailPage />} />
              <Route path="/analyze" element={<Navigate to="/trust/offer-letter" replace />} />
              <Route path="/trust/offer-letter" element={<OfferLetterPage />} />
              <Route path="/trust/recruiter" element={<RecruiterPage />} />
              <Route path="/trust/history" element={<HistoryPage />} />
              <Route path="/trust/history/:scanId" element={<ScanDetailPage />} />
              <Route path="/trust/company" element={<CompanyLookupPage />} />
              <Route path="/trust/company/:idOrSlug" element={<CompanyTrustDetailPage />} />
              <Route path="/verification/offer-letter" element={<Navigate to="/trust/offer-letter" replace />} />
              <Route path="/verification/recruiter" element={<Navigate to="/trust/recruiter" replace />} />
              <Route path="/verification/history" element={<Navigate to="/trust/history" replace />} />
              <Route path="/verification/history/:scanId" element={<Navigate to="/trust/history/:scanId" replace />} />
              <Route path="/community" element={<Navigate to="/community/scam-reports" replace />} />
              <Route path="/community/scam-reports" element={<ScamReportsPage />} />
              <Route path="/community/scam-reports/:id" element={<ScamReportDetailPage />} />
              <Route path="/community/discussions" element={<DiscussionsPage />} />
              <Route path="/community/discussions/:id" element={<DiscussionDetailPage />} />
              <Route path="/community/signals" element={<SafeSignalsPage />} />
              <Route path="/community/signals/:id" element={<SignalDetailPage />} />
              <Route path="/community/safe-companies" element={<Navigate to="/trust/company" replace />} />
              <Route path="/community/safe-companies/:id" element={<SafeCompanyDetailPage />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </AuthModalProvider>
    </BrowserRouter>
  );
}

export default App;
