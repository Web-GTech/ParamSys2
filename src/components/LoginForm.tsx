import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Wrench, Cog } from "lucide-react";
import { toast } from "sonner";

interface LoginFormProps {
  onLogin: (user: { name: string; role: string; sector: string }) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Usuários simulados para demonstração
  const mockUsers = {
    "admin@paramsys.com": { name: "Carlos Silva", role: "Administrador", sector: "Geral" },
    "tecnico@paramsys.com": { name: "João Santos", role: "Técnico", sector: "Paletizado" },
    "operador@paramsys.com": { name: "Maria Oliveira", role: "Visualizador", sector: "Despaletizadora" }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular delay de autenticação
    setTimeout(() => {
      const user = mockUsers[email as keyof typeof mockUsers];
      
      if (user && password === "123456") {
        toast.success(`Login realizado com sucesso! Bem-vindo, ${user.name}!`);
        onLogin(user);
      } else {
        toast.error("Email ou senha incorretos. Tente: admin@paramsys.com / 123456");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-gradient-primary p-3 rounded-xl">
              <Wrench className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="bg-gradient-primary p-3 rounded-xl">
              <Cog className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ParamSys
            </h1>
            <p className="text-muted-foreground text-sm">
              Sistema de Gestão Industrial
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="bg-gradient-card border-border shadow-industrial">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Acesso ao Sistema</CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais para acessar o ParamSys
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-secondary border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-secondary border-border pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">🔑 Credenciais de Demonstração:</p>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p><strong>Admin:</strong> admin@paramsys.com / 123456</p>
                <p><strong>Técnico:</strong> tecnico@paramsys.com / 123456</p>
                <p><strong>Operador:</strong> operador@paramsys.com / 123456</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};