import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm  from "./RegisterForm";
import { act } from "@testing-library/react";

test("check if register button is in the doccument", () => {
    render(<RegisterForm /> );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
});

test("should show error for each field if no input is put in for expected fields", () => {
    render(<RegisterForm /> );
    const buttonElement = screen.getByRole("button");
    act(() => {
        userEvent.click(buttonElement);
    });

    const firstNameError = screen.getByLabelText("first-name-error");
    const lastNameError = screen.getByLabelText("last-name-error");
    const userTypeError = screen.getByLabelText("user-type-error");
    const emailError = screen.getByLabelText("email-error");
    const passwordError = screen.getByLabelText("password-error");

    expect(firstNameError && lastNameError && userTypeError && emailError && passwordError).toBeInTheDocument();
});

test("should show error message when first name is the incorrect format", () => {
    render(<RegisterForm /> );

    const firstname = screen.getByLabelText("first-name");
    fireEvent.change(firstname, {target: {value: "Name1"}});

    const buttonElement = screen.getByRole("button")
    act(() => {
        userEvent.click(buttonElement);
    });

    const firstNameError = screen.getByLabelText("first-name-error");

    expect(firstNameError).toBeInTheDocument();
});

test("should show error message when last name is the incorrect format", () => {
    render(<RegisterForm /> );

    const lastname = screen.getByLabelText("last-name");
    fireEvent.change(lastname, {target: {value: "Name1"}});

    const buttonElement = screen.getByRole("button")
    act(() => {
        userEvent.click(buttonElement);
    });

    const lastNameError = screen.getByLabelText("last-name-error");

    expect(lastNameError).toBeInTheDocument();
});

test("should show error message when user type is not chosen", () => {
    render(<RegisterForm /> );

    const userType = screen.getByLabelText("user-type");
    fireEvent.change(userType, {target: {value: ""}});

    const buttonElement = screen.getByRole("button")
    act(() => {
        userEvent.click(buttonElement);
    });
    const userTypeError = screen.getByLabelText("user-type-error");

    expect(userTypeError).toBeInTheDocument();
});

test("should show error message when email is not the correct format", () => {
    render(<RegisterForm /> );

    const email = screen.getByLabelText("email");
    fireEvent.change(email, {target: {value: "ctedtsen"}});

    const buttonElement = screen.getByRole("button")
    act(() => {
        userEvent.click(buttonElement);
    });
    const emailError = screen.getByLabelText("email-error");

    expect(emailError).toBeInTheDocument();
});

test("should show error message when password is not accepted (no special character or number)", () => {
    render(<RegisterForm /> );

    const password = screen.getByLabelText("password");
    fireEvent.change(password, {target: {value: "Test"}});

    const buttonElement = screen.getByRole("button")
    act(() => {
        userEvent.click(buttonElement);
    });

    const passwordError = screen.getByLabelText("password-error");

    expect(passwordError).toBeInTheDocument();
});

test("should show error when password does not match password confirm", () => {
    render(<RegisterForm /> );
    const password = screen.getByLabelText("password");
    const passwordConfirm = screen.getByLabelText("password-confirm");

    fireEvent.change(password, {target: {value: "Test1!"}});
    fireEvent.change(passwordConfirm, {target: {value: "Test1"}});
    
    const buttonElement = screen.getByRole("button")
    act(() => {
        userEvent.click(buttonElement);
    });

    const passwordConfirmError = screen.getByLabelText("password-confirm-error");
    expect(passwordConfirmError).toBeInTheDocument();
})
