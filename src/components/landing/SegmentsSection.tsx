import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Store, 
  Scissors, 
  Utensils, 
  Briefcase,
  Package,
  ShoppingCart,
  Calendar,
  Users,
  Clock,
  ClipboardList,
  DollarSign,
  Wallet
} from 'lucide-react';

const segments = [
  {
    id: 'varejo',
    icon: Store,
    title: 'Varejo',
    description: 'Lojas, e-commerces, distribuidoras',
    color: 'from-blue-500 to-cyan-500',
    modules: [
      { icon: Package, label: 'Estoque' },
      { icon: ShoppingCart, label: 'Vendas' },
      { icon: Wallet, label: 'Caixa' },
    ],
  },
  {
    id: 'servicos',
    icon: Scissors,
    title: 'Serviços',
    description: 'Barbearias, salões, clínicas',
    color: 'from-purple-500 to-pink-500',
    modules: [
      { icon: Calendar, label: 'Agenda' },
      { icon: Clock, label: 'Atendimento' },
      { icon: DollarSign, label: 'Recebimentos' },
    ],
  },
  {
    id: 'alimentacao',
    icon: Utensils,
    title: 'Alimentação',
    description: 'Restaurantes, pizzarias, delivery',
    color: 'from-orange-500 to-red-500',
    modules: [
      { icon: ClipboardList, label: 'Pedidos' },
      { icon: Package, label: 'Produção' },
      { icon: Wallet, label: 'Despesas fixas' },
    ],
  },
  {
    id: 'profissional',
    icon: Briefcase,
    title: 'Profissionais',
    description: 'Advogados, contadores, consultores',
    color: 'from-emerald-500 to-teal-500',
    modules: [
      { icon: Users, label: 'Clientes' },
      { icon: Calendar, label: 'Agenda' },
      { icon: DollarSign, label: 'Controle mensal' },
    ],
  },
];

export function SegmentsSection() {
  const [selectedSegment, setSelectedSegment] = useState('varejo');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const activeSegment = segments.find(s => s.id === selectedSegment) || segments[0];

  return (
    <section id="segments" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            Universal
          </span>
          <h2 className="heading-lg mb-6">
            Cada negócio é único.{' '}
            <span className="gradient-text">O sistema também.</span>
          </h2>
          <p className="body-lg">
            Veja como o Prodexy se adapta a diferentes segmentos, 
            mantendo o Base Financeiro como base universal.
          </p>
        </motion.div>

        {/* Segment cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {segments.map((segment) => {
            const Icon = segment.icon;
            const isActive = selectedSegment === segment.id;
            return (
              <button
                key={segment.id}
                onClick={() => setSelectedSegment(segment.id)}
                className={`spotlight-card glass-card-hover p-6 rounded-2xl text-left transition-all duration-300 ${
                  isActive ? 'border-primary/30 ring-2 ring-primary/20' : ''
                }`}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${segment.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{segment.title}</h3>
                <p className="text-sm text-muted-foreground">{segment.description}</p>
              </button>
            );
          })}
        </motion.div>

        {/* Detail view */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSegment}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="glass-card p-8 rounded-3xl"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeSegment.color} flex items-center justify-center`}>
                    <activeSegment.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{activeSegment.title}</h3>
                    <p className="text-muted-foreground">{activeSegment.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Funcionalidades recomendadas
                  </p>
                  <div className="space-y-3">
                    {activeSegment.modules.map((module, index) => {
                      const Icon = module.icon;
                      return (
                        <motion.div
                          key={module.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-muted/30"
                        >
                          <Icon className="w-5 h-5 text-primary" />
                          <span className="font-medium">{module.label}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mockup preview */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Prodexy para {activeSegment.title}</span>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
                
                {/* Core */}
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Wallet className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Base Financeiro</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary ml-auto">Base</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-background/50 text-center">
                      <p className="text-xs text-muted-foreground">Entradas</p>
                      <p className="text-sm font-semibold text-green-400">R$ 18.5k</p>
                    </div>
                    <div className="p-2 rounded-lg bg-background/50 text-center">
                      <p className="text-xs text-muted-foreground">Saídas</p>
                      <p className="text-sm font-semibold text-red-400">R$ 7.2k</p>
                    </div>
                  </div>
                </div>

                {/* Segment modules */}
                <div className="grid grid-cols-3 gap-2">
                  {activeSegment.modules.map((module) => {
                    const Icon = module.icon;
                    return (
                      <div key={module.label} className="p-3 rounded-xl bg-muted/30 text-center">
                        <Icon className="w-5 h-5 mx-auto mb-1 text-secondary" />
                        <p className="text-xs font-medium">{module.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
