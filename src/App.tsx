import { useStore } from '@/store/useStore';
import { LandingPage } from '@/sections/LandingPage';
import { Dashboard } from '@/sections/Dashboard';
import { WizardFlow } from '@/sections/WizardFlow';
import { ZoningLookup } from '@/sections/ZoningLookup';
import { OverlayMap } from '@/sections/OverlayMap';
import { LandValueEstimator } from '@/sections/LandValueEstimator';
import { CostCalculator } from '@/sections/CostCalculator';
import { ShouldIBuyScore } from '@/sections/ShouldIBuyScore';
import { FeasibilityReport } from '@/sections/FeasibilityReport';
import { ProForma } from '@/sections/ProForma';
import { PermitMapper } from '@/sections/PermitMapper';
import { DocumentChecklist } from '@/sections/DocumentChecklist';
import { PermitTimeline } from '@/sections/PermitTimeline';
import { CommunityDashboard } from '@/sections/CommunityDashboard';
import { ContractorDirectory } from '@/sections/ContractorDirectory';
import { BidComparison } from '@/sections/BidComparison';
import { MilestoneTracker } from '@/sections/MilestoneTracker';
import { FinancingDirectory } from '@/sections/FinancingDirectory';
import { RegulatoryAlerts } from '@/sections/RegulatoryAlerts';
import { PostDisasterNavigator } from '@/sections/PostDisasterNavigator';
import { CostOfDelay } from '@/sections/CostOfDelay';
import { LivePermitStatus } from '@/sections/LivePermitStatus';
import { AppPrepAssistant } from '@/sections/AppPrepAssistant';
import { UpgradePage } from '@/sections/UpgradePage';
import { SettingsPage } from '@/sections/SettingsPage';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const currentView = useStore((s) => s.currentView);

  const renderView = () => {
    switch (currentView) {
      case 'landing': return <LandingPage />;
      case 'dashboard': return <Dashboard />;
      case 'wizard': return <WizardFlow />;
      case 'zoning': return <ZoningLookup />;
      case 'overlays': return <OverlayMap />;
      case 'land-value': return <LandValueEstimator />;
      case 'cost-calculator': return <CostCalculator />;
      case 'should-i-buy': return <ShouldIBuyScore />;
      case 'feasibility-report': return <FeasibilityReport />;
      case 'pro-forma': return <ProForma />;
      case 'permit-mapper': return <PermitMapper />;
      case 'document-checklist': return <DocumentChecklist />;
      case 'permit-timeline': return <PermitTimeline />;
      case 'community': return <CommunityDashboard />;
      case 'contractors': return <ContractorDirectory />;
      case 'bid-comparison': return <BidComparison />;
      case 'milestones': return <MilestoneTracker />;
      case 'financing': return <FinancingDirectory />;
      case 'regulatory-alerts': return <RegulatoryAlerts />;
      case 'post-disaster': return <PostDisasterNavigator />;
      case 'cost-of-delay': return <CostOfDelay />;
      case 'permit-status': return <LivePermitStatus />;
      case 'app-prep': return <AppPrepAssistant />;
      case 'upgrade': return <UpgradePage />;
      case 'settings': return <SettingsPage />;
      default: return <LandingPage />;
    }
  };

  return (
    <>
      {renderView()}
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
