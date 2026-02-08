import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import { vi } from "vitest";

// мок useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// мок apiAuth как ФУНКЦИЮ
vi.mock("../api/apiAuth", () => ({
  apiAuth: vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ access_token: "123" }),
  }),
}));

test("Login: user can type email, password and submit", async () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const button = screen.getByRole("button", { name: /login/i });

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "123456" } });
  fireEvent.click(button);

  const { apiAuth } = await import("../api/apiAuth");

  expect(apiAuth).toHaveBeenCalledWith(
    "/auth/login",
    expect.objectContaining({
      method: "POST",
      body: JSON.stringify({
        email: "test@example.com",
        password: "123456",
      }),
    })
  );
});
