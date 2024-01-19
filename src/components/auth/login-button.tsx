"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

export const LoginButton = ({ children, mode = "redirect", asChild }: LoginButtonProps) => {
    const router = useRouter();

    const onClick = () => {
        router.push("/login");
    };

    if (mode === "modal") {
        return (
            <div className="cursor-pointer" onClick={onClick}>
                <p>
                    TODO: Implement modal login
                </p>
            </div>
        );
    }

    return (
        <span className="cursor-pointer" onClick={onClick}>
            {children}
        </span>
    );
};

export default LoginButton;
