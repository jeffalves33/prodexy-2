export function Footer() {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl font-display">P</span>
            </div>
            <span className="text-xl font-bold font-display tracking-tight">
              Prodexy
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center md:text-right">
            © {new Date().getFullYear()} Prodexy. Todos os direitos reservados.
            <br />
            <span className="text-xs">Sistema feito sob medida para seu negócio.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
