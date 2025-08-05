import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogOut, Settings, FileText, Map, Search, Plus, Wrench, Cog, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EquipmentModal } from "./EquipmentModal";
import { TutorialsPage } from "./TutorialsPage";
import { LubricationMapPage } from "./LubricationMapPage";

interface User {
  name: string;
  role: string;
  sector: string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  // Dados simulados dos equipamentos
  const equipments = {
    Paletizado: [
      { 
        id: 1, 
        name: "Envolvedora", 
        status: "online", 
        lastUpdate: "2024-08-05 14:30",
        parameters: { velocidade: "2.5 GHz", temperatura: "45°C", pressao: "1.2 bar" },
        sector: "Paletizado"
      },
      { 
        id: 2, 
        name: "Paletizadora Robô", 
        status: "maintenance", 
        lastUpdate: "2024-08-05 12:15",
        parameters: { velocidade: "1.8 GHz", forca: "500 N", ciclos: "120/min" },
        sector: "Paletizado"
      },
      { 
        id: 3, 
        name: "Cintadora 1", 
        status: "online", 
        lastUpdate: "2024-08-05 15:45",
        parameters: { velocidade: "3.2 GHz", tensao: "80 N", largura: "15mm" },
        sector: "Paletizado"
      },
      { 
        id: 4, 
        name: "Cintadora 2", 
        status: "offline", 
        lastUpdate: "2024-08-05 10:20",
        parameters: { velocidade: "0 GHz", tensao: "0 N", largura: "15mm" },
        sector: "Paletizado"
      }
    ],
    Despaletizadora: [
      { 
        id: 5, 
        name: "Centrador de Camadas", 
        status: "online", 
        lastUpdate: "2024-08-05 16:00",
        parameters: { velocidade: "2.1 GHz", precisao: "±2mm", ciclos: "85/min" },
        sector: "Despaletizadora"
      },
      { 
        id: 6, 
        name: "Carrinho do Chapatex", 
        status: "online", 
        lastUpdate: "2024-08-05 15:30",
        parameters: { velocidade: "1.5 GHz", carga: "200kg", autonomia: "4h" },
        sector: "Despaletizadora"
      },
      { 
        id: 7, 
        name: "Retirador de Chapatex", 
        status: "maintenance", 
        lastUpdate: "2024-08-05 13:45",
        parameters: { velocidade: "0.8 GHz", succao: "60%", ciclos: "45/min" },
        sector: "Despaletizadora"
      },
      { 
        id: 8, 
        name: "Retirador de Requadro", 
        status: "online", 
        lastUpdate: "2024-08-05 16:15",
        parameters: { velocidade: "1.2 GHz", forca: "300 N", precisao: "±1mm" },
        sector: "Despaletizadora"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-success text-success-foreground";
      case "offline": return "bg-destructive text-destructive-foreground";
      case "maintenance": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online": return <Cog className="h-4 w-4" />;
      case "offline": return <AlertTriangle className="h-4 w-4" />;
      case "maintenance": return <Wrench className="h-4 w-4" />;
      default: return <Cog className="h-4 w-4" />;
    }
  };

  const filteredEquipments = Object.entries(equipments).reduce((acc, [sector, items]) => {
    const filtered = items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sector.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[sector] = filtered;
    }
    return acc;
  }, {} as typeof equipments);

  const openEquipmentModal = (equipment: any) => {
    setSelectedEquipment(equipment);
    setShowModal(true);
  };

  if (currentPage === "tutorials") {
    return <TutorialsPage user={user} onBack={() => setCurrentPage("dashboard")} onLogout={onLogout} />;
  }

  if (currentPage === "lubrication") {
    return <LubricationMapPage user={user} onBack={() => setCurrentPage("dashboard")} onLogout={onLogout} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-primary p-2 rounded-lg">
                  <Wrench className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold">ParamSys</h1>
              </div>
              <Badge variant="outline" className="border-primary text-primary">
                {user.role}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground hidden md:block">
                Bem-vindo, <strong>{user.name}</strong>!
              </span>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Bem-vindo, {user.name}!
          </h2>
          <p className="text-xl text-muted-foreground">
            Do que precisa?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-card border-border shadow-industrial hover:shadow-equipment transition-shadow cursor-pointer"
                onClick={() => setCurrentPage("dashboard")}>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Cog className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg">Equipamentos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Gerenciar parâmetros e configurações dos equipamentos
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-industrial hover:shadow-equipment transition-shadow cursor-pointer"
                onClick={() => setCurrentPage("tutorials")}>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-info" />
                <CardTitle className="text-lg">Tutoriais Técnicos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Guias passo a passo para resolução de falhas
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-industrial hover:shadow-equipment transition-shadow cursor-pointer"
                onClick={() => setCurrentPage("lubrication")}>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Map className="h-6 w-6 text-warning" />
                <CardTitle className="text-lg">Mapa de Lubrificação</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Visualizar e gerenciar pontos de lubrificação
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Equipment Management */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Equipamentos por Setor</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar equipamentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              {user.role !== "Visualizador" && (
                <Button className="bg-gradient-primary hover:opacity-90">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Equipamento
                </Button>
              )}
            </div>
          </div>

          {/* Equipment Sectors */}
          {Object.entries(filteredEquipments).map(([sector, items]) => (
            <div key={sector} className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${sector === 'Paletizado' ? 'bg-paletizado' : 'bg-despaletizadora'}`} />
                <h4 className="text-xl font-semibold">{sector}</h4>
                <Badge variant="secondary">{items.length} equipamentos</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {items.map((equipment) => (
                  <Card key={equipment.id} 
                        className="bg-gradient-card border-border shadow-industrial hover:shadow-equipment transition-all cursor-pointer hover:scale-105"
                        onClick={() => openEquipmentModal(equipment)}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{equipment.name}</CardTitle>
                        <Badge className={getStatusColor(equipment.status)}>
                          {getStatusIcon(equipment.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Velocidade:</span>
                          <span>{equipment.parameters.velocidade}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Última atualização: {equipment.lastUpdate}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Equipment Modal */}
      {showModal && selectedEquipment && (
        <EquipmentModal 
          equipment={selectedEquipment}
          user={user}
          onClose={() => {
            setShowModal(false);
            setSelectedEquipment(null);
          }}
        />
      )}
    </div>
  );
};