export const ColorShowcase = () => {
  return (
    <div className="fixed bottom-4 right-4 w-64 rounded-lg border bg-card p-4 shadow-2xl z-[200]">
      <h3 className="mb-3 font-bold">Cores do Sistema</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-[#0EA5E9]" />
          <span className="text-xs">Primary: #0EA5E9</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-[#0284C7]" />
          <span className="text-xs">Accent: #0284C7</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-primary" />
          <span className="text-xs">Primary (CSS Var)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-accent" />
          <span className="text-xs">Accent (CSS Var)</span>
        </div>
      </div>
    </div>
  );
};
