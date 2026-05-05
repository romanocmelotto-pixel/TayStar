import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Smartphone, Mic, Lightbulb, Camera, Scissors, MessageCircle } from 'lucide-react';

// --- Utility Components ---
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
}

const RevealText: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%", rotateZ: 2 }}
        whileInView={{ y: 0, rotateZ: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-50px" }}
        className="origin-left"
      >
        {children}
      </motion.div>
    </div>
  );
};

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "", yOffset = 30 }) => (
  <motion.div
    initial={{ opacity: 0, y: yOffset }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true, margin: "-50px" }}
    className={className}
  >
    {children}
  </motion.div>
);

const ParallaxImage: React.FC<{ src: string; alt: string; className?: string; speed?: number }> = ({ src, alt, className = "", speed = 15 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);

  return (
    <div ref={ref} className={`img-wrap bg-gray-200 ${className}`}>
      <motion.img
        style={{ y, scale: 1.2 }}
        src={src}
        alt={alt}
        className="w-full h-full object-cover origin-center"
      />
    </div>
  );
};

const MarqueeText = ({ children, className = "bg-brand text-bg-gray relative py-4", speed = 20 }: { children: React.ReactNode, className?: string, speed?: number }) => {
  return (
    <div className={`w-full overflow-hidden flex whitespace-nowrap z-20 ${className}`}>
      <motion.div
        className="flex whitespace-nowrap text-3xl md:text-5xl font-black uppercase tracking-tighter items-center"
        animate={{ x: "-50%" }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
      >
        <div className="flex gap-8 pr-8 items-center">{children}</div>
        <div className="flex gap-8 pr-8 items-center">{children}</div>
      </motion.div>
    </div>
  );
};

const SectionNumber = ({ num }: { num: string }) => (
  <FadeIn className="absolute bottom-8 left-8 hidden md:block">
    <div className="text-8xl font-black tracking-tighter leading-none opacity-80">({num})</div>
  </FadeIn>
);

// --- Main App Component ---
export default function App() {
  const whatsappNumber = "5524998822999";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const whatsappLink = `${whatsappUrl}?text=Ol%C3%A1%21+Quero+posicionar+minha+marca.`;

  return (
    <div className="bg-bg-gray text-brand min-h-screen selection:bg-brand selection:text-bg-gray font-sans">
      
      {/* Floating WhatsApp Button */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-brand text-bg-gray pr-6 pl-4 py-3 rounded-full flex items-center gap-3 shadow-[0_10px_40px_rgba(36,37,35,0.4)] hover:bg-brand hover:scale-105 transition-all duration-300 group"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="bg-bg-gray text-brand rounded-full p-2 group-hover:scale-110 transition-transform">
          <MessageCircle size={24} fill="currentColor" />
        </div>
        <span className="font-bold uppercase tracking-widest text-sm whitespace-nowrap hidden sm:inline-block">
          Falar no WhatsApp
        </span>
      </motion.a>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Cow hide texture background */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply">
          <img 
            src="https://images.unsplash.com/photo-1629517173822-799b64ea72fc?auto=format,compress&q=80&w=2000" 
            alt="Cow hide texture" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 w-full text-center px-4 mt-20">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="text-massive flex flex-col items-center">
              <span className="block mb-[-4vw]">TAYNÁ</span>
              <span className="block text-brand">TEIXEIRA</span>
            </h1>
          </motion.div>
          
          <FadeIn delay={0.5} className="mt-8 mb-20">
            <p className="text-2xl md:text-4xl font-semibold uppercase tracking-widest bg-bg-gray/90 inline-block px-4 py-2 mix-blend-hard-light text-brand shadow-sm">
              Social Media & Fashion Marketing
            </p>
          </FadeIn>
        </div>

        <div className="absolute bottom-0 w-full z-20">
          <MarqueeText className="bg-brand text-bg-gray border-t-2 border-b-2 border-brand py-6" speed={18}>
            <span>Estratégia</span> <span className="text-brand">✦</span>
            <span>Branding</span> <span className="text-brand">✦</span>
            <span>Direção Criativa</span> <span className="text-brand">✦</span>
            <span>Posicionamento Premium</span> <span className="text-brand">✦</span>
          </MarqueeText>
        </div>
      </section>

      {/* --- QUEM SOU EU (1) --- */}
      <section className="relative min-h-screen flex items-stretch border-b border-brand/30">
        <SectionNumber num="1" />
        <div className="flex-1 px-8 md:px-24 py-24 flex flex-col justify-center max-w-4xl z-10 bg-bg-gray">
          <RevealText>
            <h2 className="text-title mb-12 text-brand">
              QUEM SOU<br /><span className="text-brand">EU?</span>
            </h2>
          </RevealText>
          
          <div className="max-w-2xl ml-auto text-right md:text-left">
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-2xl font-bold uppercase leading-snug tracking-tight text-brand">
                Prazer, sou a Tay!<br />
                <span className="text-brand">Social Media & Fashion Marketing com olhar estratégico para branding, posicionamento e construção de marcas desejáveis.</span><br /><br />
                Minha expertise está no universo <span className="text-brand">Fashion e Beauty</span>, onde uno estética, storytelling e estratégia para transformar redes sociais em uma vitrine de valor e conexão com o público.<br /><br />
                Acredito que uma marca forte vai além de postar: <span className="text-brand">ela precisa comunicar identidade, gerar desejo e construir presença.</span>
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="hidden lg:block w-[40%] relative img-wrap">
          <ParallaxImage 
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format,compress&q=80&w=1000&grayscale=true" 
            alt="Tayná Portrait B&W"
            speed={10}
          />
        </div>
      </section>

      <MarqueeText className="bg-brand text-bg-gray py-6 border-y border-brand" speed={25}>
        <span className="italic">Moda Feminina</span> <span className="text-brand">✺</span>
        <span className="italic">Beauty & Maquiagem</span> <span className="text-brand">✺</span>
        <span className="italic">Acessórios & Calçados</span> <span className="text-brand">✺</span>
        <span className="italic">Marcas Autorais</span> <span className="text-brand">✺</span>
      </MarqueeText>

      {/* --- ATUAÇÃO / SERVIÇOS (2) --- */}
      <section className="relative py-32 px-8 md:px-24 overflow-hidden min-h-screen flex flex-col justify-center">
        <SectionNumber num="2" />
        <div className="absolute inset-0 z-0 opacity-15 mix-blend-multiply pointer-events-none">
          <img src="https://images.unsplash.com/photo-1610427357007-0624a0d9ebaf?auto=format,compress&q=80" alt="Texture" className="w-full h-full object-cover" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <RevealText>
            <h2 className="text-title mb-20 text-center md:text-left text-brand">ATUAÇÃO</h2>
          </RevealText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <FadeIn delay={0.2}>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-center md:text-right text-brand">
                Branding &<br />Posicionamento
              </h3>
              <ul className="text-xl md:text-2xl font-bold uppercase tracking-tight text-center md:text-right space-y-2 text-brand">
                <li><span className="text-brand">•</span> Definição da identidade visual</li>
                <li><span className="text-brand">•</span> Posicionamento estratégico</li>
                <li><span className="text-brand">•</span> Construção de estética visual</li>
                <li><span className="text-brand">•</span> Linguagem e Tom de comunicação</li>
                <li><span className="text-brand">•</span> Direção criativa de campanhas</li>
                <li><span className="text-brand">•</span> Criação de coleções e narrativas</li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.4}>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-center md:text-left text-brand">
                Estratégia para<br />Redes Sociais
              </h3>
              <ul className="text-xl md:text-2xl font-bold uppercase tracking-tight text-center md:text-left space-y-2 text-brand">
                <li><span className="text-brand">•</span> Planejamento de conteúdo</li>
                <li><span className="text-brand">•</span> Calendário mensal</li>
                <li><span className="text-brand">•</span> Definição de quadros fixos</li>
                <li><span className="text-brand">•</span> Posicionamento da marca</li>
                <li><span className="text-brand">•</span> Estratégia de crescimento</li>
                <li><span className="text-brand">•</span> Estratégia para vendas</li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      <MarqueeText className="bg-brand text-bg-gray py-3 border-y border-brand" speed={22}>
        <span className="italic">Transformando</span>
        <span>redes sociais</span>
        <span className="italic">em vitrines</span>
        <span>de valor</span>
        <span className="italic opacity-50 text-brand">|</span>
        <span className="italic">Transformando</span>
        <span>redes sociais</span>
        <span className="italic">em vitrines</span>
        <span>de valor</span>
        <span className="italic opacity-50 text-brand">|</span>
      </MarqueeText>

      {/* --- ATUAÇÃO (Conteúdo e Gestão) --- */}
      <section className="relative min-h-screen flex items-stretch border-b border-brand/30">
        <SectionNumber num="2" />
        <div className="flex-1 px-8 md:px-24 py-24 flex flex-col justify-center z-10 bg-bg-gray">
          <RevealText>
            <h2 className="text-title mb-16 text-brand">ATUAÇÃO</h2>
          </RevealText>

          <div className="space-y-24">
            <FadeIn delay={0.2} className="ml-0 md:ml-12">
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-brand">
                Conteúdo Criativo
              </h3>
              <ul className="text-xl md:text-2xl font-bold uppercase tracking-tight space-y-2 ml-4 md:ml-12 text-brand">
                <li><span className="text-brand mr-2">/</span> Direção criativa de fotos</li>
                <li><span className="text-brand mr-2">/</span> Produção de conteúdo fashion/beauty</li>
                <li><span className="text-brand mr-2">/</span> Roteiros para vídeos</li>
                <li><span className="text-brand mr-2">/</span> Reels estratégicos</li>
                <li><span className="text-brand mr-2">/</span> Conteúdos que geram desejo</li>
                <li><span className="text-brand mr-2">/</span> Storytelling de marca</li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.4} className="ml-0 md:ml-40">
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-brand">
                Gestão de<br />Redes Sociais
              </h3>
              <ul className="text-xl md:text-2xl font-bold uppercase tracking-tight space-y-2 ml-4 md:ml-12 text-brand">
                <li><span className="text-brand mr-2">/</span> Criação e publicação de posts</li>
                <li><span className="text-brand mr-2">/</span> Planejamento de stories</li>
                <li><span className="text-brand mr-2">/</span> Organização de feed</li>
                <li><span className="text-brand mr-2">/</span> Análise de desempenho</li>
                <li><span className="text-brand mr-2">/</span> Ajustes estratégicos</li>
              </ul>
            </FadeIn>
          </div>
        </div>

        <div className="hidden lg:block w-[40%] relative img-wrap">
          <ParallaxImage 
            src="https://images.unsplash.com/photo-1528821128474-27f963b062bf?auto=format,compress&q=80&w=1000" 
            alt="Cherries"
            speed={20}
          />
        </div>
      </section>

      {/* --- PARA QUEM É MEU TRABALHO --- */}
      <section className="relative min-h-screen flex flex-col lg:flex-row items-stretch">
        <div className="lg:w-1/2 px-8 md:px-24 py-24 flex flex-col justify-center z-10 bg-black text-bg-gray">
          <RevealText>
            <h2 className="text-[clamp(4rem,9vw,10rem)] leading-[0.8] pb-4 font-black uppercase tracking-tighter mb-12 text-brand hover:text-brand transition-colors duration-500">
              PARA QUEM<br />É MEU<br /><span className="text-bg-gray">TRABALHO</span>
            </h2>
          </RevealText>

          <FadeIn delay={0.2}>
            <p className="text-2xl font-bold uppercase tracking-tight mb-8 text-brand">
              Marcas que desejam ir<br />além de apenas postar e<br />querem construir<br /><span className="text-bg-gray">presença, identidade e<br />posicionamento no<br />digital.</span>
            </p>
            <ul className="text-xl font-bold uppercase tracking-tight space-y-1 ml-4 list-disc marker:text-brand text-bg-gray">
              <li>Moda feminina</li>
              <li>Acessórios</li>
              <li>Calçados</li>
              <li>Bolsas</li>
              <li>Beauty & Maquiagem</li>
              <li>Marcas autorais</li>
              <li>Negócios em construção de branding</li>
            </ul>
          </FadeIn>
        </div>

        <div className="lg:w-1/2 h-[50vh] lg:h-auto relative img-wrap bg-black">
          <ParallaxImage 
            src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format,compress&q=80&w=1200" 
            alt="Red Stilettos"
            speed={15}
            className="opacity-70 mix-blend-luminosity"
          />
        </div>
      </section>

      <MarqueeText className="bg-brand text-brand py-8 border-y-4 border-brand" speed={16}>
        <span className="italic">Sua marca sendo desejada</span> <span>✦</span>
        <span className="italic">Sua marca sendo desejada</span> <span>✦</span>
        <span className="italic">Sua marca sendo desejada</span> <span>✦</span>
      </MarqueeText>

      {/* --- COMO SERÁ TRABALHAR COMIGO --- */}
      <section className="relative py-32 px-8 md:px-24 overflow-hidden min-h-screen flex flex-col md:flex-row items-center border-b border-brand/30 bg-bg-gray">
        <SectionNumber num="2" />
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-multiply pointer-events-none">
          <img src="https://images.unsplash.com/photo-1541680670548-ee0fd9edba09?auto=format,compress&q=80" alt="Texture" className="w-full h-full object-cover" />
        </div>
        
        <div className="relative z-10 w-full md:w-1/2 pr-0 md:pr-12">
          <RevealText>
            <h2 className="text-[clamp(1rem,4vw,3rem)] leading-[0.8] font-black uppercase tracking-tighter mb-12 text-brand">ATUAÇÃO</h2>
          </RevealText>
          <FadeIn delay={0.2}>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 pl-4 md:pl-16 text-brand">
              Como será<br />trabalhar comigo
            </h3>
            <ul className="text-xl md:text-2xl font-bold uppercase tracking-tight space-y-2 pl-8 md:pl-24 list-disc marker:text-brand text-brand">
              <li><span className="text-brand">Estudo da marca e público</span></li>
              <li><span className="text-brand">Definição do posicionamento</span></li>
              <li><span className="text-brand">Criação da estética</span></li>
              <li><span className="text-brand">Planejamento estratégico</span></li>
              <li><span className="text-brand">Produção de conteúdo</span></li>
              <li><span className="text-brand">Gestão e acompanhamento</span></li>
              <li><span className="text-brand">Crescimento e fortalecimento</span></li>
            </ul>
          </FadeIn>
        </div>

        <div className="w-full md:w-1/2 h-[50vh] md:h-[80vh] relative mt-16 md:mt-0 img-wrap rounded-full mix-blend-multiply opacity-90 overflow-hidden bg-brand/20">
           <ParallaxImage 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format,compress&q=80&w=800" 
            alt="Modern Workspace"
            speed={5}
            className="object-cover"
          />
        </div>
      </section>

      {/* --- EQUIPAMENTOS --- */}
      <section className="py-32 px-8 md:px-24 relative overflow-hidden bg-bg-gray border-t border-brand/30">
        <SectionNumber num="2" />
        <RevealText>
          <h2 className="text-[clamp(1.5rem,5vw,4rem)] leading-[0.8] mb-6 text-center font-black uppercase tracking-tighter text-brand">ATUAÇÃO</h2>
        </RevealText>
        <RevealText delay={0.1}>
           <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-24 text-center text-brand">
            Equipamentos
          </h3>
        </RevealText>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 max-w-7xl mx-auto">
          {[
            { icon: <Smartphone strokeWidth={1.5} size={64} />, title: "iPhone 16", desc: "Qualidade Profissional de fotos e vídeos" },
            { icon: <Mic strokeWidth={1.5} size={64} />, title: "Microfone", desc: "Lapela Boya" },
            { icon: <Lightbulb strokeWidth={1.5} size={64} />, title: "Iluminação", desc: "Profissional" },
            { icon: <Camera strokeWidth={1.5} size={64} />, title: "Tripé", desc: "(Estabilização)" },
            { icon: <Scissors strokeWidth={1.5} size={64} />, title: "Aplicativos", desc: "Profissionais de Edição" }
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1} className="flex flex-col items-center text-center group">
              <motion.div 
                whileHover={{ scale: 1.1, rotateZ: 5 }} 
                className="mb-6 p-4 rounded-3xl border-2 border-transparent group-hover:border-brand transition-colors text-brand bg-bg-gray shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
              >
                {item.icon}
              </motion.div>
              <h4 className="text-xl font-black uppercase tracking-tighter mb-2 text-brand">{item.title}</h4>
              <p className="text-sm font-bold uppercase tracking-tight opacity-80 leading-tight text-brand">{item.desc}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* --- DIFERENCIAL (3) --- */}
      <section className="relative min-h-screen flex items-stretch">
        <SectionNumber num="3" />
        <div className="w-[15%] md:w-[25%] bg-stripes pointer-events-none"></div>

        <div className="w-[85%] md:w-[75%] flex flex-col lg:flex-row items-center p-8 md:p-16 gap-16 relative bg-bg-gray z-10 border-l-[10px] border-brand shadow-2xl">
          <div className="w-full lg:w-1/2 aspect-square relative img-wrap overflow-hidden shadow-xl rounded-sm">
            <ParallaxImage 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format,compress&q=80&w=1000" 
              alt="Martini Glass"
              speed={10}
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center pl-0 lg:pl-12">
            <RevealText>
              <h2 className="text-[clamp(3.5rem,7vw,8rem)] leading-none font-black uppercase tracking-tighter mb-12 text-brand">
                DIFERENCIAL
              </h2>
            </RevealText>
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-3xl font-bold uppercase tracking-tight leading-snug text-brand">
                Meu trabalho vai <span className="text-brand underline decoration-brand decoration-[4px] underline-offset-4">além</span> da gestão de redes sociais.<br /><br />
                Atuo com olhar estratégico de <span className="text-brand font-black">branding e direção criativa</span>, criando identidade visual, conceito de coleções, campanhas e conteúdos que posicionam a marca com valor e desejo no mercado.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <MarqueeText className="bg-brand text-bg-gray border-t-[10px] border-brand py-6" speed={16}>
        <span className="italic font-light">Posicionamento • branding • direção criativa</span> 
        <span className="text-brand">✺</span>
        <span className="italic font-light">Posicionamento • branding • direção criativa</span> 
        <span className="text-brand">✺</span>
        <span className="italic font-light">Posicionamento • branding • direção criativa</span> 
        <span className="text-brand">✺</span>
      </MarqueeText>

      {/* --- CONTATO FOOTER --- */}
      <footer className="pt-32 pb-16 px-8 md:px-24 bg-bg-gray">
        <RevealText>
          <h2 className="text-[clamp(4rem,15vw,20rem)] leading-none font-black uppercase tracking-tighter mb-16 text-brand relative inline-block">
            CONTATO
            <span className="absolute -top-12 -right-12 text-brand text-4xl hidden lg:block">★</span>
          </h2>
        </RevealText>

        <div className="max-w-7xl mx-auto flex flex-col gap-0 border-b-4 border-brand">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-8 border-t-4 border-brand group hover:bg-brand hover:text-bg-gray transition-colors px-4 text-brand">
             <span className="text-2xl font-black uppercase tracking-tighter">WhatsApp</span>
             <span className="text-xl font-bold uppercase tracking-tight">(24) 99882-2999</span>
          </a>
          <a href="mailto:taynatteixeira@icloud.com" className="flex items-center justify-between py-8 border-t-4 border-brand group hover:bg-brand hover:text-bg-gray transition-colors px-4 text-brand">
             <span className="text-2xl font-black uppercase tracking-tighter">E-mail:</span>
             <span className="text-xl font-bold uppercase tracking-tight truncate ml-4">taynatteixeira@icloud.com</span>
          </a>
          <a href="https://instagram.com/ttheglamlab" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between py-8 border-t-4 border-brand group hover:bg-brand hover:text-brand transition-colors px-4 text-brand">
             <span className="text-2xl font-black uppercase tracking-tighter">Instagram</span>
             <span className="text-xl font-bold uppercase tracking-tight">@ttheglamlab</span>
          </a>
        </div>
      </footer>

    </div>
  );
}

