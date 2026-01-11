import { Link } from "react-router-dom";
import logoIcon from "@/assets/logo-icon.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { label: "Fonctionnalités", href: "/#features" },
      { label: "Comment ça marche", href: "/#how-it-works" },
      { label: "Tarifs", href: "/pricing" },
      { label: "Intégrations", href: "/integrations" },
    ],
    company: [
      { label: "À propos", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Carrières", href: "/careers" },
      { label: "Presse", href: "/press" },
    ],
    resources: [
      { label: "Documentation", href: "/docs" },
      { label: "Guides", href: "/guides" },
      { label: "Support", href: "/support" },
      { label: "API", href: "/api" },
    ],
    legal: [
      { label: "Confidentialité", href: "/privacy" },
      { label: "CGU", href: "/terms" },
      { label: "Mentions légales", href: "/legal" },
    ],
  };

  return (
    <footer className="bg-foreground text-background/80 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoIcon} alt="LogisConnect" className="h-10 w-auto" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-background text-xl">
                  LogisConnect
                </span>
                <span className="text-xs text-background/60 font-medium tracking-wide">
                  Simplifier. Automatiser. Satisfaire.
                </span>
              </div>
            </div>
            <p className="text-sm text-background/60 max-w-xs">
              La plateforme intelligente pour simplifier et automatiser la gestion 
              des demandes locataires.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">Produit</h4>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4">Entreprise</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4">Ressources</h4>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4">Légal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © {currentYear} LogisConnect. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-background/60">
              Hébergé en France 🇫🇷
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
