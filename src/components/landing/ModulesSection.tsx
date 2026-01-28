import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  ShoppingCart, 
  Calendar, 
  Users, 
  ClipboardList, 
  Bell, 
  BarChart3,
  Briefcase,
  Check,
  Wallet
} from 'lucide-react';

const modules = [
  { id: 'estoque', icon: Package, label: 'Estoque', description: 'Controle de produtos, lotes e movimentações' },
  { id: 'vendas', icon: ShoppingCart, label: 'Vendas/Pedidos', description: 'PDV, orçamentos e acompanhamento de vendas' },
  { id: 'agenda', icon: Calendar, label: 'Agenda', description: 'Agendamentos, horários e disponibilidade' },
  { id: 'servicos', icon: Briefcase, label: 'Serviços/Comissões', description: 'Gestão de serviços prestados e comissões' },
  { id: 'clientes', icon: Users, label: 'Clientes/CRM', description: 'Cadastro, histórico e relacionamento' },
  { id: 'projetos', icon: ClipboardList, label: 'Projetos/Tarefas', description: 'Gestão de projetos e acompanhamento' },
  { id: 'notificacoes', icon: Bell, label: 'Notificações/Alertas', description: 'Lembretes, vencimentos e avisos' },
  { id: 'relatorios', icon: BarChart3, label: 'Relatórios Avançados', description: 'Dashboards e análises personalizadas' },
];

export function ModulesSection() {
  const [activeModules, setActiveModules] = useState<string[]>(['estoque', 'vendas', 'clientes']);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const toggleModule = (id: string) => {
    setActiveModules(prev => 
      prev.includes(id) 
        ? prev.filter(m => m !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="modules" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-sm font-medium mb-6">
            Modular
          </span>
          <h2 className="heading-lg mb-6">
            Monte o sistema{' '}
            <span className="gradient-text">do seu jeito.</span>
          </h2>
          <p className="body-lg">
            Ative apenas os módulos que fazem sentido para o seu negócio. 
            Sem pagar pelo que não usa. Sem complexidade desnecessária.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Module toggles */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            {/* Core fixo */}
            <div className="glass-card p-4 rounded-2xl border-primary/30 bg-primary/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">Core Financeiro</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary">Sempre ativo</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Base do sistema: entradas, saídas, caixa</p>
                </div>
                <Check className="w-5 h-5 text-primary" />
              </div>
            </div>

            {/* Toggleable modules */}
            {modules.map((module, index) => {
              const Icon = module.icon;
              const isActive = activeModules.includes(module.id);
              return (
                <motion.button
                  key={module.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onClick={() => toggleModule(module.id)}
                  className={`w-full spotlight-card glass-card-hover p-4 rounded-2xl text-left transition-all duration-300 ${
                    isActive ? 'border-primary/30 bg-primary/5' : ''
                  }`}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? 'bg-primary/20' : 'bg-muted'
                    }`}>
                      <Icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{module.label}</h4>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      isActive 
                        ? 'bg-primary border-primary' 
                        : 'border-border'
                    }`}>
                      {isActive && <Check className="w-4 h-4 text-primary-foreground" />}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Preview mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl opacity-50" />
              
              <div className="relative glass-card p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm font-medium">Seu Sistema</p>
                    <p className="text-xs text-muted-foreground">{activeModules.length + 1} módulos ativos</p>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                    Preview
                  </div>
                </div>

                {/* Core always visible */}
                <div className="glass-card p-4 rounded-xl mb-4 border-primary/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Wallet className="w-5 h-5 text-primary" />
                    <span className="font-medium">Core Financeiro</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-green-400/10 text-center">
                      <p className="text-xs text-muted-foreground">Entradas</p>
                      <p className="text-sm font-semibold text-green-400">R$ 24.5k</p>
                    </div>
                    <div className="p-2 rounded-lg bg-red-400/10 text-center">
                      <p className="text-xs text-muted-foreground">Saídas</p>
                      <p className="text-sm font-semibold text-red-400">R$ 12.3k</p>
                    </div>
                  </div>
                </div>

                {/* Active modules */}
                <div className="space-y-2">
                  <AnimatePresence mode="popLayout">
                    {activeModules.map((moduleId) => {
                      const module = modules.find(m => m.id === moduleId);
                      if (!module) return null;
                      const Icon = module.icon;
                      return (
                        <motion.div
                          key={moduleId}
                          initial={{ opacity: 0, scale: 0.8, height: 0 }}
                          animate={{ opacity: 1, scale: 1, height: 'auto' }}
                          exit={{ opacity: 0, scale: 0.8, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="glass-card p-3 rounded-xl flex items-center gap-3"
                        >
                          <Icon className="w-5 h-5 text-secondary" />
                          <span className="text-sm font-medium">{module.label}</span>
                          <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {activeModules.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">Selecione módulos para visualizar</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
