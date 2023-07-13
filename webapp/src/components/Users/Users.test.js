import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Usuarios from "./Users";

jest.mock("../../hooks/useUsuarios", () => ({
  __esModule: true,
  default: () => [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: { city: "Gwenborough" },
    },
  ],
}));

test("Se renderiza sin errores", () => {
  render(
    <MemoryRouter>
      <Usuarios />
    </MemoryRouter>
  );
});

jest.mock("../../hooks/useUsuarios", () => ({
    __esModule: true,
    default: () => [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: { city: "Gwenborough" },
      },
    ],
  }));
  
  test("la información del usuario se muestra correctamente", () => {
    render(
      <MemoryRouter>
        <Usuarios />
      </MemoryRouter>
    );
  
    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    expect(screen.getByText("Username: Bret")).toBeInTheDocument();
    expect(screen.getByText("Email: Sincere@april.biz")).toBeInTheDocument();
    expect(screen.getByText("City: Gwenborough")).toBeInTheDocument();
  });
