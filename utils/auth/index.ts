import {
    ChangePasswordSchema,
    ForgotPasswordSchema,
    LoginSchema,
    OtpSchema,
    SignUpSchema,
} from "@/schemas";
import { z } from "zod";

export const handleSetNewPassword = async (
    data: z.infer<typeof ChangePasswordSchema>
) => {
    const { password } = data;
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_AUTH}/reset-password`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
                credentials: "include",
            }
        ).then(async (res) => {
            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return data;
        });
        return res;
    } catch (error) {
        throw new Error("Something went wrong");
    }
};
export const handleChangePassword = async (
    data: z.infer<typeof ChangePasswordSchema>,
    sessionToken: string
) => {
    const { password } = data;
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/change-password`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionToken}`,
                },
                body: JSON.stringify({ password }),
            }
        ).then(async (res) => {
            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return data;
        });
        return res;
    } catch (error) {
        throw new Error("Something went wrong");
    }
};
export const handleResetPassCode = async (data: z.infer<typeof OtpSchema>) => {
    const { pin } = data;
    console.log(pin);
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_AUTH}/resetPasscode?code=${pin}`,
            {
                method: "POST",
                credentials: "include",
            }
        ).then(async (res) => {
            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return data;
        });
    } catch (error) {
        throw new Error("Error while creating account");
    }
};
export const handleSendResetCode = async (
    data: z.infer<typeof ForgotPasswordSchema>
) => {
    const { email } = data;
    try {
        const result = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_AUTH}/forgot-password?email=${email}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
                credentials: "include",
            }
        ).then(async (res) => {
            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return data;
        });
        return result;
    } catch (error) {
        throw new Error("Something went wrong");
    }
};

export const handleVerifyCode = async (data: z.infer<typeof OtpSchema>) => {
    // const { confirmPassword, ...registerData } = data;
    const { pin } = data;
    console.log(pin);

    try {
        const result = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_AUTH}/verify?code=${pin}`,
            {
                method: "POST",
                credentials: "include",
            }
        ).then(async (res) => {
            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return data;
        });
        const resultFromSv = await fetch("/api/auth/", {
            method: "POST",
            body: JSON.stringify(result.payload),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            const payload = await res.json();
            const datas = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return datas;
        });
        return resultFromSv;
    } catch (error) {
        throw new Error("Error while creating account");
    }
};

export const handleRegister = async (data: z.infer<typeof SignUpSchema>) => {
    const { confirmPassword, ...registerData } = data;
    try {
        const result = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_AUTH}/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...registerData, role: "USER" }),
                credentials: "include",
            }
        ).then(async (res) => {
            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return data;
        });
        return result;
    } catch (error) {
        throw new Error("Error while creating account");
    }
};

export const handleLogin = async (data: z.infer<typeof LoginSchema>) => {
    try {
        const result = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_AUTH}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        ).then(async (res) => {
            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return data;
        });
        const resultFromSv = await fetch("/api/auth/", {
            method: "POST",
            body: JSON.stringify(result.payload),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            const payload = await res.json();
            const datas = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return datas;
        });
        return resultFromSv;
    } catch (error) {
        throw new Error("Error while creating account");
    }
};

export const handleLogout = async () => {
    try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            const payload = await res.json();
            const datas = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return datas;
        });
    } catch (error) {
        throw new Error("Error while creating account");
    }
};

export const getAuth = async (sessionToken: string) => {
    try {
        const result = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/demo`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionToken}`,
                },
            }
        ).then(async (res) => {
            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return data;
        });
        return result;
    } catch (err) {
        console.log(err);
    }
};
