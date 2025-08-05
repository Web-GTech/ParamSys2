import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Save, X, History, Paperclip, AlertTriangle, Cog } from "lucide-react";
import { toast } from "sonner";

interface EquipmentModalProps {
  equipment: {
    id: number;
    name: string;
    status: string;
    lastUpdate: string;
    parameters: Record<string, string>;
    sector: string;
  };
  user: {
    name: string;
    role: string;
    sector: string;
  };
  onClose: () => void;
}

export const EquipmentModal = ({ equipment, user, onClose }: EquipmentModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [parameters, setParameters] = useState(equipment.parameters);

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
      case "maintenance": return <AlertTriangle className="h-4 w-4" />;
      default: return <Cog className="h-4 w-4" />;
    }
  };

  const handleSave = () => {
    // Simular salvamento
    toast.success("Parâmetros atualizados com sucesso!");
    setIsEditing(false);
  };

  const canEdit = user.role === "Administrador" || user.role === "Técnico";

  // Dados simulados de histórico
  const history = [
    { date: "2024-08-05 14:30", user: "João Santos", change: "Velocidade alterada de 2.3 para 2.5 GHz" },
    { date: "2024-08-04 16:15", user: "Carlos Silva", change: "Temperatura máxima ajustada para 45°C" },
    { date: "2024-08-03 09:30", user: "Maria Oliveira", change: "Pressão calibrada para 1.2 bar" }
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DialogTitle className="text-2xl">{equipment.name}</DialogTitle>
              <Badge className={getStatusColor(equipment.status)}>
                {getStatusIcon(equipment.status)}
                <span className="ml-1 capitalize">{equipment.status}</span>
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Setor: {equipment.sector} | Última atualização: {equipment.lastUpdate}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="parameters" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="parameters">Parâmetros</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="attachments">Anexos</TabsTrigger>
          </TabsList>

          <TabsContent value="parameters" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Parâmetros Atuais</h3>
              {canEdit && (
                <div className="space-x-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                        <X className="h-4 w-4 mr-1" />
                        Cancelar
                      </Button>
                      <Button size="sm" onClick={handleSave} className="bg-gradient-primary">
                        <Save className="h-4 w-4 mr-1" />
                        Salvar
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(parameters).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                  {isEditing ? (
                    <Input
                      value={value}
                      onChange={(e) => setParameters(prev => ({ ...prev, [key]: e.target.value }))}
                      className="bg-secondary"
                    />
                  ) : (
                    <div className="p-3 bg-secondary rounded-md border border-border">
                      <span className="font-mono text-sm">{value}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {equipment.status === "maintenance" && (
              <div className="p-4 bg-warning/10 border border-warning rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <span className="font-medium text-warning">Equipamento em Manutenção</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Este equipamento está passando por manutenção preventiva. 
                  Evite alterações nos parâmetros até a conclusão dos trabalhos.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <h3 className="text-lg font-semibold">Histórico de Alterações</h3>
            <div className="space-y-3">
              {history.map((entry, index) => (
                <div key={index} className="p-4 bg-secondary rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{entry.user}</span>
                    <span className="text-xs text-muted-foreground">{entry.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{entry.change}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="attachments" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Anexos</h3>
              {canEdit && (
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4 mr-1" />
                  Adicionar Anexo
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Anexos simulados */}
              <div className="p-4 bg-secondary rounded-lg border border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Manual_Envolvedora_2024.pdf</span>
                </div>
                <p className="text-xs text-muted-foreground">Adicionado em 15/07/2024</p>
              </div>
              
              <div className="p-4 bg-secondary rounded-lg border border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Foto_Parametros_Original.jpg</span>
                </div>
                <p className="text-xs text-muted-foreground">Adicionado em 10/07/2024</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};