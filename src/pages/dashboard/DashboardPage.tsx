import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Users,
  Wrench,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Demandes en cours",
    value: "47",
    change: "+12%",
    changeType: "positive" as const,
    icon: ClipboardList,
    color: "primary",
  },
  {
    title: "En attente",
    value: "12",
    change: "-8%",
    changeType: "negative" as const,
    icon: Clock,
    color: "warning",
  },
  {
    title: "Résolues ce mois",
    value: "156",
    change: "+23%",
    changeType: "positive" as const,
    icon: CheckCircle2,
    color: "success",
  },
  {
    title: "Urgentes",
    value: "5",
    change: "+2",
    changeType: "negative" as const,
    icon: AlertTriangle,
    color: "destructive",
  },
];

const recentRequests = [
  {
    id: "DEM-2024-0147",
    title: "Fuite d'eau cuisine",
    tenant: "Marie Martin",
    building: "Résidence Les Lilas",
    apartment: "Apt 304",
    status: "urgent",
    category: "Plomberie",
    date: "Il y a 2h",
  },
  {
    id: "DEM-2024-0146",
    title: "Panne chauffage",
    tenant: "Pierre Durand",
    building: "Tour Horizon",
    apartment: "Apt 1205",
    status: "in_progress",
    category: "Chauffage",
    date: "Il y a 5h",
  },
  {
    id: "DEM-2024-0145",
    title: "Interphone ne fonctionne pas",
    tenant: "Sophie Bernard",
    building: "Résidence du Parc",
    apartment: "Apt 102",
    status: "pending",
    category: "Électricité",
    date: "Hier",
  },
  {
    id: "DEM-2024-0144",
    title: "Problème serrure porte",
    tenant: "Lucas Petit",
    building: "Résidence Les Lilas",
    apartment: "Apt 506",
    status: "resolved",
    category: "Serrurerie",
    date: "Hier",
  },
];

const statusConfig = {
  urgent: { label: "Urgent", className: "bg-destructive text-destructive-foreground" },
  in_progress: { label: "En cours", className: "bg-info text-info-foreground" },
  pending: { label: "En attente", className: "bg-warning text-warning-foreground" },
  resolved: { label: "Résolu", className: "bg-success text-success-foreground" },
};

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Tableau de bord
          </h1>
          <p className="text-muted-foreground">
            Bienvenue, Jean. Voici un aperçu de vos demandes locataires.
          </p>
        </div>
        <Button variant="hero" asChild>
          <Link to="/dashboard/requests/new">
            Nouvelle demande
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} variant="stat" statColor={stat.color as any}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.changeType === "positive" ? "text-success" : "text-destructive"
                }`}>
                  {stat.changeType === "positive" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-display font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Demandes récentes</CardTitle>
            <CardDescription>Les dernières demandes de vos locataires</CardDescription>
          </div>
          <Button variant="outline" asChild>
            <Link to="/dashboard/requests">Voir tout</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-mono text-muted-foreground">
                      {request.id}
                    </span>
                    <Badge className={statusConfig[request.status as keyof typeof statusConfig].className}>
                      {statusConfig[request.status as keyof typeof statusConfig].label}
                    </Badge>
                    <Badge variant="outline">{request.category}</Badge>
                  </div>
                  <h4 className="font-medium text-foreground truncate">
                    {request.title}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Users className="h-4 w-4" />
                    <span>{request.tenant}</span>
                    <span>•</span>
                    <span>{request.building}</span>
                    <span>•</span>
                    <span>{request.apartment}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">{request.date}</div>
                  <Button variant="ghost" size="sm" className="mt-2" asChild>
                    <Link to={`/dashboard/requests/${request.id}`}>
                      Voir
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
