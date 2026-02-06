import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Palette, Users, Settings, Check, X } from 'lucide-react';

const themes = [
  { id: 'teal', name: 'Teal', primary: '#14b8a6', bg: '#0d1117' },
  { id: 'purple', name: 'Violeta', primary: '#a855f7', bg: '#0f0a1f' },
  { id: 'blue', name: 'Azul', primary: '#3b82f6', bg: '#0a1628' },
];

const permissions = [
  { feature: 'Ver dashboard', owner: true, manager: true, employee: true },
  { feature: 'Editar financeiro', owner: true, manager: true, employee: false },
  { feature: 'Ver relatórios', owner: true, manager: true, employee: false },
  { feature: 'Gerenciar usuários', owner: true, manager: false, employee: false },
  { feature: 'Configurar funcionalidades', owner: true, manager: false, employee: false },
];

export function CustomizationSection() {
  const [selectedTheme, setSelectedTheme] = useState('teal');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-sm font-medium mb-6">
            Personalização
          </span>
          <h2 className="heading-lg mb-6">
            Sua marca.{' '}
            <span className="gradient-text">Suas regras.</span>
          </h2>
          <p className="body-lg">
            Cores, logo, permissões por usuário. O sistema com a identidade do seu negócio.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Theme customization */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Tema por marca</h3>
                <p className="text-sm text-muted-foreground">Cores e identidade visual</p>
              </div>
            </div>

            {/* Theme selector */}
            <div className="flex gap-3 mb-6">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedTheme === theme.id 
                      ? 'border-primary' 
                      : 'border-border/50 hover:border-primary/30'
                  }`}
                  style={{ backgroundColor: theme.bg }}
                >
                  <div 
                    className="w-full h-3 rounded-full mb-2"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <p className="text-xs font-medium" style={{ color: theme.primary }}>
                    {theme.name}
                  </p>
                </button>
              ))}
            </div>

            {/* Theme preview */}
            <div 
              className="glass-card p-6 rounded-2xl transition-all duration-500"
              style={{ 
                backgroundColor: themes.find(t => t.id === selectedTheme)?.bg,
                borderColor: `${themes.find(t => t.id === selectedTheme)?.primary}30`
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: themes.find(t => t.id === selectedTheme)?.primary }}
                >
                  <span className="text-white text-sm font-bold">P</span>
                </div>
                <span className="font-medium">Sua Empresa</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${themes.find(t => t.id === selectedTheme)?.primary}15` }}
                >
                  <p className="text-xs text-muted-foreground mb-1">Entradas</p>
                  <p 
                    className="font-semibold"
                    style={{ color: themes.find(t => t.id === selectedTheme)?.primary }}
                  >
                    R$ 24.580
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">Saídas</p>
                  <p className="font-semibold">R$ 12.340</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Permissions */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold">Perfis e permissões</h3>
                <p className="text-sm text-muted-foreground">Controle de acesso granular</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="grid grid-cols-4 gap-4 p-4 bg-muted/30 border-b border-border/50">
                <div className="text-sm font-medium text-muted-foreground">Funcionalidade</div>
                <div className="text-sm font-medium text-center">Dono</div>
                <div className="text-sm font-medium text-center">Gerente</div>
                <div className="text-sm font-medium text-center">Funcionário</div>
              </div>
              <div className="p-4 space-y-3">
                {permissions.map((perm, index) => (
                  <motion.div
                    key={perm.feature}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="grid grid-cols-4 gap-4 py-2"
                  >
                    <div className="text-sm">{perm.feature}</div>
                    <div className="flex justify-center">
                      {perm.owner ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <X className="w-5 h-5 text-red-400/50" />
                      )}
                    </div>
                    <div className="flex justify-center">
                      {perm.manager ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <X className="w-5 h-5 text-red-400/50" />
                      )}
                    </div>
                    <div className="flex justify-center">
                      {perm.employee ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <X className="w-5 h-5 text-red-400/50" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
