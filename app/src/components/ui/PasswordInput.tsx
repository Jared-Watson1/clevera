// src/components/ui/PasswordInput.tsx
import React, { useState, useMemo } from "react";
import { Check, Eye, EyeOff, X } from "lucide-react";

const PASSWORD_REQUIREMENTS = [
  { regex: /.{8,}/, text: "At least 8 characters" },
  { regex: /[0-9]/, text: "At least 1 number" },
  { regex: /[a-z]/, text: "At least 1 lowercase letter" },
  { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  { regex: /[!-\\/:-@[-`{-~]/, text: "At least 1 special character" },
] as const;

type StrengthScore = 0 | 1 | 2 | 3 | 4 | 5;

const STRENGTH_CONFIG = {
  colors: {
    0: "bg-light2",
    1: "bg-error",
    2: "bg-light5",
    3: "bg-light4",
    4: "bg-light3",
    5: "bg-success",
  } as Record<StrengthScore, string>,
  texts: {
    0: "Enter a password",
    1: "Weak password",
    2: "Medium password",
    3: "Strong password",
    4: "Very Strong password",
    5: "Excellent password",
  } as Record<StrengthScore, string>,
};

type Requirement = {
  met: boolean;
  text: string;
};

type PasswordStrength = {
  score: StrengthScore;
  requirements: Requirement[];
};

type PasswordInputProps = {
  password: string;
  setPassword: (password: string) => void;
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const calculateStrength = useMemo((): PasswordStrength => {
    const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
      met: req.regex.test(password),
      text: req.text,
    }));

    return {
      score:
        (requirements.filter((req) => req.met).length as StrengthScore) || 0,
      requirements,
    };
  }, [password]);

  return (
    <div className="mb-4">
      <label htmlFor="password" className="block text-sm font-medium mb-1">
        Password
      </label>
      <div className="relative">
        <input
          id="password"
          type={isVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          aria-invalid={calculateStrength.score < 4}
          aria-describedby="password-strength"
          className="w-full px-4 py-2 border border-light2 rounded-md focus:outline-none focus:ring-2 focus:ring-light4 transition"
        />
        <button
          type="button"
          onClick={() => setIsVisible((prev) => !prev)}
          aria-label={isVisible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
        >
          {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div
        className="mt-2 h-1 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={calculateStrength.score}
        aria-valuemin={0}
        aria-valuemax={5}
      >
        <div
          className={`h-full ${
            STRENGTH_CONFIG.colors[calculateStrength.score]
          } transition-all duration-500`}
          style={{ width: `${(calculateStrength.score / 5) * 100}%` }}
        />
      </div>

      <p
        id="password-strength"
        className="text-sm font-medium flex justify-between mt-1"
      >
        <span>Must contain:</span>
        <span>{STRENGTH_CONFIG.texts[calculateStrength.score]}</span>
      </p>

      <ul className="mt-2 space-y-1.5" aria-label="Password requirements">
        {calculateStrength.requirements.map((req, index) => (
          <li key={index} className="flex items-center space-x-2">
            {req.met ? (
              <Check size={16} className="text-success" />
            ) : (
              <X size={16} className="text-error" />
            )}
            <span
              className={`text-xs ${req.met ? "text-success" : "text-error"}`}
            >
              {req.text}
              <span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordInput;
