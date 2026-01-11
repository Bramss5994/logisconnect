import { Building2 } from "lucide-react";

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

  const containerSizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`${containerSizes[size]} rounded-xl bg-primary flex items-center justify-center`}>
        <Building2 className={`${iconSizes[size]} text-primary-foreground`} />
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
