import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import heroImage from '@assets/generated_images/hero.jpg';
import project1Image from '@assets/generated_images/project-1.jpg';
import project2Image from '@assets/generated_images/project-2.jpg';
import project3Image from '@assets/generated_images/project-3.jpg';

const projects = [
  {
    id: 1,
    title: 'The Form of Function',
    description: 'An exploration of minimal interfaces in high-density data environments. Redefining how we perceive complexity while maintaining warmth.',
    image: project1Image,
    role: 'Lead Design',
    year: '2023',
  },
  {
    id: 2,
    title: 'Kinetic Typography',
    description: 'A study in motion and meaning, bringing static letterforms to life through physics-based animation and deliberate pacing.',
    image: project2Image,
    role: 'Interaction, Concept',
    year: '2024',
  },
  {
    id: 3,
    title: 'Space & Light',
    description: 'Architectural digital mockups blending brutalist structure with warm Scandinavian sensibilities. A quiet sanctuary on the web.',
    image: project3Image,
    role: 'Art Direction',
    year: '2024',
  }
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20 selection:text-foreground">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 p-6 md:p-12 flex justify-between items-center mix-blend-difference text-white"
      >
        <div className="font-serif italic text-xl tracking-wide">MS</div>
        <div className="text-[10px] font-sans uppercase tracking-[0.2em] flex gap-8">
          <a href="#about" className="hover:text-white/60 transition-colors">About</a>
          <a href="#work" className="hover:text-white/60 transition-colors">Work</a>
          <a href="#contact" className="hover:text-white/60 transition-colors">Contact</a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-[100dvh] pt-32 pb-24 md:pt-48 md:pb-32 px-6 md:px-12 flex flex-col">
        <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          
          <div className="md:col-span-7 flex flex-col justify-center order-2 md:order-1 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-serif text-6xl md:text-8xl lg:text-[8rem] leading-[0.9] text-foreground tracking-tight"
            >
              Matt<br />Shellenbagrer
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 text-muted-foreground"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-px bg-muted-foreground/40" />
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase">Digital Designer</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-px bg-muted-foreground/40" />
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase">Art Director</p>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-5 relative order-1 md:order-2 h-[50vh] md:h-[75vh] w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full relative overflow-hidden"
            >
              <motion.div style={{ y }} className="absolute inset-[-10%] w-[120%] h-[120%]">
                <img 
                  src={heroImage} 
                  alt="Portrait of Matt Shellenbagrer" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
              </motion.div>
            </motion.div>
          </div>
          
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto border-t border-border/40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground sticky top-32"
            >
              About Me
            </motion.h2>
          </div>
          <div className="md:col-span-8 md:pl-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="prose prose-lg dark:prose-invert prose-p:font-serif prose-p:text-3xl md:prose-p:text-4xl lg:prose-p:text-[2.75rem] prose-p:leading-[1.3] prose-p:text-foreground/90 prose-p:tracking-tight max-w-none"
            >
              <p>
                I craft digital environments that feel as considered and tactile as physical spaces. 
                Rooted in quiet confidence and precise typography, my work aims to reduce noise 
                and elevate meaning. I believe the best interfaces are those you feel rather than simply notice.
              </p>
              <p className="mt-16 text-lg md:text-xl font-sans font-light text-muted-foreground leading-relaxed tracking-normal max-w-2xl">
                Currently based in Stockholm, focusing on minimal aesthetics and human-centric interaction design. 
                Always exploring the tension between structured, disciplined layouts and fluid, organic movement.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-32 md:py-48 px-6 md:px-12 bg-card border-y border-border/40">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-24 md:mb-40 flex items-end justify-between"
          >
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-none">Selected<br />Work</h2>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground hidden md:block">2021 — Present</p>
          </motion.div>

          <div className="flex flex-col gap-32 md:gap-56">
            {projects.map((project, i) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center ${i % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}
              >
                <div className={`md:col-span-7 ${i % 2 !== 0 ? 'md:col-start-6' : ''}`}>
                  <div className="overflow-hidden aspect-[4/5] md:aspect-[3/4] group relative bg-muted">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-[2s] ease-[0.16,1,0.3,1] group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-1000" />
                  </div>
                </div>
                
                <div className={`md:col-span-5 flex flex-col justify-center ${i % 2 !== 0 ? 'md:col-start-1' : 'md:pl-8 lg:pl-16'}`}>
                  <div className="flex gap-4 items-center text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground mb-8">
                    <span>{project.year}</span>
                    <span className="w-1 h-1 bg-primary/40 rotate-45" />
                    <span>{project.role}</span>
                  </div>
                  <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-[1.1] tracking-tight">{project.title}</h3>
                  <p className="font-sans text-base md:text-lg text-muted-foreground mb-12 leading-relaxed font-light">
                    {project.description}
                  </p>
                  <a 
                    href={`#project-${project.id}`} 
                    className="inline-flex items-center gap-4 font-sans text-[10px] tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors w-fit group pb-2 border-b border-border/50 hover:border-primary"
                  >
                    View Project 
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-x-2" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[6rem] mb-12 leading-[0.95] tracking-tight">Let's build<br />something<br />quiet.</h2>
            <a 
              href="mailto:hello@mattshellenbagrer.com" 
              className="inline-block text-xl md:text-3xl font-serif text-muted-foreground hover:text-primary transition-colors border-b border-border/50 hover:border-primary pb-2"
            >
              hello@mattshellenbagrer.com
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex md:justify-end items-end"
          >
            <div className="flex flex-col gap-10">
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Connect</p>
              <div className="flex gap-10">
                <a href="#" className="text-foreground/80 hover:text-primary transition-colors hover:-translate-y-1 transform duration-500 ease-[0.16,1,0.3,1]">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a href="#" className="text-foreground/80 hover:text-primary transition-colors hover:-translate-y-1 transform duration-500 ease-[0.16,1,0.3,1]">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="w-5 h-5" strokeWidth={1.5} />
                </a>
                <a href="#" className="text-foreground/80 hover:text-primary transition-colors hover:-translate-y-1 transform duration-500 ease-[0.16,1,0.3,1]">
                  <span className="sr-only">GitHub</span>
                  <Github className="w-5 h-5" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-40 pt-10 border-t border-border/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-[10px] font-sans text-muted-foreground uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} Matt Shellenbagrer</p>
          <p>Designed with intention</p>
        </div>
      </footer>
    </div>
  );
}