import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Calendar, 
  Package, 
  ShoppingCart,
  Users,
  ClipboardList,
  Clock,
  DollarSign
} from 'lucide-react';

interface MockupDisplayProps {
  selectedBusiness: string;
}

const businessModules: Record<string, { icon: typeof Package; label: string; color: string }[]> = {
  varejo: [
    { icon: Package, label: 'Estoque', color: 'text-blue-400' },
    { icon: ShoppingCart, label: 'Vendas', color: 'text-green-400' },
    { icon: Users, label: 'Clientes', color: 'text-purple-400' },
  ],
  servicos: [
    { icon: Calendar, label: 'Agenda', color: 'text-blue-400' },
    { icon: Users, label: 'Clientes', color: 'text-purple-400' },
    { icon: Clock, label: 'Atendimentos', color: 'text-orange-400' },
  ],
  alimentacao: [
    { icon: ClipboardList, label: 'Pedidos', color: 'text-orange-400' },
    { icon: Package, label: 'Produção', color: 'text-blue-400' },
    { icon: ShoppingCart, label: 'Delivery', color: 'text-green-400' },
  ],
  profissional: [
    { icon: Calendar, label: 'Agenda', color: 'text-blue-400' },
    { icon: Users, label: 'Clientes', color: 'text-purple-400' },
    { icon: DollarSign, label: 'Honorários', color: 'text-green-400' },
  ],
  outros: [
    { icon: Package, label: 'Módulo A', color: 'text-blue-400' },
    { icon: Users, label: 'Módulo B', color: 'text-purple-400' },
    { icon: ClipboardList, label: 'Módulo C', color: 'text-orange-400' },
  ],
};

export function MockupDisplay({ selectedBusiness }: MockupDisplayProps) {
  const modules = businessModules[selectedBusiness] || businessModules.varejo;

  return (
    <div className="relative">
      {/* Glow effects */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl opacity-50" />
      
      {/* Main mockup container */}
      <div className="relative glass-card p-6 rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <div>
              <p className="text-sm font-medium">Prodexy</p>
              <p className="text-xs text-muted-foreground">Sistema Integrado</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
        </div>

        {/* Base Financeiro - Always visible */}
        <div className="mb-4">
          <p className="text-xs font-medium text-primary mb-3 flex items-center gap-2">
            <Wallet className="w-3.5 h-3.5" />
            BASE FINANCEIRO
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-card p-3 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-xs text-muted-foreground">Entradas</span>
              </div>
              <p className="text-lg font-semibold">R$ 24.580</p>
            </div>
            <div className="glass-card p-3 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-4 h-4 text-red-400" />
                <span className="text-xs text-muted-foreground">Saídas</span>
              </div>
              <p className="text-lg font-semibold">R$ 12.340</p>
            </div>
          </div>
        </div>

        {/* Dynamic Modules */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-3">
            FUNCIONALIDADES ATIVAS
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedBusiness}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-3 gap-2"
            >
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <motion.div
                    key={module.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-3 rounded-xl text-center"
                  >
                    <Icon className={`w-5 h-5 mx-auto mb-1 ${module.color}`} />
                    <p className="text-xs font-medium">{module.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom chart placeholder */}
        <div className="mt-4 glass-card p-3 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Fluxo do mês</span>
            <span className="text-xs text-green-400">+18.5%</span>
          </div>
          <div className="flex items-end gap-1 h-12">
            {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 70, 95].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex-1 bg-gradient-to-t from-primary/50 to-primary rounded-sm"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 top-1/4 glass-card px-3 py-2 rounded-lg"
      >
        <p className="text-xs font-medium text-green-400">+ R$ 1.250</p>
        <p className="text-[10px] text-muted-foreground">Venda #1234</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -left-4 bottom-1/3 glass-card px-3 py-2 rounded-lg"
      >
        <p className="text-xs font-medium text-primary">Novo cliente</p>
        <p className="text-[10px] text-muted-foreground">Cadastrado agora</p>
      </motion.div>
    </div>
  );
}
