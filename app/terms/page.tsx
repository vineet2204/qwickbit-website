import { PolicyLayout } from "@/components/policy-layout"

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms of Service">
      <div className="space-y-8 text-black">

        <section>
          <h2 className="text-2xl font-semibold mb-4">1. STANDARD TERMS AND CONDITIONS</h2>
          <p className="leading-relaxed">
            These are the standard terms and conditions for Website/Web Portal/App Design and Development and apply to all
            contracts, and Qwickbit Technologies undertakes all work for its clients.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. OUR FEES AND DEPOSITS</h2>
          <p className="leading-relaxed mb-4">
            A 50% or upon any amount which we decide mutually with a client which they deposit of the total fee payable
            under our proposal is due immediately upon you instructing us to proceed with the website design, web
            application, mobile application development or any custom software development. The remaining 50% or any
            decided percentage mutually agreed shall become due when the work is completed to your reasonable
            satisfaction but subject to the terms of the “approval of work” and “rejected work” clauses. We reserve the
            right not to commence any work until the deposit has been paid in full.
          </p>
          <p className="leading-relaxed">
            The 50% deposit is only refundable if we have not fulfilled our obligations to deliver the work required
            under the agreement. For example, the deposit is not refundable if the development work has been started and
            you terminate the contract through our fault.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. SUPPLY OF MATERIALS</h2>
          <p className="leading-relaxed mb-4">
            You must supply all materials and information required by us to complete the work under any agreed
            specification. Such materials may include but are not limited to photographs, written copy, logos and other
            printed material.
          </p>
          <p className="leading-relaxed">
            Where there is any delay in supplying these materials to us, which leads to a delay in the completion of
            work, we have the right to extend any previously agreed deadlines by a reasonable amount. Where you fail to
            supply materials which prevent the work’s progress, we have the right to invoice you for any part or parts
            of the work already completed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. VARIATIONS</h2>
          <p className="leading-relaxed mb-4">
            We are pleased to offer you the opportunity to make revisions to the design. However, we have the right to
            limit the number of design proposals to a reasonable amount. We may charge for additional designs if you
            make a change to the original design specification.
          </p>
          <p className="leading-relaxed">
            Our website development phase is flexible and allows certain variations to the original specification.
            However, any significant deviation from the specification will be charged at the rate of $25.00 per hour.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. PROJECT DELAYS AND CLIENT LIABILITY</h2>
          <p className="leading-relaxed">
            Any time frames or estimates that we give are contingent upon your full co-operation and complete and final
            content in photography for the work pages. During development, a certain amount of feedback is required to
            progress to subsequent phases. A single point of contact must be appointed from your side and be made
            available daily to expedite the feedback process.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. APPROVAL OF WORK</h2>
          <p className="leading-relaxed">
            On completion of the work, you will be notified and have the opportunity to review it. You must notify us
            in writing of any unsatisfactory points within 7 days of such notification. Any work not reported in
            writing within the 7-day review period will be deemed approved. Once approved or deemed approved, work
            cannot subsequently be rejected and the remaining balance becomes due.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. REJECTED WORK</h2>
          <p className="leading-relaxed">
            If you reject any of our work within the 7-day review period and we reasonably consider the rejection to be
            unjustified, we may treat the contract as terminated and take steps to recover payment for work completed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. PAYMENT</h2>
          <p className="leading-relaxed">
            Upon completing the 7-day review period, we will invoice you for the remaining balance or any mutually
            agreed percentage of the project cost.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            9. WARRANTY BY YOU AS TO OWNERSHIP OF INTELLECTUAL PROPERTY RIGHTS
          </h2>
          <p className="leading-relaxed">
            You must obtain all necessary permissions and authorities regarding the use of all content, images,
            trademarks, logos or other materials supplied by you. You agree to indemnify us against any claims arising
            from the content of your website or application.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. LICENSING</h2>
          <p className="leading-relaxed">
            Once full payment has been received, we grant you a license to use the website, software and contents for
            the life of the website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. SEARCH ENGINES</h2>
          <p className="leading-relaxed">
            We do not guarantee any specific position in search engine results. We apply basic search engine
            optimisation according to current best practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">12. CONSEQUENTIAL LOSS</h2>
          <p className="leading-relaxed">
            We shall not be liable for any loss or damage attributable to delays in performance or completion of the
            contract, however such delay arises.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">13. DISCLAIMER</h2>
          <p className="leading-relaxed">
            To the fullest extent permitted by law, all warranties, conditions or representations other than those
            expressly stated are excluded. Any liability that cannot be excluded is limited, at our option, to the
            re-supply of services or the cost of supplying the services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">14. SUBCONTRACTING</h2>
          <p className="leading-relaxed">
            We reserve the right to subcontract any services that we have agreed to perform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">15. NON-DISCLOSURE</h2>
          <p className="leading-relaxed">
            We and any subcontractors engaged agree not to disclose any of your confidential information to third
            parties at any time.
          </p>
        </section>

      </div>
    </PolicyLayout>
  )
}
