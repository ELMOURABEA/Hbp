export default function StaticPage({ title, content }: { title: string, content: string }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-900 font-serif mb-8 border-b border-slate-100 pb-8">{title}</h1>
      <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
        {content.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
}

export const AboutContent = "El-Bendary Pharmacy has been serving the community since 1980, providing trusted healthcare, medicines, and wellness products.\n\nOur mission is to provide high-quality pharmaceutical care and health services to our patients and the community. We strive to offer a wide range of medications, health supplements, and professional consultations to ensure the well-being of our customers.\n\nOver the decades, we have expanded our reach with multiple branches and a robust digital platform, making healthcare more accessible to everyone, everywhere in Egypt.";

export const PrivacyContent = "We respect your privacy. All customer data is protected and used only for order processing and communication.\n\nWe collect information such as your name, contact details, and prescription data strictly for fulfilling your requests and providing personalized care. We do not sell or share your data with third parties for marketing purposes.\n\nOur digital platform utilizes industry-standard security measures to safeguard your sensitive medical and personal information.";

export const TermsContent = "By using our platform, you agree to our terms of service, including payment, delivery, and return policies.\n\nAll medications require a valid prescription where applicable by law. Prices are subject to change based on official pharmaceutical regulations. Delivery times are estimated and may vary based on location and availability.\n\nCustomers are responsible for providing accurate contact and medical information to ensure safe medication dispensing.";
