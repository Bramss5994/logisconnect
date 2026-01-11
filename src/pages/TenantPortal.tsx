import { useState } from "react";
import { Send, Bot, User, Paperclip, Image } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";

const messages = [
  {
    role: "assistant",
    content: "Bonjour ! Je suis l'assistant LogisConnect. Comment puis-je vous aider aujourd'hui ?",
  },
];

const TenantPortal = () => {
  const [chatMessages, setChatMessages] = useState(messages);
  const [inputMessage, setInputMessage] = useState("");
  const [step, setStep] = useState<"chat" | "form">("chat");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessages = [
      ...chatMessages,
      { role: "user", content: inputMessage },
      {
        role: "assistant",
        content:
          "Je comprends votre problème. Pouvez-vous me donner plus de détails ? S'agit-il d'une urgence (fuite d'eau, panne de chauffage, etc.) ?",
      },
    ];
    setChatMessages(newMessages);
    setInputMessage("");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                Espace Locataire
              </h1>
              <p className="text-muted-foreground">
                Signalez un problème ou suivez vos demandes en cours
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Chat with AI */}
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Assistant LogisConnect</CardTitle>
                      <CardDescription>
                        Décrivez votre problème, je vous guide
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col p-0">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 ${
                          msg.role === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-accent"
                          }`}
                        >
                          {msg.role === "user" ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Image className="h-4 w-4" />
                      </Button>
                      <Input
                        placeholder="Décrivez votre problème..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Request Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Déclarer un problème</CardTitle>
                  <CardDescription>
                    Remplissez ce formulaire pour créer une demande d'intervention
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Type de problème</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plumbing">Plomberie</SelectItem>
                        <SelectItem value="heating">Chauffage</SelectItem>
                        <SelectItem value="electricity">Électricité</SelectItem>
                        <SelectItem value="locksmith">Serrurerie</SelectItem>
                        <SelectItem value="pest">Nuisibles</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Description du problème</Label>
                    <Textarea
                      placeholder="Décrivez votre problème en détail..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Urgence</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Niveau d'urgence" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">
                          Urgent - Risque immédiat (fuite, panne chauffage...)
                        </SelectItem>
                        <SelectItem value="high">
                          Important - À traiter rapidement
                        </SelectItem>
                        <SelectItem value="medium">
                          Normal - Dans les prochains jours
                        </SelectItem>
                        <SelectItem value="low">
                          Non urgent - Quand possible
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Ajouter des photos/vidéos</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Image className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Glissez vos fichiers ici ou cliquez pour sélectionner
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, PNG, MP4 - Max 10MB
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Disponibilités pour intervention</Label>
                    <Input type="text" placeholder="Ex: Lundi-Vendredi 9h-18h" />
                  </div>

                  <Button variant="hero" size="lg" className="w-full">
                    Envoyer ma demande
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* My Requests */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Mes demandes en cours</CardTitle>
                <CardDescription>
                  Suivez l'avancement de vos demandes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Timeline */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-sm font-mono text-muted-foreground">
                          DEM-2024-0147
                        </span>
                        <h4 className="font-medium">Fuite d'eau cuisine</h4>
                      </div>
                      <span className="px-3 py-1 bg-info/10 text-info text-sm font-medium rounded-full">
                        En cours
                      </span>
                    </div>

                    {/* Timeline steps */}
                    <div className="relative pl-6 border-l-2 border-border space-y-4">
                      <div className="relative">
                        <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-success border-2 border-background" />
                        <div className="text-sm">
                          <div className="font-medium text-foreground">
                            Demande créée
                          </div>
                          <div className="text-muted-foreground">
                            15 janvier 2024 à 10:30
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-success border-2 border-background" />
                        <div className="text-sm">
                          <div className="font-medium text-foreground">
                            Demande qualifiée
                          </div>
                          <div className="text-muted-foreground">
                            15 janvier 2024 à 10:32
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-info border-2 border-background animate-pulse" />
                        <div className="text-sm">
                          <div className="font-medium text-foreground">
                            Prestataire assigné : Plomberie Express
                          </div>
                          <div className="text-muted-foreground">
                            15 janvier 2024 à 11:00
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-muted border-2 border-background" />
                        <div className="text-sm">
                          <div className="font-medium text-muted-foreground">
                            Intervention prévue
                          </div>
                          <div className="text-muted-foreground">En attente</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TenantPortal;
