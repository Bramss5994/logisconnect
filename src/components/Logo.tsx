import { Home } from "lucide-react";

interface LogoProps {
  showSlogan?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

const Logo = ({ showSlogan = false, size = "md", variant = "full" }: LogoProps) => {
  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const sloganSizes = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
  };

  return (
    <div className="flex items-center gap-2">
      <Home className={`${iconSizes[size]} text-primary`} />
      {variant === "full" && (
        <div className="flex flex-col">
          <span className={`font-display font-bold text-primary ${textSizes[size]} leading-tight`}>
            LogisConnect
          </span>
          {showSlogan && (
            <span className={`text-muted-foreground font-medium tracking-wide ${sloganSizes[size]}`}>
              Simplifier. Automatiser. Satisfaire.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
