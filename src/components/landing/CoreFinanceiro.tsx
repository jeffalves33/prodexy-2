import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  RefreshCw, 
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'Entradas',
    description: 'Registro e categorização de todas as receitas do negócio',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
  },
  {
    icon: TrendingDown,
    title: 'Saídas',
    description: 'Controle de despesas, fornecedores e custos operacionais',
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
  },
  {
    icon: Wallet,
    title: 'Caixa do mês',
    description: 'Visão consolidada do fluxo financeiro mensal',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  {
    icon: RefreshCw,
    title: 'Recorrências',
    description: 'Gestão de mensalidades, assinaturas e despesas fixas',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
  },
  {
    icon: BarChart3,
    title: 'Relatórios',
    description: 'Análises por período, categoria e forma de pagamento',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
];

export function CoreFinanceiro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="core" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Wallet className="w-4 h-4" />
            Âncora Universal
          </span>
          <h2 className="heading-lg mb-6">
            Independente do nicho,{' '}
            <span className="gradient-text">tudo passa pelo financeiro.</span>
          </h2>
          <p className="body-lg">
            O Core Financeiro é a base de todo sistema Prodexy. 
            Controle absoluto das suas finanças, do jeito que seu negócio precisa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="spotlight-card glass-card-hover p-6 rounded-2xl group"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            );
          })}

          {/* Visual card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:col-span-2 lg:col-span-1 glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">Resumo do mês</span>
              <span className="text-xs text-primary">Jan 2025</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-green-400/10">
                <div className="flex items-center gap-3">
                  <ArrowUpRight className="w-5 h-5 text-green-400" />
                  <span className="font-medium">Entradas</span>
                </div>
                <span className="text-green-400 font-semibold">R$ 45.230</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-red-400/10">
                <div className="flex items-center gap-3">
                  <ArrowDownRight className="w-5 h-5 text-red-400" />
                  <span className="font-medium">Saídas</span>
                </div>
                <span className="text-red-400 font-semibold">R$ 18.450</span>
              </div>
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Saldo</span>
                  <span className="text-2xl font-bold text-primary">R$ 26.780</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
