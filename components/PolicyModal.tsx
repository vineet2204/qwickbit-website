"use client"
import { X } from "lucide-react"

interface PolicyModalProps {
  isOpen: boolean
  onClose: () => void
  type: "terms" | "privacy" | "refund"
}

const policyContent = {
  terms: {
    title: "Terms of Service",
    content: (
      <div className="space-y-4">
        <section>
          <h3 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h3>
          <p className="text-gray-700 leading-relaxed">
            By accessing and using Qwickbit services, you acknowledge that you have read, understood, and agree to be
            bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">2. Service Description</h3>
          <p className="text-gray-700 leading-relaxed">
            Qwickbit provides cloud-based business solutions including but not limited to inventory management, CRM,
            billing, and analytics tools. We reserve the right to modify, suspend, or discontinue any aspect of our
            services at any time.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">3. User Responsibilities</h3>
          <p className="text-gray-700 leading-relaxed">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities
            that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">4. Intellectual Property</h3>
          <p className="text-gray-700 leading-relaxed">
            All content, features, and functionality of Qwickbit services are owned by Qwickbit Technologies Pvt Ltd and
            are protected by international copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">5. Limitation of Liability</h3>
          <p className="text-gray-700 leading-relaxed">
            Qwickbit shall not be liable for any indirect, incidental, special, consequential, or punitive damages
            resulting from your use or inability to use our services.
          </p>
        </section>
      </div>
    ),
  },
  privacy: {
    title: "Privacy Policy",
    content: (
      <div className="space-y-4">
        <section>
          <h3 className="text-lg font-semibold mb-2">1. Information We Collect</h3>
          <p className="text-gray-700 leading-relaxed">
            We collect information you provide directly to us, including your name, email address, phone number, company
            details, and any other information you choose to provide. We also collect usage data and technical
            information about how you interact with our services.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">2. How We Use Your Information</h3>
          <p className="text-gray-700 leading-relaxed">
            We use the information we collect to provide, maintain, and improve our services, to process your
            transactions, to send you technical notices and support messages, and to communicate with you about
            products, services, and events.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">3. Information Sharing</h3>
          <p className="text-gray-700 leading-relaxed">
            We do not share your personal information with third parties except as described in this policy. We may
            share information with service providers who perform services on our behalf, with your consent, or as
            required by law.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">4. Data Security</h3>
          <p className="text-gray-700 leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal information against
            unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
            internet is 100% secure.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">5. Your Rights</h3>
          <p className="text-gray-700 leading-relaxed">
            You have the right to access, correct, or delete your personal information. You may also object to or
            restrict certain processing of your data. To exercise these rights, please contact us using the information
            provided below.
          </p>
        </section>
      </div>
    ),
  },
  refund: {
    title: "Refund and Cancellation Policy",
    content: (
      <div className="space-y-4">
        <section>
          <h3 className="text-lg font-semibold mb-2">1. Subscription Cancellation</h3>
          <p className="text-gray-700 leading-relaxed">
            You may cancel your subscription at any time through your account settings or by contacting our support
            team. Cancellations will take effect at the end of your current billing period, and you will retain access
            to the service until that time.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">2. Refund Eligibility</h3>
          <p className="text-gray-700 leading-relaxed">
            We offer a 30-day money-back guarantee for first-time subscribers. If you are not satisfied with our service
            within the first 30 days of your initial subscription, you may request a full refund. Refund requests must
            be submitted within this period.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">3. Refund Process</h3>
          <p className="text-gray-700 leading-relaxed">
            To request a refund, please contact our support team at support@qwickbit.com with your account details and
            reason for the refund request. Approved refunds will be processed within 7-10 business days and credited to
            your original payment method.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">4. Non-Refundable Items</h3>
          <p className="text-gray-700 leading-relaxed">
            One-time setup fees, custom development work, and additional services beyond the standard subscription are
            non-refundable. Partial month charges are also non-refundable.
          </p>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">5. Contact Information</h3>
          <p className="text-gray-700 leading-relaxed">
            For any questions regarding cancellations or refunds, please contact us at support@qwickbit.com or call us
            during business hours. Our team is here to assist you with any concerns.
          </p>
        </section>
      </div>
    ),
  },
}

export function GlassmorphismPolicyModal({ isOpen, onClose, type }: PolicyModalProps) {
  if (!isOpen) return null

  const policy = policyContent[type]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/20 backdrop-blur-xl border-b border-white/20">
          <h2 className="text-2xl font-bold text-white">{policy.title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-80px)] px-6 py-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">{policy.content}</div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex items-center justify-end px-6 py-4 bg-white/20 backdrop-blur-xl border-t border-white/20">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-500/90 hover:bg-blue-600/90 text-white font-medium rounded-lg transition-colors shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
