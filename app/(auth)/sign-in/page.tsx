"use client"

import FooterLink from "@/components/forms/FooterLink"
import InputField from "@/components/forms/InputField"
import { Button } from "@/components/ui/button"
import { SignInWithEmail } from "@/lib/actions/auth.actions"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const SignIn = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
    })
    const onSubmit = async (data: SignInFormData) => {
        try {
            const result = await SignInWithEmail(data)
            if (result.success) {
                console.log("success")
                router.push("/")
            }
        } catch (error) {
            console.log(error)
            toast.error("Sign in failed", {
                description:
                    error instanceof Error
                        ? error.message
                        : "Failed to sign in to your account",
            })
        }
    }
    return (
        <>
            <h1 className="form-title">Welcome back!</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* inputs */}

                <InputField
                    name="email"
                    label="Email"
                    placeholder="example@email.com"
                    register={register}
                    error={errors.email}
                    validation={{
                        required: "Email is required",
                        pattern: {
                            value: /^\w+@\w+\.\w+$/,
                            message: "Email address required",
                        },
                    }}
                />
                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{
                        required: "Password is required",
                        minLength: 8,
                    }}
                />

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="yellow-btn w-full mt-5"
                >
                    {isSubmitting ? "Signing In" : "Sign In"}
                </Button>
                <FooterLink
                    linkText="Create an account"
                    text="Don't have an account?"
                    href="/sign-up"
                />
            </form>
        </>
    )
}

export default SignIn
