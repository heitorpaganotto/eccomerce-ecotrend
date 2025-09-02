
import React from 'react';
import { ArrowRight, Leaf, Recycle, Heart } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-hero-gradient overflow-hidden">
      <div className="relative min-h-[400px] md:min-h-[500px] bg-hero-gradient flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Descubra a 
              <span className="block text-primary">
                Nova Tendência
              </span>
              em Compras Online
            </h1>
            
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Encontre produtos únicos e de qualidade. 
              Navegue por nossa coleção especial e faça sua escolha.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn-hero">
                Explorar Catálogo
              </button>
              <button className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                Saiba Mais
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 hidden lg:block">
          <div className="relative">
            <div className="w-16 h-16 bg-primary rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-full opacity-30 animate-pulse-custom"></div>
          </div>
        </div>
      </div>
      
      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            d="M0,48L48,53.3C96,59,192,69,288,69.3C384,69,480,59,576,48C672,37,768,27,864,32C960,37,1056,59,1152,64C1248,69,1344,59,1392,53.3L1440,48L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
