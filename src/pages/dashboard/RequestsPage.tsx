import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Users,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const requests = [
  {
    id: "DEM-2024-0147",
    title: "Fuite d'eau cuisine",
    tenant: "Marie Martin",
    building: "Résidence Les Lilas",
    apartment: "Apt 304",
    status: "urgent",
    category: "Plomberie",
    priority: "high",
    createdAt: "2024-01-15",
    provider: null,
  },
  {
    id: "DEM-2024-0146",
    title: "Panne chauffage collectif",
    tenant: "Pierre Durand",
    building: "Tour Horizon",
    apartment: "Apt 1205",
    status: "in_progress",
    category: "Chauffage",
    priority: "high",
    createdAt: "2024-01-15",
    provider: "Thermo Services",
  },
  {
    id: "DEM-2024-0145",
    title: "Interphone ne fonctionne pas",
    tenant: "Sophie Bernard",
    building: "Résidence du Parc",
    apartment: "Apt 102",
    status: "pending",
    category: "Électricité",
    priority: "medium",
    createdAt: "2024-01-14",
    provider: null,
  },
  {
    id: "DEM-2024-0144",
    title: "Problème serrure porte d'entrée",
    tenant: "Lucas Petit",
    building: "Résidence Les Lilas",
    apartment: "Apt 506",
    status: "resolved",
    category: "Serrurerie",
    priority: "low",
    createdAt: "2024-01-14",
    provider: "Sécuri-Clé",
  },
  {
    id: "DEM-2024-0143",
    title: "Infiltration plafond salle de bain",
    tenant: "Emma Leroy",
    building: "Résidence Soleil",
    apartment: "Apt 201",
    status: "in_progress",
    category: "Plomberie",
    priority: "high",
    createdAt: "2024-01-13",
    provider: "Plomberie Express",
  },
];

const statusConfig = {
  urgent: { label: "Urgent", className: "bg-destructive text-destructive-foreground" },
  in_progress: { label: "En cours", className: "bg-info text-info-foreground" },
  pending: { label: "En attente", className: "bg-warning text-warning-foreground" },
  resolved: { label: "Résolu", className: "bg-success text-success-foreground" },
};

const priorityConfig = {
  high: { label: "Haute", className: "border-destructive text-destructive" },
  medium: { label: "Moyenne", className: "border-warning text-warning" },
  low: { label: "Basse", className: "border-muted-foreground text-muted-foreground" },
};

const RequestsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Demandes
          </h1>
          <p className="text-muted-foreground">
            Gérez toutes les demandes de vos locataires
          </p>
        </div>
        <Button variant="hero" className="gap-2" asChild>
          <Link to="/dashboard/requests/new">
            <Plus className="h-4 w-4" />
            Nouvelle demande
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par ID, titre, locataire..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="in_progress">En cours</SelectItem>
                <SelectItem value="resolved">Résolu</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Plus de filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des demandes</CardTitle>
          <CardDescription>
            {filteredRequests.length} demande(s) trouvée(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Référence
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Demande
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Locataire
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Statut
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Priorité
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Prestataire
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-muted-foreground">
                        {request.id}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-foreground">
                          {request.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {request.category}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-foreground">
                            {request.tenant}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {request.building} • {request.apartment}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        className={
                          statusConfig[request.status as keyof typeof statusConfig]
                            .className
                        }
                      >
                        {
                          statusConfig[request.status as keyof typeof statusConfig]
                            .label
                        }
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant="outline"
                        className={
                          priorityConfig[request.priority as keyof typeof priorityConfig]
                            .className
                        }
                      >
                        {
                          priorityConfig[request.priority as keyof typeof priorityConfig]
                            .label
                        }
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      {request.provider ? (
                        <span className="text-foreground">{request.provider}</span>
                      ) : (
                        <span className="text-muted-foreground italic">
                          Non assigné
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {request.createdAt}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestsPage;
