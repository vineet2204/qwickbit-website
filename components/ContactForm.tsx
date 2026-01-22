import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, User, Phone, MessageSquare } from 'lucide-react';

// Character limit configuration
const CHAR_LIMITS = {
  name: 30,
  email: 60,
  phone: 12,
  message: 800,
};

// Form field configuration type
interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  placeholder: string;
  required: boolean;
  icon?: React.ReactNode;
  rows?: number;
}

// Props for the dynamic form
interface DynamicFormProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  fields?: FormField[];
  submitButtonText?: string;
  formspreeEndpoint?: string;
  formType?: string;
  onSuccess?: (data: Record<string, string>) => void;
  onError?: (error: Error) => void;
}

// Default fields configuration
const DEFAULT_FIELDS: FormField[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Your full name',
    required: true,
    icon: <User className="w-4 h-4" />,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'your@email.com',
    required: true,
    icon: <Mail className="w-4 h-4" />,
  },
  {
    name: 'phone',
    label: 'Phone (OPTIONAL)',
    type: 'tel',
    placeholder: '+1 (555) 000-0000',
    required: false,
    icon: <Phone className="w-4 h-4" />,
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'Tell us about your project or specific requirements...',
    required: true,
    icon: <MessageSquare className="w-4 h-4" />,
    rows: 4,
  },
];

export default function DynamicForm({
  isOpen,
  onClose,
  title = 'Get In Touch',
  subtitle = 'Fill out the form below and we\'ll get back to you shortly',
  fields = DEFAULT_FIELDS,
  submitButtonText = 'Submit',
  formspreeEndpoint = 'https://formspree.io/f/xzznngvp',
  formType = 'contact-form',
  onSuccess,
  onError,
}: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [charCounts, setCharCounts] = useState<Record<string, number>>({});
  const modalRef = useRef<HTMLDivElement>(null);

  // Initialize form data and char counts
  useEffect(() => {
    const initialData: Record<string, string> = {};
    const initialCounts: Record<string, number> = {};
    fields.forEach(field => {
      initialData[field.name] = '';
      initialCounts[field.name] = 0;
    });
    setFormData(initialData);
    setCharCounts(initialCounts);
  }, [fields]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Validation functions
  const validateEmail = (email: string): { isValid: boolean; message?: string } => {
    if (!email.trim()) {
      return { isValid: false, message: 'Email is required' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: 'Please enter a valid email address' };
    }

    if (email.includes('..')) {
      return { isValid: false, message: 'Email cannot contain consecutive dots' };
    }

    const localPart = email.split('@')[0];
    if (!/^[a-zA-Z0-9._+-]+$/.test(localPart)) {
      return { isValid: false, message: 'Email contains invalid characters' };
    }

    const domain = email.split('@')[1]?.toLowerCase();
    const domainParts = domain?.split('.');
    if (domainParts && domainParts[domainParts.length - 1].length < 2) {
      return { isValid: false, message: 'Invalid email domain' };
    }

    return { isValid: true };
  };

  const validatePhone = (phone: string): { isValid: boolean; message?: string } => {
    if (!phone.trim()) {
      return { isValid: true };
    }

    const digitsOnly = phone.replace(/\D/g, '');
    const validCharsRegex = /^[\d\s\-+()]+$/;
    
    if (!validCharsRegex.test(phone)) {
      return { isValid: false, message: 'Phone can only contain digits, spaces, +, -, ( )' };
    }

    if (digitsOnly.length < 10) {
      return { isValid: false, message: 'Phone must have at least 10 digits' };
    }

    if (digitsOnly.length > 15) {
      return { isValid: false, message: 'Phone cannot exceed 15 digits' };
    }

    if (/^0+$/.test(digitsOnly) || /^1+$/.test(digitsOnly)) {
      return { isValid: false, message: 'Please enter a valid phone number' };
    }

    return { isValid: true };
  };

  const validateName = (name: string): { isValid: boolean; message?: string } => {
    if (!name.trim()) {
      return { isValid: false, message: 'Name is required' };
    }
    if (name.trim().length < 2) {
      return { isValid: false, message: 'Name must be at least 2 characters' };
    }
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      return { isValid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
    }
    return { isValid: true };
  };

  const validateMessage = (message: string): { isValid: boolean; message?: string } => {
    if (!message.trim()) {
      return { isValid: false, message: 'Message is required' };
    }
    if (message.trim().length < 10) {
      return { isValid: false, message: 'Message must be at least 10 characters' };
    }
    return { isValid: true };
  };

  const validateField = (fieldName: string, value: string, required: boolean): { isValid: boolean; message?: string } => {
    if (fieldName === 'email') return validateEmail(value);
    if (fieldName === 'phone') return validatePhone(value);
    if (fieldName === 'name') return validateName(value);
    if (fieldName === 'message') return validateMessage(value);
    
    // Generic validation for other fields
    if (required && !value.trim()) {
      return { isValid: false, message: `${fieldName} is required` };
    }
    return { isValid: true };
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      const validation = validateField(field.name, formData[field.name] || '', field.required);
      if (!validation.isValid) {
        newErrors[field.name] = validation.message || 'Invalid input';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        
        // Reset form
        const resetData: Record<string, string> = {};
        const resetCounts: Record<string, number> = {};
        fields.forEach(field => {
          resetData[field.name] = '';
          resetCounts[field.name] = 0;
        });
        setFormData(resetData);
        setCharCounts(resetCounts);
        
        if (onSuccess) {
          onSuccess(formData);
        }
        
        setTimeout(() => {
          setSubmitSuccess(false);
          onClose();
        }, 2000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setSubmitError(true);
      if (onError) {
        onError(error as Error);
      }
      setTimeout(() => setSubmitError(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    const charLimit = CHAR_LIMITS[field as keyof typeof CHAR_LIMITS];

    if (charLimit && value.length > charLimit) {
      return;
    }

    setCharCounts(prev => ({ ...prev, [field]: value.length }));
    setFormData(prev => ({ ...prev, [field]: value }));

    const fieldConfig = fields.find(f => f.name === field);
    if (fieldConfig && value.trim()) {
      const validation = validateField(field, value, fieldConfig.required);
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, [field]: validation.message || '' }));
      } else {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    } else if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getCharCountColor = (current: number, limit: number): string => {
    const percentage = (current / limit) * 100;
    if (percentage >= 100) return 'text-red-500';
    if (percentage >= 80) return 'text-yellow-500';
    return 'text-gray-400';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-1">
      <div 
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div
        ref={modalRef}
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="p-8 md:p-8">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-3">
              {title}
            </h2>
            <p className="text-white/70 font-mono text-sm">
              / {subtitle}
            </p>
          </div>

          <div className="space-y-6">
            {fields.map(field => {
              const charLimit = CHAR_LIMITS[field.name as keyof typeof CHAR_LIMITS];
              const currentCount = charCounts[field.name] || 0;
              
              return (
                <div key={field.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="font-mono text-xs uppercase tracking-wider text-white flex items-center gap-2">
                      {field.icon}
                      {field.label}
                      {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {charLimit && (
                      <span className={`font-mono text-xs ${getCharCountColor(currentCount, charLimit)}`}>
                        {currentCount}/{charLimit}
                      </span>
                    )}
                  </div>
                  
                  {field.type === 'textarea' ? (
                    <textarea
                      rows={field.rows || 4}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className={`w-full rounded-lg border ${
                        errors[field.name] ? 'border-red-500' : 'border-white/20'
                      } bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none`}
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className={`w-full rounded-lg border ${
                        errors[field.name] ? 'border-red-500' : 'border-white/20'
                      } bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20`}
                      placeholder={field.placeholder}
                    />
                  )}
                  
                  {errors[field.name] && (
                    <p className="mt-1 text-xs text-red-500">{errors[field.name]}</p>
                  )}
                </div>
              );
            })}

            <div className="pt-2">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-white text-black hover:bg-white/90 transition-colors rounded-full px-4 py-2 font-mono font-semibold text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : submitButtonText}
              </button>
              
              {submitSuccess && (
                <p className="mt-4 text-center font-mono text-sm text-green-500">
                  ✓ Form submitted successfully! We'll contact you shortly.
                </p>
              )}
              
              {submitError && (
                <p className="mt-4 text-center font-mono text-sm text-red-500">
                  ✕ Something went wrong. Please try again.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
