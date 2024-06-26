
import { render, screen } from "@testing-library/react";
import user from '@testing-library/user-event';
import UserForm from "./UserForm";

test('it shows two inputs and a button', ()=>{
    //render the component
    render(<UserForm />)

    //manipulate the component and find an element in it
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    //Assertion-make sure the component is doing
    //what we expect it to do
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
});

test('it calls onUserAdd when the form is submitted',()=>{
    const mock = jest.fn();
    //Try to render my component
    render(<UserForm onUserAdd={mock} />)

    //Find the two inputs
    //const [nameInput, emailInput] = screen.getAllByRole('textbox');
    const nameInput =screen.getByRole('textbox', {
        name: /name/i
    })

    const emailInput = screen.getByRole('textbox', {
        name: /email/i
    })


    //Simulate typing in a name
    user.click(nameInput);
    user.keyboard('shrinivas');

    //Simulate typing in a email
    user.click(emailInput);
    user.keyboard('shrinivas@gmail.com');

    //Find the button
    const button = screen.getByRole('button');

    //Simulate clicking the button
    user.click(button);

    //Assertion to make sure 'onUserAdd' gets called with email/name
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({ name:'shrinivas', email:'shrinivas@gmail.com' });
})