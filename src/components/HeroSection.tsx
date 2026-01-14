import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-hero-gradient flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--blue-accent)) 2px, transparent 2px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-accent/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <span className="inline-block px-4 py-2 rounded-full bg-secondary border border-border text-sm text-muted-foreground mb-8 animate-fade-in">
          ✨ Explore Our Premium Collections
        </span>
        
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 animate-slide-up">
          Discover Timeless
          <br />
          <span className="text-gradient">Carpet Artistry</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Browse our curated collection of handcrafted carpets. View, download, and share stunning designs from around the world.
        </p>
        
        <a 
          href="#collections" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-glow transition-all duration-300 animate-slide-up"
          style={{ animationDelay: '0.4s' }}
        >
          Explore Collections
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
