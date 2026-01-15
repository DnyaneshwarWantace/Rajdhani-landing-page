const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-center pt-4 sm:pt-6">
        {/* Logo - Centered and bigger */}
        <div className="flex items-center justify-center">
          <img 
            src="/logo.svg" 
            alt="Rajdhani Logo" 
            className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain rounded-lg"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
