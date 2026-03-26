export const EpuiseOverlay = () => (
  <div className="absolute inset-0 bg-black/60 flex items-center justify-center pointer-events-none z-10 rounded-inherit">
    <span
      style={{
        fontSize: "0.75rem",
        fontWeight: 900,
        letterSpacing: "0.3em",
        color: "rgba(255,255,255,0.90)",
        border: "2px solid rgba(255,255,255,0.5)",
        padding: "4px 10px",
        borderRadius: "4px",
        transform: "rotate(-20deg)",
        textShadow: "0 0 20px rgba(239,68,68,0.8)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      Épuisé
    </span>
  </div>
);
