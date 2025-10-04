import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("deve renderizar com texto", () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByText("Clique aqui")).toBeInTheDocument();
  });

  it("deve aplicar variant default por padrão", () => {
    render(<Button>Botão</Button>);
    const button = screen.getByText("Botão");
    expect(button).toHaveClass("bg-primary");
  });

  it("deve aplicar variant destructive", () => {
    render(<Button variant="destructive">Deletar</Button>);
    const button = screen.getByText("Deletar");
    expect(button).toHaveClass("bg-destructive");
  });

  it("deve estar desabilitado quando disabled", () => {
    render(<Button disabled>Desabilitado</Button>);
    const button = screen.getByText("Desabilitado");
    expect(button).toBeDisabled();
  });

  it("deve aplicar className customizado", () => {
    render(<Button className="custom-class">Botão</Button>);
    const button = screen.getByText("Botão");
    expect(button).toHaveClass("custom-class");
  });
});
