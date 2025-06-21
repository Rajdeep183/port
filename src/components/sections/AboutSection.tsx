import { motion } from 'framer-motion';
import { Code, Database, Globe, Zap } from 'lucide-react';

export const AboutSection = () => {
  const skills = [
    {
      icon: Code,
      name: "Full-Stack Development",
      description: "React, TypeScript, Node.js, Streamlit, HTML/CSS",
    },
    {
      icon: Database,
      name: "Data Engineering",
      description: "SQL, Dataiku, Web Scraping, MySQL, PostgreSQL",
    },
    {
      icon: Globe,
      name: "Cloud & Tools",
      description: "AWS (EC2/S3), GitHub, Jupyter Notebook",
    },
    {
      icon: Zap,
      name: "Machine Learning",
      description: "scikit-learn, pandas, NumPy, Model Optimization",
    },
  ];

  return (
    <section id="about" className="relative min-h-screen py-20 px-6 bg-gradient-to-b from-transparent to-card/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-foreground mb-6">About Rajdeep Roy</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm Rajdeep Roy, a passionate Computer Science undergrad at VIT Vellore and a full-stack developer with a strong foundation in data science and cloud computing. 
            I enjoy building intelligent systems and intuitive web applications that solve real-world problems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {skills.map((skill, index) => (
            <motion.article
              key={skill.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border hover:bg-card/70 transition-all"
            >
              <skill.icon className="w-12 h-12 text-cyan-400 mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{skill.name}</h3>
              <p className="text-muted-foreground">{skill.description}</p>
            </motion.article>
          ))}
        </div>

        <motion.article
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-card/50 backdrop-blur-sm rounded-lg p-8 border border-border"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-4">Rajdeep Roy's Professional Journey</h3>
          <div className="text-muted-foreground leading-relaxed">
            <p>
              My journey began with curiosity for how systems work and grew into a drive for creating impactful solutions. 
              At SOL Analytics, I built scalable data pipelines and optimized reporting for over a million records. 
            </p>
            <p className="my-4">
              As Project & Events Head at IETE ISF, I led multiple tech events, collaborated with professionals, and empowered students.
              I'm always looking to learn and grow — currently diving deeper into data science, system security, and embedded systems.
            </p>
            <p>
              Check out my <a href="https://github.com/Rajdeep183" className="text-cyan-400 underline" target="_blank" rel="noopener" aria-label="Rajdeep Roy's GitHub profile">GitHub</a> and <a href="https://linkedin.com/in/rajdeep-roy-4086a2274" className="text-cyan-400 underline" target="_blank" rel="noopener" aria-label="Rajdeep Roy's LinkedIn profile">LinkedIn</a> to see more of what I've been working on.
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
};
