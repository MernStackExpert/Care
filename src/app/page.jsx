"use client";
import About from '@/componants/Home/About';
import Hero from '@/componants/Home/Hero';
import ServicesHome from '@/componants/Home/ServicesHome';
import Testimonials from '@/componants/Home/Testimonials';
import React from 'react';

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