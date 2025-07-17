import z from 'zod';

export const userSignUpSchema = z.object({
    username:z.string().min(5,"Username must be atleast 5 characters long"),
    email:z.email("Invalid email address"),
    password:z.string().min(8,"Password must be atleast 8 characters long"),
    confirmPassword : z.string().refine((data) => data.password === data.confirmPassword , {
        message : "Password dosen't match",
        path:['confirmPassword']   // show error message at confirmPassword field
    })
});