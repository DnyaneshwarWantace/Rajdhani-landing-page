const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-center pt-4 sm:pt-6">
        {/* Logo - Centered and bigger */}
        <div className="flex items-center justify-center">
          <img 
            src="/rajdhani-logo-2.png" 
            alt="Rajdhani Logo" 
            className="h-8 sm:h-10 md:h-12 w-auto object-contain"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
