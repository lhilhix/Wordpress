import { motion } from "motion/react";
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 bg-industrial-gray">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div>
          <div className="micro-label mb-4 text-bfi-red">Entre em Contacto</div>
          <h2 className="display-medium mb-12">Vamos Construir <br /> Juntos</h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-white flex items-center justify-center text-bfi-red shadow-sm">
                <MapPin size={24} />
              </div>
              <div>
                <div className="micro-label mb-1">Localização</div>
                <p className="text-lg font-bold mb-2">Rua Industrial de Braga, 4700-000 Braga, Portugal</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Rua+Industrial+de+Braga+Portugal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-bfi-red font-black text-xs uppercase tracking-widest hover:text-industrial-black transition-colors"
                >
                  Ver no Google Maps →
                </a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-white flex items-center justify-center text-bfi-red shadow-sm">
                <Phone size={24} />
              </div>
              <div>
                <div className="micro-label mb-1">Telefone</div>
                <p className="text-lg font-bold">+351 253 000 000</p>
                <p className="text-sm text-industrial-black/60">Segunda a Sexta: 08:00 - 18:00</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-white flex items-center justify-center text-bfi-red shadow-sm">
                <Mail size={24} />
              </div>
              <div>
                <div className="micro-label mb-1">Email</div>
                <p className="text-lg font-bold">contacto@plasticosbueso.pt</p>
                <p className="text-sm text-industrial-black/60">Geral e Orçamentos</p>
              </div>
            </div>
          </div>

          <div className="mt-16 flex gap-6">
            <a href="#" className="w-10 h-10 bg-industrial-black text-white flex items-center justify-center hover:bg-bfi-red transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-industrial-black text-white flex items-center justify-center hover:bg-bfi-red transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-industrial-black text-white flex items-center justify-center hover:bg-bfi-red transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-12 shadow-xl border-t-8 border-bfi-red"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-2">
              <label className="micro-label">Nome</label>
              <input type="text" className="w-full border-b-2 border-industrial-black/10 py-3 focus:border-bfi-red outline-none transition-colors" placeholder="João" />
            </div>
            <div className="space-y-2">
              <label className="micro-label">Apelido</label>
              <input type="text" className="w-full border-b-2 border-industrial-black/10 py-3 focus:border-bfi-red outline-none transition-colors" placeholder="Silva" />
            </div>
          </div>
          <div className="space-y-2 mb-8">
            <label className="micro-label">Endereço de Email</label>
            <input type="email" className="w-full border-b-2 border-industrial-black/10 py-3 focus:border-bfi-red outline-none transition-colors" placeholder="joao@exemplo.com" />
          </div>
          <div className="space-y-2 mb-12">
            <label className="micro-label">Mensagem</label>
            <textarea className="w-full border-b-2 border-industrial-black/10 py-3 focus:border-bfi-red outline-none transition-colors min-h-[150px] resize-none" placeholder="Fale-nos sobre o seu projeto..."></textarea>
          </div>
          <button className="w-full bg-bfi-red text-white py-6 font-black text-sm uppercase tracking-widest hover:bg-industrial-black transition-all">
            Enviar Mensagem
          </button>
        </motion.form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-industrial-black text-white py-16 px-6">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-bfi-red flex items-center justify-center text-white font-black text-xl">
            B
          </div>
          <span className="font-black text-2xl tracking-tighter uppercase">
            Plásticos Bueso
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <a href="/login" className="micro-label text-bfi-red hover:text-white transition-colors">Admin Portal</a>
          <a href="#" className="micro-label text-white/60 hover:text-white transition-colors">Política de Privacidade</a>
          <a href="#" className="micro-label text-white/60 hover:text-white transition-colors">Termos de Serviço</a>
          <a href="#" className="micro-label text-white/60 hover:text-white transition-colors">Cookies</a>
          <a href="#" className="micro-label text-white/60 hover:text-white transition-colors">Certificações</a>
        </div>

        <div className="micro-label text-white/40">
          © {new Date().getFullYear()} Plásticos Bueso. Braga, Portugal.
        </div>
      </div>
    </footer>
  );
}
