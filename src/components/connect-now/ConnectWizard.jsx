"use client";

import { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import WizardSteps from "./WizardSteps";
import { connectSchema } from "./validation";
import ConfettiCanvas from "@/components/features/ConfettiCanvas";
import { useText } from "@/components/layout/PageTextProvider";

import { FaEnvelope, FaUser, FaBuilding, FaBriefcase, FaRegCommentDots, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdPhone } from "react-icons/md";

export default function ConnectWizard() {
  const t = useText();
  const boxRef = useRef();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    gsap.fromTo(
      boxRef.current,
      {
        opacity: 0,
        x: 20,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power2.out",
      }
    );
  }, [step]);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(connectSchema),
    mode: "onChange",
  });

  const next = async () => {
    let fieldsToValidate = [];
    if (step === 1) {
      fieldsToValidate = ["userType", "lookingFor"];
    } else if (step === 2) {
      fieldsToValidate = ["name", "phone", "email"];
    } else if (step === 3) {
      fieldsToValidate = ["companyName", "firstName", "role"];
    }

    const valid = await trigger(fieldsToValidate);

    if (!valid) return;

    if (step < 4) {
      setStep((prev) => prev + 1);
    }
  };

  const prev = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const mappedData = {
        userType: data.userType,
        lookingFor: data.lookingFor,
        fullName: data.name,
        email: data.email || "",
        phoneNumber: data.phone,
        companyName: data.companyName || data.firstName || null,
        companyRole: data.role || null,
        feedback: data.query || null,
      };

      const res = await fetch("/api/connect-now", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mappedData),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to submit inquiry");
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Lead Submission Error:", err);
      alert(err.message || "Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalSubmit = handleSubmit(onSubmit);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      if (step < 4) {
        next();
      }
    }
  };

  return (
    <section className="py-8 sm:py-16 lg:py-20 px-3 sm:px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Animated Border Container */}
        <div className="relative p-[2px] rounded-[24px] sm:rounded-[36px] lg:rounded-[42px] overflow-hidden bg-slate-900/10 shadow-[0_20px_60px_rgba(1,49,68,0.12)]">
          {/* Conic rotating border effect */}
          <div
            className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent,#00cc9c,#f6a200,transparent)] opacity-30 pointer-events-none z-0"
            style={{
              animation: 'borderRotate 8s linear infinite',
            }}
          />

          {/* Inner Card Container */}
          <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-[22px] sm:rounded-[34px] lg:rounded-[40px] overflow-hidden flex flex-col lg:flex-row">

            {/* LEFT PANEL */}
            <div
              className="text-white p-5 sm:p-8 lg:p-12 w-full lg:w-[38%] shrink-0 flex flex-col justify-between relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg,  #00cc9c 0%, #0f5667ff 80%)' }}
            >
              {/* Subtle glass overlay for depth */}
              <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[1px] pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-black mb-2 sm:mb-4">
                  {t("connect-now", "form.title", "Get In Touch")}
                </h2>

                <p className="text-sm sm:text-lg font-bold leading-snug">
                  {t("connect-now", "form.subtitle", "Ready to transform your workflow?")}
                </p>

                <p className="opacity-85 mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed">
                  {t("connect-now", "form.description", "Our team is standing with you and will contact you within 24 business hours.")}
                </p>
              </div>

              <div className="mt-5 sm:mt-8 space-y-4 sm:space-y-6 relative z-10">
                <div className="flex items-center gap-3 sm:gap-4 group">
                  <div className="bg-white/15 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl group-hover:bg-white/20 transition-all duration-300 transform group-hover:scale-110 shadow-sm shrink-0">
                    <MdPhone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-widest opacity-60 font-bold">{t("connect-now", "form.callUsLabel", "Call Us")}</p>
                    <p className="font-bold text-xs sm:text-sm tracking-wide">{t("connect-now", "form.phone", "+91 93114 43034")}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 group">
                  <div className="bg-white/15 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl group-hover:bg-white/20 transition-all duration-300 transform group-hover:scale-110 shadow-sm shrink-0">
                    <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-widest opacity-60 font-bold">{t("connect-now", "form.emailUsLabel", "Email Us")}</p>
                    <p className="font-bold text-xs sm:text-sm tracking-wide">{t("connect-now", "form.email", "hello@brokarta.com")}</p>
                  </div>
                </div>

                <div className="contact-social-row pt-3 sm:pt-4 border-t border-white/15">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest opacity-60 font-black whitespace-nowrap">
                      {t("connect-now", "form.followUsLabel", "Follow Us")}
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href={t("connect-now", "social.linkedin", "https://www.linkedin.com/company/brokarta")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl w-7 h-7 sm:w-8 sm:h-8 bg-white/10 hover:bg-white text-[10px] sm:text-xs font-bold flex items-center justify-center transition-all duration-300 hover:text-[#013144] hover:scale-110 shadow-sm shrink-0"
                        aria-label="LinkedIn"
                      >
                        <FaLinkedin className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={t("connect-now", "social.twitter", "https://twitter.com/brokarta")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl w-7 h-7 sm:w-8 sm:h-8 bg-white/10 hover:bg-white text-[10px] sm:text-xs font-bold flex items-center justify-center transition-all duration-300 hover:text-[#013144] hover:scale-110 shadow-sm shrink-0"
                        aria-label="X"
                      >
                        <FaXTwitter className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="relative p-4 sm:p-10 lg:p-12 text-[#013144] w-full lg:flex-grow flex flex-col justify-between min-h-0 sm:min-h-[520px]">
              {isSubmitted ? (
                <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-6 sm:py-8 px-2 sm:px-4 animate-[fadeIn_0.5s_cubic-bezier(0.16,1,0.3,1)]">
                  {/* Particle Confetti Animation */}
                  <ConfettiCanvas className="absolute inset-0 w-full h-full pointer-events-none z-0" />

                  {/* Glowing Animated Success Badge */}
                  <div className="relative z-10 mb-4 sm:mb-6">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#00cc9c]/15 flex items-center justify-center animate-[pulse_2s_infinite]">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#00cc9c] flex items-center justify-center text-white shadow-[0_10px_30px_rgba(0,204,156,0.4)] animate-[bounceIn_0.6s_cubic-bezier(0.175,0.885,0.32,1.275)]">
                        <svg className="w-6 h-6 sm:w-9 sm:h-9 fill-none stroke-current stroke-[3]" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-3xl font-black text-[#013144] mb-2 sm:mb-3 tracking-tight">
                    {t("connect-now", "form.successTitle", "Submitted Successfully!")}
                  </h3>

                  <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-6 sm:mb-8 font-medium">
                    {t("connect-now", "form.successMessage", "Thank you for reaching out. We have received your details and our team will get in touch with you within 24 business hours.")}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setStep(1);
                      if (typeof reset === 'function') reset();
                    }}
                    className="bg-[#013144] hover:bg-[#02647e] text-white px-6 sm:px-8 py-3 rounded-xl sm:rounded-2xl font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_8px_20px_rgba(1,49,68,0.2)] hover:shadow-xl active:scale-95 cursor-pointer"
                  >
                    {t("connect-now", "form.submitAnother", "Submit Another Inquiry")}
                  </button>
                </div>
              ) : (
                <div>
                  <WizardSteps step={step} />

                  {/* Almost There Banner */}
                  {step === 4 && (
                    <div className="mb-4 sm:mb-6 overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#013144]/95 to-[#00cc9c]/95 p-3 sm:p-3.5 text-white flex items-center gap-2.5 sm:gap-3 shadow-[0_8px_20px_rgba(0,204,156,0.15)] animate-[slideDown_0.4s_cubic-bezier(0.16,1,0.3,1)]">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 animate-[pulse_2s_infinite]">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-[#00cc9c]" viewBox="0 0 24 24">
                          <path d="M2 20h2a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H2v9zm18.83-8.42A2 2 0 0 0 19 11h-4V6a3 3 0 0 0-3-3h-.5L9 10.5V20h9.5a2 2 0 0 0 1.96-1.6l1.5-6a2 2 0 0 0-.13-1.82z" />
                        </svg>
                      </div>
                      <span className="text-[11px] sm:text-sm font-bold tracking-tight">
                        {t("connect-now", "form.almostThere", "Almost there- just one last step!")}
                      </span>
                    </div>
                  )}

                  <form
                    onSubmit={(e) => e.preventDefault()}
                    onKeyDown={handleKeyDown}
                  >
                    <div ref={boxRef} className="will-change-transform">
                      {step === 1 && (
                        <div>
                          <h3 className="font-sans font-black mb-4 sm:mb-6 text-base sm:text-xl tracking-tight text-[#013144] flex items-center justify-between">
                            <span>{t("connect-now", "form.step1.question", "Are you a...")}</span>
                            <span className="text-red-500 text-[10px] sm:text-xs font-bold">* Required</span>
                          </h3>

                          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
                            {[
                              t("connect-now", "form.step1.options.broker", "Broker"),
                              t("connect-now", "form.step1.options.agency", "Agency"),
                              t("connect-now", "form.step1.options.others", "Others")
                            ].map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => {
                                  setValue("userType", type, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                  });
                                }}
                                className={`h-11 sm:h-14 rounded-xl sm:rounded-[22px] border-2 font-bold text-xs sm:text-base transition-all duration-300 cursor-pointer active:scale-95 flex items-center justify-center
                                  ${watch("userType") === type
                                    ? "bg-[#013144] text-white border-[#00cc9c] shadow-[0_8px_20px_rgba(0,204,156,0.2)] scale-[1.02]"
                                    : "bg-white text-slate-500 border-slate-100 hover:border-[#f6a200] hover:text-[#013144] hover:shadow-sm"
                                  }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>

                          <input type="hidden" {...register("userType")} />

                          {errors.userType?.message && (
                            <p className="text-red-500 text-[10px] sm:text-xs font-bold mb-4 sm:mb-6 flex items-center gap-1.5 animate-[fadeIn_0.3s_ease]">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                              {errors.userType.message}
                            </p>
                          )}

                          {watch("userType") && (
                            <div className="animate-[slideDown_0.4s_cubic-bezier(0.16,1,0.3,1)]">
                              <h3 className="font-sans font-black mb-4 sm:mb-6 text-base sm:text-xl tracking-tight text-[#013144] flex items-center justify-between">
                                <span>{t("connect-now", "form.step1.lookingFor", "What are you looking for?")}</span>
                                <span className="text-red-500 text-[10px] sm:text-xs font-bold">* Required</span>
                              </h3>

                              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                {[
                                  t("connect-now", "form.step1.options.joinAsBroker", "Join as Broker"),
                                  t("connect-now", "form.step1.options.bookDemo", "Book a Demo"),
                                  t("connect-now", "form.step1.options.enterprise", "Enterprise Use"),
                                  t("connect-now", "form.step1.options.support", "Support/Query")
                                ].map((option) => (
                                  <button
                                    key={option}
                                    type="button"
                                    onClick={() => {
                                      setValue("lookingFor", option, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                      });
                                    }}
                                    className={`h-11 sm:h-14 rounded-xl sm:rounded-[22px] border-2 font-bold text-xs sm:text-base transition-all duration-300 cursor-pointer active:scale-95 flex items-center justify-center text-center px-1
                                      ${watch("lookingFor") === option
                                        ? "bg-[#013144] text-white border-[#00cc9c] shadow-[0_8px_20px_rgba(0,204,156,0.2)] scale-[1.02]"
                                        : "bg-white text-slate-500 border-slate-100 hover:border-[#f6a200] hover:text-[#013144] hover:shadow-sm"
                                      }`}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>

                              <input type="hidden" {...register("lookingFor")} />

                              {errors.lookingFor?.message && (
                                <p className="text-red-500 text-[10px] sm:text-xs font-bold mt-2 flex items-center gap-1.5 animate-[fadeIn_0.3s_ease]">
                                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                  {errors.lookingFor.message}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-3 sm:space-y-4">
                          <h3 className="font-sans font-black mb-4 sm:mb-6 text-base sm:text-xl tracking-tight text-[#013144] flex items-center justify-between">
                            <span>{t("connect-now", "form.step2.title", "Tell us about yourself")}</span>
                            <span className="text-red-500 text-[10px] sm:text-xs font-bold">* Required</span>
                          </h3>

                          <div className="space-y-2.5 sm:space-y-3">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <FaUser className="w-4 h-4 sm:w-5 sm:h-5" />
                              </div>
                              <input
                                {...register("name")}
                                aria-label="Full Name"
                                placeholder={t("connect-now", "form.step2.fullNamePlaceholder", "Full Name")}
                                className="w-full border-2 border-slate-100 p-3 pl-11 sm:pl-12 sm:p-3.5 text-xs sm:text-sm rounded-xl sm:rounded-2xl bg-slate-50/50 text-[#013144] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#00cc9c] focus:ring-4 focus:ring-[#00cc9c]/10 focus:shadow-[0_4px_20px_rgba(0,204,156,0.05)] transition-all duration-300 font-medium"
                              />
                              {errors.name?.message && (
                                <p className="text-red-500 text-[10px] sm:text-xs font-bold mt-1 flex items-center gap-1.5 animate-[fadeIn_0.3s_ease]">
                                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                  {errors.name.message}
                                </p>
                              )}
                            </div>

                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <MdPhone className="w-4 h-4 sm:w-5 sm:h-5" />
                              </div>
                              <input
                                {...register("phone")}
                                aria-label="Phone Number"
                                placeholder={t("connect-now", "form.step2.phonePlaceholder", "Phone Number")}
                                className="w-full border-2 border-slate-100 p-3 pl-11 sm:pl-12 sm:p-3.5 text-xs sm:text-sm rounded-xl sm:rounded-2xl bg-slate-50/50 text-[#013144] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#00cc9c] focus:ring-4 focus:ring-[#00cc9c]/10 focus:shadow-[0_4px_20px_rgba(0,204,156,0.05)] transition-all duration-300 font-medium"
                              />
                              {errors.phone?.message && (
                                <p className="text-red-500 text-[10px] sm:text-xs font-bold mt-1 flex items-center gap-1.5 animate-[fadeIn_0.3s_ease]">
                                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                  {errors.phone.message}
                                </p>
                              )}
                            </div>

                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5" />
                              </div>
                              <input
                                {...register("email")}
                                aria-label="Business Email Address"
                                placeholder={t("connect-now", "form.step2.emailPlaceholder", "Email (Optional)")}
                                className="w-full border-2 border-slate-100 p-3 pl-11 sm:pl-12 sm:p-3.5 text-xs sm:text-sm rounded-xl sm:rounded-2xl bg-slate-50/50 text-[#013144] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#00cc9c] focus:ring-4 focus:ring-[#00cc9c]/10 focus:shadow-[0_4px_20px_rgba(0,204,156,0.05)] transition-all duration-300 font-medium"
                              />
                              {errors.email?.message && (
                                <p className="text-red-500 text-[10px] sm:text-xs font-bold mt-1 flex items-center gap-1.5 animate-[fadeIn_0.3s_ease]">
                                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                  {errors.email.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-3 sm:space-y-4">
                          <h3 className="font-sans font-black mb-4 sm:mb-6 text-base sm:text-xl tracking-tight text-[#013144] flex items-center justify-between">
                            <span>{t("connect-now", "form.step3.title", "Company Details")}</span>
                            <span className="text-slate-400 text-[10px] sm:text-xs font-bold">{t("connect-now", "form.step3.optional", "(Optional)")}</span>
                          </h3>

                          <div className="space-y-2.5 sm:space-y-3">
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <FaBuilding className="w-4 h-4 sm:w-5 sm:h-5" />
                              </div>
                              <input
                                {...register("companyName")}
                                aria-label="Company Name"
                                placeholder={t("connect-now", "form.step3.companyPlaceholder", "Company Name (Optional)")}
                                className="w-full border-2 border-slate-100 p-3 pl-11 sm:pl-12 sm:p-3.5 text-xs sm:text-sm rounded-xl sm:rounded-2xl bg-slate-50/50 text-[#013144] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#00cc9c] focus:ring-4 focus:ring-[#00cc9c]/10 focus:shadow-[0_4px_20px_rgba(0,204,156,0.05)] transition-all duration-300 font-medium"
                              />
                              {errors.companyName?.message && (
                                <p className="text-red-500 text-[10px] sm:text-xs font-bold mt-1 flex items-center gap-1.5 animate-[fadeIn_0.3s_ease]">
                                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                  {errors.companyName.message}
                                </p>
                              )}
                            </div>

                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <FaBriefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                              </div>
                              <input
                                {...register("role")}
                                aria-label="Role or Position"
                                placeholder={t("connect-now", "form.step3.rolePlaceholder", "Your Role / Designation (Optional)")}
                                className="w-full border-2 border-slate-100 p-3 pl-11 sm:pl-12 sm:p-3.5 text-xs sm:text-sm rounded-xl sm:rounded-2xl bg-slate-50/50 text-[#013144] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#00cc9c] focus:ring-4 focus:ring-[#00cc9c]/10 focus:shadow-[0_4px_20px_rgba(0,204,156,0.05)] transition-all duration-300 font-medium"
                              />
                              {errors.role?.message && (
                                <p className="text-red-500 text-[10px] sm:text-xs font-bold mt-1 flex items-center gap-1.5 animate-[fadeIn_0.3s_ease]">
                                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                  {errors.role.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div>
                          <h3 className="font-sans font-black mb-4 sm:mb-6 text-base sm:text-xl tracking-tight text-[#013144]">
                            {t("connect-now", "form.step4.title", "How can we help?")}
                          </h3>

                          <div className="relative">
                            <div className="absolute top-3.5 left-4 flex items-start pointer-events-none text-slate-400">
                              <FaRegCommentDots className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                            <textarea
                              {...register("query")}
                              aria-label="Your Inquiry Message"
                              placeholder={t("connect-now", "form.step4.placeholder", "Type your message here...")}
                              className="w-full h-28 sm:h-36 border-2 border-slate-100 p-3 pl-11 sm:pl-12 sm:p-3.5 text-xs sm:text-sm rounded-xl sm:rounded-2xl bg-slate-50/50 text-[#013144] placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#00cc9c] focus:ring-4 focus:ring-[#00cc9c]/10 focus:shadow-[0_4px_20px_rgba(0,204,156,0.05)] transition-all duration-300 resize-none font-medium"
                            />
                          </div>

                          <div className="text-right text-[10px] sm:text-xs text-slate-400 mt-1 font-bold">
                            {watch("query")?.length || 0}/500
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex justify-between items-center mt-6 sm:mt-10 gap-3">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={prev}
                          className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-slate-100 text-[#013144] hover:bg-slate-50 hover:border-slate-200 active:scale-95 transition-all cursor-pointer font-bold text-[11px] sm:text-xs uppercase tracking-wider"
                        >
                          {t("connect-now", "form.nav.prev", "Previous")}
                        </button>
                      ) : (
                        <div />
                      )}

                      {step < 4 ? (
                        <button
                          type="button"
                          onClick={next}
                          className="bg-[#013144] hover:bg-[#02647e] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl active:scale-95 transition-all cursor-pointer font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-[0_8px_20px_rgba(1,49,68,0.15)] hover:shadow-[0_8px_25px_rgba(1,49,68,0.25)]"
                        >
                          {t("connect-now", "form.nav.next", "Next")}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleFinalSubmit}
                          disabled={isSubmitting}
                          className="bg-[#00cc9c] hover:bg-[#00b88d] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl active:scale-95 transition-all cursor-pointer font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-[0_8px_20px_rgba(0,204,156,0.2)] hover:shadow-[0_8px_25px_rgba(0,204,156,0.3)] flex items-center gap-2 disabled:opacity-60"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                              {t("connect-now", "form.nav.submitting", "Submitting...")}
                            </>
                          ) : (
                            t("connect-now", "form.nav.submit", "Submit")
                          )}
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes slideDown {
              from { opacity: 0; transform: translateY(-12px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes borderRotate {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(4px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes bounceIn {
              0% { opacity: 0; transform: scale(0.3); }
              50% { opacity: 1; transform: scale(1.1); }
              70% { transform: scale(0.9); }
              100% { opacity: 1; transform: scale(1); }
            }
          `,
        }}
      />
    </section>
  );
}