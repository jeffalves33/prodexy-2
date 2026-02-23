export function Footer() {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl from-primary to-secondary flex items-center justify-center">
              <img
                src="/icon_black_transp.png"
                alt="Prodexy"
                className="w-6 h-6 object-contain"
              />
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
