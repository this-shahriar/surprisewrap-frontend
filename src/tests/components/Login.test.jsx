import { vi } from "vitest";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import { Login } from "../../components/Login";

describe("Login Component", () => {
  const mockOnLoginSubmit = vi.fn();
  const mockSetPageMode = vi.fn();
  const mockAuthLoader = { onLoginSubmit: false };

  const renderLogin = () => {
    return render(
      <AuthContext.Provider
        value={{
          onLoginSubmit: mockOnLoginSubmit,
          setPageMode: mockSetPageMode,
          authLoader: mockAuthLoader,
        }}
      >
        <Login />
      </AuthContext.Provider>
    );
  };

  it("renders form inputs and buttons", () => {
    renderLogin();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(
      screen.getByText(/don't have an account\? sign up/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/forgot password\?/i)).toBeInTheDocument();
  });

  it("shows required validation errors when submitting empty form", async () => {
    renderLogin();

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it("calls onLoginSubmit when form is submitted with valid data", async () => {
    renderLogin();

    await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "password123");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    expect(mockOnLoginSubmit).toHaveBeenCalled();
  });

  it('calls setPageMode with "forgotPassword" when forgot password link is clicked', async () => {
    renderLogin();

    const forgotPasswordLink = screen.getByText(/forgot password\?/i);
    await userEvent.click(forgotPasswordLink);

    expect(mockSetPageMode).toHaveBeenCalledWith("forgotPassword");
  });

  it('calls setPageMode with "registration" when sign-up link is clicked', async () => {
    renderLogin();

    const signUpLink = screen.getByText(/don't have an account\? sign up/i);
    await userEvent.click(signUpLink);

    expect(mockSetPageMode).toHaveBeenCalledWith("registration");
  });
});
