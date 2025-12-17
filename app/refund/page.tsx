import { PolicyLayout } from "@/components/policy-layout"

export default function RefundPage() {
  return (
    <PolicyLayout title="Refund and Cancellation Policy">
      <div className="space-y-8 text-black/90">

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">What is a Refund Policy?</h2>
          <p className="leading-relaxed mb-4">
            The refund policy of a company entails the rules and regulations for effective, hassle-free refunds in case
            a client is not satisfied with the products or services. Refund policies are maintained to safeguard a
            client’s interests and ensure a transparent process of exchange.
          </p>
          <p className="leading-relaxed">
            Refund policies may differ based on the nature of the business. For example, companies dealing in
            application development may have refund policies different from those involved in web development. A
            refund policy aims to establish a holistic and trustworthy relationship between the client and the
            company.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">Our Refund Policy</h2>
          <p className="leading-relaxed mb-4">
            At Qwickbit Technologies, we believe in delivering the best to our clients. However, in rare cases where a
            client is not satisfied, they are free to request a refund from us.
          </p>
          <p className="leading-relaxed mb-4">
            We exercise a 7-day refund policy, wherein a client may request a refund within 7 days of receiving the
            product or service. The client must clearly specify the reason for cancellation and contact our support
            team regarding the same.
          </p>
          <p className="leading-relaxed">
            The refund request must include the reason for cancellation along with the client’s name, contact
            information, and payment method details. Qwickbit Technologies reserves the right to evaluate and approve
            or reject such requests after careful and unbiased consideration.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">Refund Evaluation & Processing</h2>
          <p className="leading-relaxed mb-4">
            If we deem the refund request valid, the refund process will be initiated. While it may take a few days to
            start the procedure, our team treats such requests with priority and responds promptly.
          </p>
          <p className="leading-relaxed">
            Clients may contact us during office hours for immediate assistance. Requests received outside office
            hours will be addressed on the next working day.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">
            Details Required for Refund Requests
          </h2>
          <p className="leading-relaxed mb-3">
            When requesting a refund, clients must provide the following details:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Invoice Number</li>
            <li>Contact details</li>
            <li>Email ID</li>
            <li>Phone number</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">Refund Method</h2>
          <p className="leading-relaxed">
            Once the refund request is approved, the amount will be refunded to the client using the same payment mode
            through which the original payment was received.
          </p>
        </section>

      </div>
    </PolicyLayout>
  )
}
