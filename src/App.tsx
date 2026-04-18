/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Features from './components/Features';
import CLISection from './components/CLISection';
import VisualBuilder from './components/VisualBuilder';
import Frameworks from './components/Frameworks';
import Sponsors from './components/Sponsors';
import AIGenerator from './components/AIGenerator';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <TrustedBy />
        <Features />
        <CLISection />
        <Frameworks />
        <AIGenerator />
        <VisualBuilder />
        <Sponsors />
        <Testimonials />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
