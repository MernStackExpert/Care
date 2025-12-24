"use client";

import React from 'react';

import About from '@/components/About';
import ServicesHome from '@/components/ServicesHome';
import Testimonials from '@/components/Testimonials';
import Hero from '@/components/Hero';

const Home = () => {
  return (
    <div className='min-h-screen '>
     <Hero/>
     <About/>
     <ServicesHome/>
     <Testimonials/>
    </div>
  );
};

export default Home;