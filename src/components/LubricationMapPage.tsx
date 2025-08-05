import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Map, MapPin, Clock, Droplets, Info, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LubricationMapPageProps {
  user: {
    name: string;
    role: string;
    sector: string;
  };
  onBack: () => void;
  onLogout: () => void;
}

export const LubricationMapPage = ({ user, onBack, onLogout }: LubricationMapPageProps) => {
  const [selectedSector, setSelectedSector] = useState("Paletizado");
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  // Dados simulados de mapas de lubrificação
  const lubricationMaps = {
    Paletizado: {
      hasMap: true,
      imagePath: "/api/placeholder/800/600",
      points: [
        {
          id: 1,
          x: 25,
          y: 30,
          name: "Mancal Principal Envolvedora",
          lubricant: "Graxa EP2",
          frequency: "Semanal",
          maintenance: "Manual",
          lastLubrication: "2024-08-03",
          nextDue: "2024-08-10",
          observations: "Verificar temperatura durante operação"
        },
        {
          id: 2,
          x: 60,
          y: 45,
          name: "Redutor Paletizadora",
          lubricant: "Óleo SAE 90",
          frequency: "Mensal",
          maintenance: "Automática",
          lastLubrication: "2024-07-15",
          nextDue: "2024-08-15",
          observations: "Nível deve estar entre MIN e MAX"
        },
        {
          id: 3,
          x: 40,
          y: 70,
          name: "Guias Lineares Cintadora",
          lubricant: "Graxa Branca",
          frequency: "Quinzenal",
          maintenance: "Manual",
          lastLubrication: "2024-07-28",
          nextDue: "2024-08-12",
          observations: "Limpar antes de aplicar graxa"
        }
      ]
    },
    Despaletizadora: {
      hasMap: false,
      imagePath: null,
      points: []
    }
  };

  const currentMap = lubricationMaps[selectedSector as keyof typeof lubricationMaps];

  const getFrequencyColor = (frequency: string) => {
    switch (frequency.toLowerCase()) {
      case "diário": return "bg-destructive text-destructive-foreground";
      case "semanal": return "bg-warning text-warning-foreground";
      case "quinzenal": return "bg-info text-info-foreground";
      case "mensal": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const isOverdue = (nextDue: string) => {
    return new Date(nextDue) < new Date();
  };

  const openPointDetails = (point: any) => {
    setSelectedPoint(point);
    setShowModal(true);
  };

  const markAsLubricated = (pointId: number) => {
    // Simular marcação como lubrificado
    console.log(`Ponto ${pointId} marcado como lubrificado hoje`);
    setShowModal(false);
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
              <Map className="h-6 w-6 text-warning" />
              <h1 className="text-2xl font-bold">Mapa de Lubrificação</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Sector Selection */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Selecionar setor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Paletizado">Paletizado</SelectItem>
                <SelectItem value="Despaletizadora">Despaletizadora</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline">
              {currentMap.points.length} pontos de lubrificação
            </Badge>
          </div>
          {canEdit && currentMap.hasMap && (
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Editar Mapa
            </Button>
          )}
        </div>

        {currentMap.hasMap ? (
          <>
            {/* Lubrication Map */}
            <Card className="bg-gradient-card border-border shadow-industrial mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Map className="h-5 w-5" />
                  <span>Mapa de Lubrificação - {selectedSector}</span>
                </CardTitle>
                <CardDescription>
                  Clique nos pontos para ver detalhes da lubrificação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative bg-muted rounded-lg overflow-hidden">
                  {/* Imagem simulada do layout */}
                  <div className="w-full h-96 bg-gradient-to-br from-muted to-secondary flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Map className="h-16 w-16 mx-auto mb-4" />
                      <p>Layout do Setor {selectedSector}</p>
                      <p className="text-sm">(Imagem de exemplo)</p>
                    </div>
                  </div>
                  
                  {/* Pontos de lubrificação */}
                  {currentMap.points.map((point) => (
                    <div
                      key={point.id}
                      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${point.x}%`, top: `${point.y}%` }}
                      onClick={() => openPointDetails(point)}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
                        isOverdue(point.nextDue) ? 'bg-destructive' : 'bg-primary'
                      }`}>
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute top-7 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded px-2 py-1 text-xs whitespace-nowrap shadow-lg opacity-0 hover:opacity-100 transition-opacity">
                        {point.name}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Lubrication Schedule */}
            <Card className="bg-gradient-card border-border shadow-industrial">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Cronograma de Lubrificação</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentMap.points.map((point) => (
                    <div key={point.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg border border-border">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${isOverdue(point.nextDue) ? 'bg-destructive' : 'bg-success'}`} />
                        <div>
                          <p className="font-medium">{point.name}</p>
                          <p className="text-sm text-muted-foreground">{point.lubricant}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getFrequencyColor(point.frequency)}>
                          {point.frequency}
                        </Badge>
                        <div className="text-right text-sm">
                          <p className={isOverdue(point.nextDue) ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                            Próxima: {point.nextDue}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Última: {point.lastLubrication}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* No Map Available */
          <div className="text-center py-16">
            <Map className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Nenhum mapa encontrado</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              O setor <strong>{selectedSector}</strong> ainda não possui um mapa de lubrificação configurado. 
              Clique abaixo para criar um novo mapa.
            </p>
            {canEdit && (
              <Button className="bg-gradient-primary hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Criar novo mapa de lubrificação
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Point Details Modal */}
      {showModal && selectedPoint && (
        <Dialog open={true} onOpenChange={() => setShowModal(false)}>
          <DialogContent className="max-w-2xl bg-card border-border">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{selectedPoint.name}</span>
              </DialogTitle>
              <DialogDescription>
                Informações detalhadas do ponto de lubrificação
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de Lubrificante</label>
                  <div className="p-3 bg-secondary rounded-md border border-border flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-primary" />
                    <span>{selectedPoint.lubricant}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Periodicidade</label>
                  <div className="p-3 bg-secondary rounded-md border border-border">
                    <Badge className={getFrequencyColor(selectedPoint.frequency)}>
                      {selectedPoint.frequency}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de Manutenção</label>
                  <div className="p-3 bg-secondary rounded-md border border-border">
                    {selectedPoint.maintenance}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Última Lubrificação</label>
                  <div className="p-3 bg-secondary rounded-md border border-border">
                    {selectedPoint.lastLubrification}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Observações Técnicas</label>
                <div className="p-3 bg-secondary rounded-md border border-border">
                  <div className="flex items-start space-x-2">
                    <Info className="h-4 w-4 text-info mt-0.5" />
                    <span className="text-sm">{selectedPoint.observations}</span>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${
                isOverdue(selectedPoint.nextDue) 
                  ? 'bg-destructive/10 border-destructive' 
                  : 'bg-success/10 border-success'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className={`h-4 w-4 ${isOverdue(selectedPoint.nextDue) ? 'text-destructive' : 'text-success'}`} />
                  <span className={`font-medium ${isOverdue(selectedPoint.nextDue) ? 'text-destructive' : 'text-success'}`}>
                    {isOverdue(selectedPoint.nextDue) ? 'Lubrificação Atrasada' : 'Em Dia'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Próxima lubrificação prevista para: <strong>{selectedPoint.nextDue}</strong>
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Fechar
                </Button>
                {canEdit && (
                  <Button 
                    className="bg-gradient-primary hover:opacity-90"
                    onClick={() => markAsLubricated(selectedPoint.id)}
                  >
                    <Droplets className="h-4 w-4 mr-2" />
                    Marcar como lubrificado hoje
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};