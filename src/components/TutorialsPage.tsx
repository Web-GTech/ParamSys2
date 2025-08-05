import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Search, FileText, Play, Image, Video, Clock, User } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface TutorialsPageProps {
  user: {
    name: string;
    role: string;
    sector: string;
  };
  onBack: () => void;
  onLogout: () => void;
}

export const TutorialsPage = ({ user, onBack, onLogout }: TutorialsPageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTutorial, setSelectedTutorial] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  // Dados simulados de tutoriais
  const tutorials = [
    {
      id: 1,
      title: "Falha de Comunicação - Envolvedora",
      sector: "Paletizado",
      description: "Procedimento para resolver problemas de comunicação com o CLP da envolvedora",
      difficulty: "Básico",
      duration: "15 min",
      author: "João Santos",
      createdAt: "2024-07-20",
      steps: [
        {
          step: 1,
          title: "Verificar Conexões Físicas",
          description: "Verificar se todos os cabos de comunicação estão conectados corretamente",
          image: null,
          video: null
        },
        {
          step: 2,
          title: "Reiniciar CLP",
          description: "Realizar reset do CLP seguindo o procedimento de segurança",
          image: null,
          video: null
        },
        {
          step: 3,
          title: "Verificar Configurações de Rede",
          description: "Conferir IP e parâmetros de comunicação no software de supervisão",
          image: null,
          video: null
        },
        {
          step: 4,
          title: "Teste de Comunicação",
          description: "Executar teste de ping e verificar status da comunicação",
          image: null,
          video: null
        }
      ]
    },
    {
      id: 2,
      title: "Troca de Filtro - Sistema Pneumático",
      sector: "Paletizado",
      description: "Procedimento seguro para substituição do filtro do sistema pneumático",
      difficulty: "Intermediário",
      duration: "30 min",
      author: "Carlos Silva",
      createdAt: "2024-07-18",
      steps: [
        {
          step: 1,
          title: "Despressurizar Sistema",
          description: "Fechar válvula principal e drenar pressão do sistema",
          image: null,
          video: null
        },
        {
          step: 2,
          title: "Remover Filtro Antigo",
          description: "Desconectar tubulações e remover o filtro saturado",
          image: null,
          video: null
        },
        {
          step: 3,
          title: "Instalar Filtro Novo",
          description: "Posicionar novo filtro e reconectar tubulações",
          image: null,
          video: null
        },
        {
          step: 4,
          title: "Pressurizar e Testar",
          description: "Pressurizar sistema gradualmente e verificar vazamentos",
          image: null,
          video: null
        }
      ]
    },
    {
      id: 3,
      title: "Calibração de Sensores - Centrador",
      sector: "Despaletizadora",
      description: "Calibração dos sensores de posição do centrador de camadas",
      difficulty: "Avançado",
      duration: "45 min",
      author: "Maria Oliveira",
      createdAt: "2024-07-15",
      steps: [
        {
          step: 1,
          title: "Acessar Modo Calibração",
          description: "Entrar no menu de calibração do painel operacional",
          image: null,
          video: null
        },
        {
          step: 2,
          title: "Calibrar Sensor X",
          description: "Calibrar sensor do eixo X usando peça padrão",
          image: null,
          video: null
        },
        {
          step: 3,
          title: "Calibrar Sensor Y",
          description: "Calibrar sensor do eixo Y usando peça padrão",
          image: null,
          video: null
        },
        {
          step: 4,
          title: "Teste de Precisão",
          description: "Executar teste de precisão com diferentes tamanhos de carga",
          image: null,
          video: null
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Básico": return "bg-success text-success-foreground";
      case "Intermediário": return "bg-warning text-warning-foreground";
      case "Avançado": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredTutorials = tutorials.filter(tutorial => 
    tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutorial.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openTutorial = (tutorial: any) => {
    setSelectedTutorial(tutorial);
    setShowModal(true);
  };

  const canEdit = user.role === "Administrador" || user.role === "Técnico";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-info" />
              <h1 className="text-2xl font-bold">Tutoriais Técnicos</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar tutoriais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          {canEdit && (
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Novo Tutorial
            </Button>
          )}
        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial) => (
            <Card key={tutorial.id} 
                  className="bg-gradient-card border-border shadow-industrial hover:shadow-equipment transition-all cursor-pointer hover:scale-105"
                  onClick={() => openTutorial(tutorial)}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <CardTitle className="text-lg leading-tight">{tutorial.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {tutorial.sector}
                      </Badge>
                      <Badge className={getDifficultyColor(tutorial.difficulty) + " text-xs"}>
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Play className="h-5 w-5 text-info mt-1" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 line-clamp-3">
                  {tutorial.description}
                </CardDescription>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{tutorial.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{tutorial.author}</span>
                    </div>
                  </div>
                  <span>{tutorial.createdAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTutorials.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum tutorial encontrado</h3>
            <p className="text-muted-foreground">
              Tente ajustar os termos de busca ou criar um novo tutorial.
            </p>
          </div>
        )}
      </div>

      {/* Tutorial Modal */}
      {showModal && selectedTutorial && (
        <Dialog open={true} onOpenChange={() => setShowModal(false)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedTutorial.title}</DialogTitle>
              <DialogDescription className="flex items-center space-x-4">
                <Badge variant="outline">{selectedTutorial.sector}</Badge>
                <Badge className={getDifficultyColor(selectedTutorial.difficulty)}>
                  {selectedTutorial.difficulty}
                </Badge>
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{selectedTutorial.duration}</span>
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <p className="text-muted-foreground">{selectedTutorial.description}</p>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Passos do Procedimento</h3>
                {selectedTutorial.steps.map((step: any) => (
                  <div key={step.step} className="p-4 bg-secondary rounded-lg border border-border">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{step.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                        <div className="flex items-center space-x-4">
                          {step.image && (
                            <Button variant="outline" size="sm">
                              <Image className="h-4 w-4 mr-1" />
                              Ver Imagem
                            </Button>
                          )}
                          {step.video && (
                            <Button variant="outline" size="sm">
                              <Video className="h-4 w-4 mr-1" />
                              Assistir Vídeo
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};