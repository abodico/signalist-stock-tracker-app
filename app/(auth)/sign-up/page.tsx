"use client"
import { CountrySelectField } from "@/components/forms/CountrySelectField"
import FooterLink from "@/components/forms/FooterLink"
import InputField from "@/components/forms/InputField"
import SelectField from "@/components/forms/SelectField"
import { Button } from "@/components/ui/button"
import { SignUpWithEmail } from "@/lib/actions/auth.actions"
import {
    INVESTMENT_GOALS,
    PREFERRED_INDUSTRIES,
    RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

const SignUp = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            country: "US",
            investmentGoals: "Growth",
            riskTolerance: "Medium",
            preferredIndustry: "Technology",
        },
        mode: "onBlur",
    })
    const onSubmit = async (data: SignUpFormData) => {
        try {
            const result = await SignUpWithEmail(data)
            if (result.success) {
                console.log("success")
                router.push("/")
            }
        } catch (error) {
            console.log(error)
            toast.error("Sign up failed", {
                description:
                    error instanceof Error
                        ? error.message
                        : "Failed to create an account",
            })
        }
    }
    return (
        <>
            <h1 className="form-title">Sign Up & Personalize</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* inputs */}
                <InputField
                    name="fullName"
                    label="Full Name"
                    placeholder="John Doe"
                    register={register}
                    error={errors.fullName}
                    validation={{
                        required: "Full Name is required",
                        minLength: 2,
                    }}
                />
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

                <CountrySelectField
                    control={control}
                    name="countrySelect"
                    label="Country"
                    error={errors.country}
                    required
                />

                <SelectField
                    name="investmentGoals"
                    label="InvestmentGoals"
                    placeholder="Select Your Investment Goals"
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />
                <SelectField
                    name="riskTolerance"
                    label="Risk Tolerance"
                    placeholder="Select Your Risk Level"
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                    required
                />
                <SelectField
                    name="preferredIndustry"
                    label="Preferred Industry"
                    placeholder="Select Your Preferred Industry"
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="yellow-btn w-full mt-5"
                >
                    {isSubmitting
                        ? "Creating Account"
                        : "Start Your Investing Journey"}
                </Button>
                <FooterLink
                    linkText="Sign in"
                    text="Already have an account?"
                    href="/sign-in"
                />
            </form>
        </>
    )
}

export default SignUp
