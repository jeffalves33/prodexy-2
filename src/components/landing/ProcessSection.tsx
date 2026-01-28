import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, Layers, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Diagnóstico Rápido',
    description: 'Entendemos seu fluxo, suas dores e necessidades. Em minutos, mapeamos o cenário.',
  },
  {
    icon: Layers,
    number: '02',
    title: 'Protótipo Navegável',
    description: 'Criamos um protótipo de UX para você validar antes de qualquer linha de código.',
  },
  {
    icon: Code2,
    number: '03',
    title: 'Construção Modular',
    description: 'Desenvolvemos com módulos independentes. Você acompanha cada entrega.',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Evolução Contínua',
    description: 'Novos módulos quando precisar. Sem refazer o que já funciona.',
  },
];

export function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            Processo
          </span>
          <h2 className="heading-lg mb-6">
            Como{' '}
            <span className="gradient-text">criamos</span> seu sistema.
          </h2>
          <p className="body-lg">
            Um processo direto, sem enrolação. Da conversa inicial ao sistema rodando.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="spotlight-card glass-card-hover p-6 rounded-2xl h-full"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                      e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                    }}
                  >
                    {/* Step number */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl font-bold text-muted/50 font-display">{step.number}</span>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>

                  {/* Arrow connector for mobile/tablet */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex lg:hidden absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 items-center justify-center text-primary/50">
                      ↓
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
