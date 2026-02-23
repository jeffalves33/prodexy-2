import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Loader2 } from 'lucide-react';
import { z } from 'zod';

interface DiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const businessTypes = [
  'Varejo / Loja',
  'Serviços (barbearia, salão, clínica)',
  'Alimentação (restaurante, pizzaria, delivery)',
  'Profissional liberal',
  'E-commerce',
  'Outro',
];

const needs = [
  { id: 'financeiro', label: 'Controle financeiro' },
  { id: 'estoque', label: 'Estoque' },
  { id: 'agenda', label: 'Agenda / Atendimentos' },
  { id: 'vendas', label: 'Vendas / Pedidos' },
  { id: 'clientes', label: 'Gestão de clientes' },
  { id: 'relatorios', label: 'Relatórios' },
];

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  whatsapp: z.string().min(10, 'WhatsApp inválido').max(15),
  businessType: z.string().min(1, 'Selecione o tipo de negócio'),
  needs: z.array(z.string()).min(1, 'Selecione pelo menos uma necessidade'),
  message: z.string().max(500).optional(),
});

type FormData = z.infer<typeof formSchema>;

const WHATSAPP_NUMBER = '551127988655236';

export function DiagnosisModal({ isOpen, onClose }: DiagnosisModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    whatsapp: '',
    businessType: '',
    needs: [],
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleNeed = (needId: string) => {
    setFormData(prev => ({
      ...prev,
      needs: prev.needs.includes(needId)
        ? prev.needs.filter(n => n !== needId)
        : [...prev.needs, needId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      formSchema.parse(formData);
      setIsSubmitting(true);

      // Build WhatsApp message
      const selectedNeeds = needs
        .filter(n => formData.needs.includes(n.id))
        .map(n => n.label)
        .join(', ');

      const whatsappMessage = encodeURIComponent(
        `🔍 *Solicitação de Diagnóstico Prodexy*\n\n` +
        `*Nome:* ${formData.name}\n` +
        `*WhatsApp:* ${formData.whatsapp}\n` +
        `*Tipo de negócio:* ${formData.businessType}\n` +
        `*Necessidades:* ${selectedNeeds}\n` +
        (formData.message ? `*Mensagem:* ${formData.message}\n` : '') +
        `\n_Enviado pelo formulário de diagnóstico_`
      );

      // Simulate brief loading
      await new Promise(resolve => setTimeout(resolve, 500));

      // Open WhatsApp
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`, '_blank');

      // Reset and close
      setFormData({ name: '', whatsapp: '', businessType: '', needs: [], message: '' });
      setIsSubmitting(false);
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-[10%] md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-50"
          >
            <div className="glass-card rounded-3xl p-6 md:p-8 max-h-[80vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">Pedir orçamento</h3>
                  <p className="text-sm text-muted-foreground">2 minutos para transformar seu negócio</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Nome *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Seu nome"
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                  {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name}</p>}
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-sm font-medium mb-2">WhatsApp *</label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                    placeholder="(27) 99999-9999"
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                  {errors.whatsapp && <p className="text-sm text-red-400 mt-1">{errors.whatsapp}</p>}
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo de negócio *</label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Selecione...</option>
                    {businessTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.businessType && <p className="text-sm text-red-400 mt-1">{errors.businessType}</p>}
                </div>

                {/* Needs */}
                <div>
                  <label className="block text-sm font-medium mb-2">Principal necessidade *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {needs.map(need => (
                      <button
                        key={need.id}
                        type="button"
                        onClick={() => toggleNeed(need.id)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${
                          formData.needs.includes(need.id)
                            ? 'bg-primary/20 text-primary border border-primary/30'
                            : 'bg-muted/50 text-muted-foreground border border-border/50 hover:border-primary/30'
                        }`}
                      >
                        {need.label}
                      </button>
                    ))}
                  </div>
                  {errors.needs && <p className="text-sm text-red-400 mt-1">{errors.needs}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2">Mensagem (opcional)</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Conte brevemente sobre seu negócio..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      Enviar e falar no WhatsApp
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
