import { useTheme } from "@/shared/hooks/useTheme";

const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  const { theme } = useTheme();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50" {...props}>
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#8b5cf6", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>

      {/* Ícone geométrico moderno */}
      <rect
        x="10"
        y="10"
        width="30"
        height="30"
        rx="6"
        fill="url(#logoGradient)"
      />
      <rect
        x="15"
        y="15"
        width="8"
        height="8"
        rx="2"
        fill={theme === "dark" ? "#fff" : "#1e293b"}
        opacity="0.9"
      />
      <rect
        x="27"
        y="15"
        width="8"
        height="8"
        rx="2"
        fill={theme === "dark" ? "#fff" : "#1e293b"}
        opacity="0.7"
      />
      <rect
        x="15"
        y="27"
        width="8"
        height="8"
        rx="2"
        fill={theme === "dark" ? "#fff" : "#1e293b"}
        opacity="0.5"
      />
      <rect
        x="27"
        y="27"
        width="8"
        height="8"
        rx="2"
        fill={theme === "dark" ? "#fff" : "#1e293b"}
        opacity="0.3"
      />

      {/* Texto "React Template" */}
      <text
        x="50"
        y="30"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="18"
        fontWeight="600"
        fill={theme === "dark" ? "#fff" : "#1e293b"}
      >
        React Template
      </text>
    </svg>
  );
};

export default Logo;
