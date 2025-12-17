import { PolicyLayout } from "@/components/policy-layout"

export default function PrivacyPage() {
  return (
    <PolicyLayout title="Privacy Policy">
      <div className="space-y-8 text-black/90">

        <section>
          <p className="leading-relaxed">
            While using our website, Qwickbit Technologies is obligated towards respecting your privacy and choices.
            Information acquired by us via our website is covered by this Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">Personal Data</h2>
          <p className="leading-relaxed mb-4">
            Personal Data is information associated with a natural person. We do not request personal information
            unless you voluntarily provide it through our website. You may browse our website without submitting
            personal data.
          </p>
          <p className="leading-relaxed">
            You may provide information directly or indirectly by using login services such as Facebook, Twitter,
            Google, or LinkedIn. This may include your name, date of birth, email address, phone number, or mailing
            address. We use this information to process orders, respond to customer inquiries, and improve our
            products and services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">Sensitive Information</h2>
          <p className="leading-relaxed">
            Certain personal data may be considered sensitive under applicable laws. Any such sensitive information
            will be handled strictly in accordance with relevant legal requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">Information Sharing</h2>
          <p className="leading-relaxed mb-4">
            On rare occasions, we may share your information with trusted third parties working on our behalf. These
            parties are obligated to use the data solely for Qwickbit Technologies’ purposes.
          </p>
          <p className="leading-relaxed">
            We may also disclose information to governmental authorities when required by law or in response to legal
            processes such as subpoenas.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">Data Usage & Transparency</h2>
          <p className="leading-relaxed">
            We collect, store, process, and transmit personal data only as necessary to deliver our services and for
            operational and commercial purposes described in this policy. We aim to be transparent and encourage you
            to contact us with any questions or concerns.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">Usage of Cookies</h2>
          <ul className="list-disc pl-6 space-y-3 leading-relaxed">
            <li>
              Cookies are small files stored on your device that help improve website functionality and user
              experience.
            </li>
            <li>
              Cookies do not collect personally identifiable information unless you voluntarily provide it.
            </li>
            <li>
              Accepting cookies is optional. Denying cookies may limit access to certain services or features.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">Data Encryption & Security</h2>
          <p className="leading-relaxed mb-4">
            Your personal information is stored securely on servers operated by Qwickbit Technologies or authorized
            representatives. We implement safeguards to protect against unauthorized access, misuse, or alteration.
          </p>
          <p className="leading-relaxed">
            While we strive to ensure data security, no system is completely secure. If you have concerns regarding
            security, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">Third-Party Policy</h2>
          <p className="leading-relaxed mb-4">
            We are only responsible for the privacy and security of information collected on the Qwickbit Technologies
            website. We are not responsible for data shared with third-party websites.
          </p>
          <p className="leading-relaxed">
            Users should review the privacy policies and terms of third-party websites before sharing any personal
            information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">Access Principles</h2>
          <p className="leading-relaxed mb-4">
            You have the right to access and modify your personal information held by us. You may also request data
            deletion, though complete removal cannot always be guaranteed due to legal requirements.
          </p>
          <p className="leading-relaxed">
            Certain information may be retained as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">Children’s Policy</h2>
          <p className="leading-relaxed">
            Our services are intended for individuals engaged in commercial or professional activities. We do not
            knowingly collect or solicit information from children.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">Disservice Redresser</h2>
          <p className="leading-relaxed">
            If you have any grievances related to data security or privacy, please contact us at{" "}
            <a href="mailto:contact@qwickbit.com" className="underline">
              contact@qwickbit.com
            </a>. We will review and address concerns where possible.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">Changes to This Privacy Policy</h2>
          <p className="leading-relaxed">
            We reserve the right to modify this Privacy Policy at any time. Updated terms will be posted on this page
            along with the effective date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">Disclaimer</h2>
          <p className="leading-relaxed">
            We make no express or implied warranties regarding the accuracy of information provided by visitors and do
            not guarantee completeness or correctness.
          </p>
        </section>

      </div>
    </PolicyLayout>
  )
}
