'use client';

import { useRef } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import AboutHero from './AboutHero';
import CoreValues from './CoreValues';
import TechStack from './TechStack';
import Team from './Team';
import Timeline from './Timeline';
import AboutCTA from './AboutCTA';

export default function About() {
  const parallaxRef = useRef(null);

  return (
    <div className="bg-white text-gray-900 font-sans">
      <Parallax pages={6} ref={parallaxRef} style={{ background: '#ffffff' }}>
        {/* Hero Section */}
        <ParallaxLayer offset={0} speed={0.5} style={{ background: '#ffffff' }}>
          <AboutHero />
        </ParallaxLayer>

        {/* Core Values */}
        <ParallaxLayer offset={1} speed={0.6} style={{ background: '#ffffff' }}>
          <CoreValues />
        </ParallaxLayer>

        {/* Tech Stack */}
        <ParallaxLayer offset={2} speed={0.7} style={{ background: '#ffffff' }}>
          <TechStack />
        </ParallaxLayer>

        {/* Team Section */}
        <ParallaxLayer offset={3} speed={0.5} style={{ background: '#ffffff' }}>
          <Team />
        </ParallaxLayer>

        {/* Timeline */}
        <ParallaxLayer offset={4} speed={0.6} style={{ background: '#ffffff' }}>
          <Timeline />
        </ParallaxLayer>

        {/* CTA */}
        <ParallaxLayer offset={5} speed={0.4} style={{ background: '#ffffff' }}>
          <AboutCTA />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}