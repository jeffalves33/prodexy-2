import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onOpenDiagnosis: () => void;
}

const WHATSAPP_NUMBER = '5511999999999';
const WHATSAPP_MESSAGE = encodeURIComponent('Olá! Gostaria de falar com um especialista sobre a Prodexy.');

export function FinalCTA({ onOpenDiagnosis }: FinalCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="section-container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl opacity-50" />
          
          <div className="relative glass-card p-12 lg:p-16 rounded-3xl text-center">
            <h2 className="heading-lg mb-6 max-w-3xl mx-auto">
              Pronto para ter o sistema{' '}
              <span className="gradient-text">que seu negócio merece?</span>
            </h2>
            <p className="body-lg max-w-2xl mx-auto mb-10">
              Comece com um diagnóstico gratuito. Em 2 minutos você descobre 
              como a Prodexy pode transformar sua operação.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-lg px-8 py-4"
              >
                <MessageCircle className="w-5 h-5" />
                Falar com especialista
              </a>
              <button onClick={onOpenDiagnosis} className="btn-primary text-lg px-8 py-4 group">
                Solicitar diagnóstico
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
