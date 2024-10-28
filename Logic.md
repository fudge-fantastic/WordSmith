## LoginForm.tsx

### For User Ineterface
```tsx
const handleSubmit = (e: React.FormEvent) => {
    if (!nameValue) setNameError("Name is required");
    if (!emailValue) setEmailError("Email is required");
    if (!passwordValue) setPasswordError("Password is required");
}
```
These errors will be shown in the UI. And if none of these errors are present, the form will be submitted
```tsx
if (!nameError && !emailError && !passwordError) {
      console.log("Form submitted");
    } else {
      console.log(e, isRouteErrorResponse(Error));
}
```


## login.tsx
Action function waits for the form data to recieve
- body: entire form (user details)
- _action: SignUp or Login event
- name: Will only appear if the user is Signing Up
- email
- password
- bio? === optional
