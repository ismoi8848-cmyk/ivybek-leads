"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type FormData = {
  // Step 1 — Student
  student_name: string;
  grade: string;
  school: string;
  // Step 2 — Goals
  target_universities: string[];
  intended_major: string;
  timeline: string;
  // Step 3 — Contact
  parent_name: string;
  email: string;
  phone: string;
  how_heard: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const UNIVERSITIES = [
  "MIT",
  "Harvard",
  "Stanford",
  "Yale",
  "Princeton",
  "Columbia",
  "Penn (Wharton)",
  "Cornell",
  "Carnegie Mellon",
  "Duke",
  "Northwestern",
  "UC Berkeley",
  "UCLA",
  "NYU",
  "Other Top-50",
];

const GRADES = [
  "8th Grade",
  "9th Grade",
  "10th Grade",
  "11th Grade",
  "12th Grade",
  "Gap Year",
];

const TIMELINES = [
  "Applying this year (2025–26)",
  "Applying next year (2026–27)",
  "2–3 years away",
  "3+ years away / exploring",
];

const HOW_HEARD = [
  "Instagram (@ivybek_com)",
  "Friend or family referral",
  "Telegram",
  "Google search",
  "School / teacher recommendation",
  "Other",
];

const initialData: FormData = {
  student_name: "",
  grade: "",
  school: "",
  target_universities: [],
  intended_major: "",
  timeline: "",
  parent_name: "",
  email: "",
  phone: "",
  how_heard: "",
};

function ProgressBar({ step }: { step: number }) {
  const steps = ["Student Info", "Goals", "Contact"];
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {steps.map((label, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                i + 1 < step
                  ? "bg-gold text-white"
                  : i + 1 === step
                  ? "bg-navy text-white ring-4 ring-navy/20"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {i + 1 < step ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`text-xs mt-1 font-medium hidden sm:block ${
                i + 1 === step ? "text-navy" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="relative h-1.5 bg-gray-200 rounded-full mt-1">
        <div
          className="absolute h-full bg-gradient-to-r from-navy to-gold rounded-full transition-all duration-500"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />
      </div>
    </div>
  );
}

function UniversityCheckbox({
  name,
  checked,
  onChange,
}: {
  name: string;
  checked: boolean;
  onChange: (name: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(name)}
      className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-150 text-left ${
        checked
          ? "bg-navy text-white border-navy"
          : "bg-white text-gray-700 border-gray-200 hover:border-navy/40"
      }`}
    >
      {checked && <span className="mr-1">✓</span>}
      {name}
    </button>
  );
}

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function toggleUniversity(name: string) {
    setData((prev) => {
      const has = prev.target_universities.includes(name);
      return {
        ...prev,
        target_universities: has
          ? prev.target_universities.filter((u) => u !== name)
          : [...prev.target_universities, name],
      };
    });
    setErrors((prev) => ({ ...prev, target_universities: undefined }));
  }

  function validateStep1(): boolean {
    const e: Errors = {};
    if (!data.student_name.trim()) e.student_name = "Please enter the student's name.";
    if (!data.grade) e.grade = "Please select a grade.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2(): boolean {
    const e: Errors = {};
    if (data.target_universities.length === 0)
      e.target_universities = "Please select at least one university.";
    if (!data.timeline) e.timeline = "Please select a timeline.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep3(): boolean {
    const e: Errors = {};
    if (!data.parent_name.trim()) e.parent_name = "Please enter a parent/guardian name.";
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      e.email = "Please enter a valid email address.";
    if (!data.phone.trim() || data.phone.replace(/\D/g, "").length < 7)
      e.phone = "Please enter a valid phone number.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleNext() {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep3()) return;

    setLoading(true);
    setSubmitError("");

    const { error } = await supabase.from("leads").insert([
      {
        student_name: data.student_name.trim(),
        grade: data.grade,
        school: data.school.trim(),
        target_universities: data.target_universities,
        intended_major: data.intended_major.trim(),
        timeline: data.timeline,
        parent_name: data.parent_name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        how_heard: data.how_heard,
      },
    ]);

    setLoading(false);

    if (error) {
      setSubmitError("Something went wrong. Please try again or contact us directly.");
      console.error(error);
    } else {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="step-card text-center animate-slide-up">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-navy mb-3">Application Received!</h2>
        <p className="text-gray-600 mb-2">
          Thank you, <strong>{data.parent_name}</strong>. We've received {data.student_name}'s information.
        </p>
        <p className="text-gray-600 mb-6">
          Our team will reach out to <strong>{data.email}</strong> within 24 hours to schedule a free strategy session.
        </p>
        <div className="bg-navy/5 rounded-xl p-4 text-sm text-gray-500">
          In the meantime, follow us on Instagram{" "}
          <a
            href="https://instagram.com/ivybek_com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy font-semibold hover:text-gold transition-colors"
          >
            @ivybek_com
          </a>{" "}
          for tips and success stories.
        </div>
      </div>
    );
  }

  return (
    <div className="step-card animate-slide-up">
      <ProgressBar step={step} />

      <form onSubmit={handleSubmit} noValidate>
        {/* STEP 1 */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-navy mb-1">Tell us about the student</h2>
            <p className="text-gray-500 text-sm mb-6">We'll use this to personalize our approach.</p>

            <div className="space-y-5">
              <div>
                <label className="label" htmlFor="student_name">Student's Full Name *</label>
                <input
                  id="student_name"
                  type="text"
                  placeholder="e.g. Amir Karimov"
                  value={data.student_name}
                  onChange={(e) => set("student_name", e.target.value)}
                  className={`input-field ${errors.student_name ? "error" : ""}`}
                />
                {errors.student_name && <p className="text-red-500 text-xs mt-1">{errors.student_name}</p>}
              </div>

              <div>
                <label className="label" htmlFor="grade">Current Grade / Year *</label>
                <select
                  id="grade"
                  value={data.grade}
                  onChange={(e) => set("grade", e.target.value)}
                  className={`input-field ${errors.grade ? "error" : ""}`}
                >
                  <option value="">Select grade...</option>
                  {GRADES.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                {errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
              </div>

              <div>
                <label className="label" htmlFor="school">Current School (optional)</label>
                <input
                  id="school"
                  type="text"
                  placeholder="e.g. Westminster International University, Tashkent"
                  value={data.school}
                  onChange={(e) => set("school", e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="btn-gold w-full mt-8"
            >
              Continue →
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-navy mb-1">What are your goals?</h2>
            <p className="text-gray-500 text-sm mb-6">Help us understand your dream universities.</p>

            <div className="space-y-6">
              <div>
                <label className="label">Target Universities * <span className="font-normal text-gray-400">(select all that apply)</span></label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {UNIVERSITIES.map((u) => (
                    <UniversityCheckbox
                      key={u}
                      name={u}
                      checked={data.target_universities.includes(u)}
                      onChange={toggleUniversity}
                    />
                  ))}
                </div>
                {errors.target_universities && (
                  <p className="text-red-500 text-xs mt-2">{errors.target_universities}</p>
                )}
              </div>

              <div>
                <label className="label" htmlFor="intended_major">Intended Major / Field of Study (optional)</label>
                <input
                  id="intended_major"
                  type="text"
                  placeholder="e.g. Computer Science, Business, Pre-Med"
                  value={data.intended_major}
                  onChange={(e) => set("intended_major", e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="label" htmlFor="timeline">When are you applying? *</label>
                <select
                  id="timeline"
                  value={data.timeline}
                  onChange={(e) => set("timeline", e.target.value)}
                  className={`input-field ${errors.timeline ? "error" : ""}`}
                >
                  <option value="">Select timeline...</option>
                  {TIMELINES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.timeline && <p className="text-red-500 text-xs mt-1">{errors.timeline}</p>}
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="btn-gold flex-2 flex-grow"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-navy mb-1">How can we reach you?</h2>
            <p className="text-gray-500 text-sm mb-6">We'll contact you within 24 hours to schedule a free session.</p>

            <div className="space-y-5">
              <div>
                <label className="label" htmlFor="parent_name">Parent / Guardian Name *</label>
                <input
                  id="parent_name"
                  type="text"
                  placeholder="e.g. Dilnoza Karimova"
                  value={data.parent_name}
                  onChange={(e) => set("parent_name", e.target.value)}
                  className={`input-field ${errors.parent_name ? "error" : ""}`}
                />
                {errors.parent_name && <p className="text-red-500 text-xs mt-1">{errors.parent_name}</p>}
              </div>

              <div>
                <label className="label" htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  placeholder="e.g. family@gmail.com"
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={`input-field ${errors.email ? "error" : ""}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="label" htmlFor="phone">Phone / WhatsApp Number *</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="e.g. +998 90 123 45 67"
                  value={data.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className={`input-field ${errors.phone ? "error" : ""}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="label" htmlFor="how_heard">How did you hear about IvyBek? (optional)</label>
                <select
                  id="how_heard"
                  value={data.how_heard}
                  onChange={(e) => set("how_heard", e.target.value)}
                  className="input-field"
                >
                  <option value="">Select one...</option>
                  {HOW_HEARD.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
            </div>

            {submitError && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                {submitError}
              </div>
            )}

            <div className="flex gap-3 mt-8">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-gold flex-grow disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Get Free Consultation →"
                )}
              </button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">
              By submitting, you agree to be contacted by the IvyBek team. No spam, ever.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
