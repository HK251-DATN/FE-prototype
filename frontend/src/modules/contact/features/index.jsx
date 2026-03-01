import Header from "../../../components/Header/Header";
import Navigation from "../../../components/Navigation/Navigation";
import Footer from "../../../components/Footer/Footer";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import Contact from "../components/Contact";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <Breadcrumbs
        items={[{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }]}
      />

      <section className="py-16 max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Liên Hệ Với Chúng Tôi
          <Contact />
        </h1>
      </section>

      <Footer />
    </div>
  );
}
