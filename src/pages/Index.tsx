import { useState } from 'react';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { CoreFinanceiro } from '@/components/landing/CoreFinanceiro';
import { ModulesSection } from '@/components/landing/ModulesSection';
import { SegmentsSection } from '@/components/landing/SegmentsSection';
import { ProcessSection } from '@/components/landing/ProcessSection';
import { CustomizationSection } from '@/components/landing/CustomizationSection';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { FAQSection } from '@/components/landing/FAQSection';
import { DiagnosisModal } from '@/components/landing/DiagnosisModal';
import { Footer } from '@/components/landing/Footer';

const Index = () => {
  const [isDiagnosisOpen, setIsDiagnosisOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      <Header onOpenDiagnosis={() => setIsDiagnosisOpen(true)} />
      
      <main>
        <Hero onOpenDiagnosis={() => setIsDiagnosisOpen(true)} />
        <CoreFinanceiro />
        <ModulesSection />
        <SegmentsSection />
        <ProcessSection />
        <CustomizationSection />
        <FAQSection />
        <FinalCTA onOpenDiagnosis={() => setIsDiagnosisOpen(true)} />
      </main>
      
      <Footer />
      
      <DiagnosisModal 
        isOpen={isDiagnosisOpen} 
        onClose={() => setIsDiagnosisOpen(false)} 
      />
    </div>
  );
};

export default Index;
