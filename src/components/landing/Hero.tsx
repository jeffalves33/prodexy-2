import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, Store, Scissors, Utensils, Briefcase, MoreHorizontal } from 'lucide-react';
import { HeroBackground } from './HeroBackground';
import { MockupDisplay } from './MockupDisplay';

interface HeroProps {
  onOpenDiagnosis: () => void;
}

const businessTypes = [
  { id: 'varejo', label: 'Varejo', icon: Store },
  { id: 'servicos', label: 'Serviços', icon: Scissors },
  { id: 'alimentacao', label: 'Alimentação', icon: Utensils },
  { id: 'profissional', label: 'Profissional', icon: Briefcase },
  { id: 'outros', label: 'Outros', icon: MoreHorizontal },
];

const WHATSAPP_NUMBER = '5527988655236';
const WHATSAPP_MESSAGE = encodeURIComponent('Olá! Gostaria de falar com um especialista sobre a Prodexy.');

export function Hero({ onOpenDiagnosis }: HeroProps) {
  const [selectedBusiness, setSelectedBusiness] = useState('varejo');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0">
        <HeroBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
      </div>

      <div className="section-container relative z-10 py-4 lg:py-4">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-6 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Desenhamos uma solução para sua necessidade</span>
              </motion.div>

              <h1 className="heading-xl">
                Um sistema feito para o seu negócio.{' '}
                <span className="gradient-text">Do jeito que você trabalha.</span>
              </h1>

              <p className="body-lg max-w-xl">
                Controle real do financeiro + funcionalidades sob demanda. 
                Comece com o essencial e evolua sem refazer tudo.
              </p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <MessageCircle className="w-5 h-5" />
                Falar no WhatsApp
              </a>
              <button onClick={onOpenDiagnosis} className="btn-primary group">
                Pedir orçamento
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Business Type Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-sm font-medium text-muted-foreground">
                Escolha seu tipo de operação:
              </p>
              <div className="flex flex-wrap gap-2">
                {businessTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedBusiness(type.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                        selectedBusiness === type.id
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'bg-card/50 text-muted-foreground border border-border/50 hover:border-primary/30 hover:text-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <MockupDisplay selectedBusiness={selectedBusiness} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
