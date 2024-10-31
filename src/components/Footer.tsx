import React from 'react';
import { MapPin, Instagram, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#f8a7d6] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Jardim das Maravilhas</h3>
            <a
              href="https://maps.google.com/?q=Rua+Presidente+Nilo+Peçanha,+803+-+Vila+Santo+Amaro,+Campo+Grande+-+MS,+79112-410"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gray-200 transition-colors"
            >
              <MapPin className="h-5 w-5" />
              <span>
                Rua Presidente Nilo Peçanha, 803<br />
                Vila Santo Amaro, Campo Grande - MS<br />
                79112-410
              </span>
            </a>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
            <div className="space-y-4">
              <a
                href="https://www.instagram.com/floricultura_jardim_maravilhas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gray-200 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span>@floricultura_jardim_maravilhas</span>
              </a>
              <a
                href="https://wa.me/5567998006714"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gray-200 transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>(67) 99800-6714</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p>&copy; {new Date().getFullYear()} Floricultura Jardim das Maravilhas. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}