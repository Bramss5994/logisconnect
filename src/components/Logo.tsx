import logoIcon from "@/assets/logo-icon.png";

interface LogoProps {
  showSlogan?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

const Logo = ({ showSlogan = false, size = "md", variant = "full" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-14",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center gap-3">
      <div className="bg-transparent p-1.5 rounded-lg">
        <img 
          src={logoIcon} 
          alt="LogisConnect" 
          className={`${sizeClasses[size]} w-auto`}
        />
      </div>
      {variant === "full" && (
        <div className="flex flex-col">
          <span className={`font-display font-bold text-primary ${textSizes[size]}`}>
            LogisConnect
          </span>
          {showSlogan && (
            <span className="text-xs text-muted-foreground font-medium tracking-wide">
              Simplifier. Automatiser. Satisfaire.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
