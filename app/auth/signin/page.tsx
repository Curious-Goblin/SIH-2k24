// "use client"

import AuthComponent from "@/app/components/AuthComponent";

// import Button from '@/app/components/button';
// import { signIn } from 'next-auth/react';
// import { useState } from 'react';

// export default function SignIn() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();
//         const result = await signIn('credentials', {
//             redirect: true,
//             emailAddress: email,
//             password: password
//         });
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//             />
//             <button type="submit">Sign In</button>
//             <Button name='Login'/>
//         </form>
//     );
// }
export default function SignIn(){
    return (
        <AuthComponent auth="signin"/>
    )
}