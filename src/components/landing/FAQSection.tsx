import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Serve para o meu tipo de negócio?",
    answer: "Sim! O Prodexy foi projetado para ser universal. A base Financeiro atende qualquer negócio que tenha entradas e saídas. As funcionalidades plugáveis (estoque, agenda, vendas, etc.) são ativados conforme sua necessidade específica. Se você tem um negócio, temos uma solução."
  },
  {
    question: "Dá pra começar simples e crescer depois?",
    answer: "Exatamente essa é a proposta. Você começa com o Base Financeiro e as funcionalidades essenciais para sua operação atual. Conforme o negócio cresce ou novas necessidades surgem, ativamos novas funcionalidadess sem precisar refazer nada do que já funciona."
  },
  {
    question: "É instalável no celular?",
    answer: "Sim! O sistema é um PWA (Progressive Web App), ou seja, funciona no navegador mas pode ser instalado como um aplicativo no celular. Acesso rápido, notificações e funcionamento offline em funções críticas."
  },
  {
    question: "Como fazemos a personalização?",
    answer: "A personalização vai além de cores e logo. Definimos juntos: quais funcionalidades ativar, quais campos são relevantes para seu negócio, quais relatórios fazem sentido, e configuramos perfis de usuário com permissões específicas (dono, gerente, funcionário)."
  },
  {
    question: "Como vocês fazem o diagnóstico?",
    answer: "O diagnóstico é uma conversa rápida (15-20 min) onde entendemos seu fluxo atual, suas dores, e o que você gostaria de controlar melhor. A partir disso, mapeamos quais funcionalidades fazem sentido e propomos um caminho de implementação."
  },
  {
    question: "Quanto tempo leva para ter o sistema funcionando?",
    answer: "Depende da complexidade, mas nosso foco é velocidade com qualidade. Um sistema com Base Financeiro + 2-3 funcionalidades pode estar rodando em 2-4 semanas. Entregas são incrementais: você já usa enquanto evoluímos."
  },
];

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            Dúvidas
          </span>
          <h2 className="heading-lg mb-6">
            Perguntas{' '}
            <span className="gradient-text">frequentes</span>
          </h2>
          <p className="body-lg">
            Tire suas dúvidas sobre como a Prodexy pode ajudar seu negócio.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-2xl px-6 border-0 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
